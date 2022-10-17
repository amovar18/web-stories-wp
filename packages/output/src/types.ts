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
 * External dependencies
 */

import type {
  Animation,
  Element,
  Page,
  StoryMetaData,
  MetaData,
  Flags,
  MediaElement,
  BackgroundAudioResourceTyping,
  TextElement,
} from '@googleforcreators/types';
export interface AutoAdvance {
  animations?: Animation[];
  defaultPageDuration: number;
  elements: Element[];
  backgroundAudio?: BackgroundAudioResourceTyping;
  id: string;
}
export interface PreloadResource {
  url: string;
  type: string;
}

type Elements = MediaElement | TextElement;
export interface OutputElementProps {
  element: Elements;
  flags: Flags;
}
export interface PageObject {
  page: Page;
  defaultAutoAdvance: boolean;
  defaultPageDuration: number;
  flags: Flags;
}
export interface StoryProps {
  story: StoryMetaData;
  pages: Page[];
  metadata: MetaData;
  flags: Flags;
}
export interface WithLinkProps {
  element: Element;
  children: JSX.Element;
  style?: React.CSSProperties;
}
