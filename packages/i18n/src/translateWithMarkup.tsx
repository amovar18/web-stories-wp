/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * External dependencies
 */
import {
  cloneElement,
  createElement,
  Fragment,
} from '@googleforcreators/react';
import type { ReactNode, ReactElement } from 'react';

type Mapping = Record<string, ReactElement>;

// See https://html.spec.whatwg.org/multipage/syntax.html#void-elements
const VOID_ELEMENTS = [
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
];

/**
 * Transforms a single DOM node.
 *
 * @param node DOM node.
 * @param mapping Map of tag names to React components.
 * @return Transformed node.
 */
export function transformNode(node: Element, mapping: Mapping = {}) {
  const { childNodes, localName, nodeType, textContent } = node;
  if (Node.TEXT_NODE === nodeType) {
    return textContent;
  }

  const children = node.hasChildNodes()
    ? Array.from(childNodes).map((child) =>
        transform(child as Element, mapping)
      )
    : null;

  if (localName in mapping) {
    return cloneElement(mapping[localName], {}, children);
  }

  return createElement(localName, null, children);
}

/**
 * Recursively traverses through a DOM node and its children and transforms them
 * to React elements.
 *
 * @param node DOM node.
 * @param mapping Map of tag names to React components.
 * @return List of transformed nodes.
 */
function transform(node: Element, mapping: Mapping = {}): ReactNode[] {
  const result = [];

  do {
    result.push(transformNode(node, mapping));
    node = node.nextSibling as Element;
  } while (node !== null);

  return result;
}

interface TranslateWithMarkupProps {
  mapping: Mapping;
  children: string;
}

/**
 * Component to facilitate translation of strings containing markup.
 *
 * Parses a string using DOMParser and replaces found element nodes
 * with the provided React components.
 *
 * This way, using dangerouslySetInnerHTML can be avoided.
 *
 * @see https://github.com/googleforcreators/web-stories-wp/issues/1578
 * @param props Component props.
 * @param props.mapping Map of tag names to React components.
 * @param props.children Children / string to parse.
 * @return Transformed children.
 */
function TranslateWithMarkup({
  mapping = {},
  children,
}: TranslateWithMarkupProps) {
  //Ensure all Object keys are lowercase as the DOMParser converts tag names to lowercase.
  mapping = Object.fromEntries(
    Object.entries(mapping).map(([k, v]) => [k.toLowerCase(), v])
  );

  // Disallow void elements in mapping because it will lead to unexpected behavior
  // because a void element cannot have contents under any circumstances.
  // See https://www.w3.org/TR/2011/WD-html-markup-20110113/syntax.html#void-element
  const foundVoidElements = Object.keys(mapping)
    .filter((tag) => VOID_ELEMENTS.includes(tag))
    .join(' ');
  if (foundVoidElements.length > 0) {
    throw new Error(
      `Found disallowed void elements in TranslateWithMarkup map: ${foundVoidElements}`
    );
  }

  const node = new DOMParser().parseFromString(children, 'text/html').body
    .firstChild as Element;
  return node
    ? transform(
        node,
        mapping
        //eslint-disable-next-line react/no-array-index-key -- Order should never change.
      ).map((element, index) => <Fragment key={index}>{element}</Fragment>)
    : [];
}

export default TranslateWithMarkup;
