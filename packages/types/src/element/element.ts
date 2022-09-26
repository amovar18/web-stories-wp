/*
 * Copyright 2022 Google LLC
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
 * Internal dependencies
 */
import type { Resource } from '../resource';
import type { ElementBox } from './elementBox';
import type { Pattern } from './pattern';

export interface Link {
  url: string;
  desc?: string;
  needsProxy?: boolean;
  icon?: string;
  rel?: string[];
}

export interface Flip {
  vertical: number;
  horizontal: number;
}

export interface Mask {
  type: string;
}

export interface Border {
  top: number;
  right: number;
  bottom: number;
  left: number;
  locked: boolean;
}

export interface BorderRadius {
  topLeft: number;
  topRight: number;
  bottomLeft: number;
  bottomRight: number;
  locked: boolean;
}
export interface PageAttachment {
  icon?: string;
  needsProxy?: boolean;
  url?: string;
  ctaText?: string;
  theme?: string;
  rel?: string[];
}

export interface Element extends ElementBox {
  id: string;
  type: string;
  isBackground: boolean;

  mask?: Mask;
  link?: Link;
  opacity?: number;
  lockAspectRatio?: boolean;
  flip?: Flip;
  groupId?: string;
  border?: Border;
  borderRadius?: BorderRadius;
  pageAttachment?: PageAttachment;
  resource?: Resource;
  overlay?: Pattern;
  backgroundColor?: Pattern;
  backgroundTextMode?: string;
}
