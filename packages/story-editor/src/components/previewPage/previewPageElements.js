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
import { memo } from '@web-stories-wp/react';
import { StoryPropTypes } from '@web-stories-wp/elements';
/**
 * Internal dependencies
 */
import DisplayElement from '../canvas/displayElement';

function PreviewPageElements({ page }) {
  return page.elements.map((element) => (
    <DisplayElement
      previewMode
      key={element.id}
      page={page}
      element={element}
      isAnimatable
    />
  ));
}

PreviewPageElements.propTypes = {
  page: StoryPropTypes.page.isRequired,
};

export default memo(PreviewPageElements);
