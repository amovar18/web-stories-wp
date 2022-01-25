/*
 * Copyright 2021 Google LLC
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
import { __ } from '@googleforcreators/i18n';

export const DEFAULT_ATTRIBUTES_FOR_MEDIA = {
  scale: 100,
  focalX: 50,
  focalY: 50,
};

export const MEDIA_DEFAULT_ATTRIBUTES = {
  ...DEFAULT_ATTRIBUTES_FOR_MEDIA,
  resource: {
    alt: '',
  },
};
export const Z_INDEX_CANVAS = {
  MOVABLE: 10,
  FLOAT_PANEL: 11,
};

export const BACKGROUND_TEXT_MODE = {
  NONE: 'NONE',
  FILL: 'FILL',
  HIGHLIGHT: 'HIGHLIGHT',
};

export const MULTIPLE_VALUE = '((MULTIPLE))';

export const MULTIPLE_DISPLAY_VALUE = __('Mixed', 'web-stories');
