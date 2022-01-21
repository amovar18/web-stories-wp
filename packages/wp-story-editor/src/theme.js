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
import { createGlobalStyle } from 'styled-components';
import { OVERLAY_CLASS } from '@googleforcreators/design-system';

/**
 * Internal dependencies
 */
import { TOOLBAR_HEIGHT, MENU_WIDTH, MENU_FOLDED_WIDTH } from './constants';

export const GlobalStyle = createGlobalStyle`
  .${OVERLAY_CLASS} {
    top: ${TOOLBAR_HEIGHT}px !important;
    left: ${MENU_WIDTH}px !important;
  }

  body.folded .${OVERLAY_CLASS} {
    left: ${MENU_FOLDED_WIDTH}px !important;
  }
`;
