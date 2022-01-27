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
 * Internal dependencies
 */
import StoryEditor from './storyEditor';
import Dialog from './components/dialog';

export * from './components/previewPage';
export * from './app/config';
export * from './app/story';
export * from './app/api';
export { useLocalMedia } from './app/media';
export { useCanvas } from './app/canvas';
export { useFont } from './app/font';
export * from './app/currentUser';
export * from './components/header';
export * from './components/panels/document';
export * from './components/form';
export * from './components/panels/panel';
export * from './components/panels/shared';
export * from './components/richText';
export * from './components/checklist';
export * from './components/checklistCard';
export * from './components/elementLink';
export { useVideoTrim, VideoTrimmer } from './components/videoTrim';
export { default as isElementBelowLimit } from './utils/isElementBelowLimit';
export { default as isHexColorString } from './utils/isHexColorString';
export { default as useCORSProxy } from './utils/useCORSProxy';
export { default as getStoryPropsToSave } from './app/story/utils/getStoryPropsToSave';
export { default as useRefreshPostEditURL } from './utils/useRefreshPostEditURL';
export { default as FontContext } from './app/font/context';
export { default as useLoadFontFiles } from './app/font/actions/useLoadFontFiles';
export { default as StoryPropTypes } from './types';
export { GlobalStyle, default as theme } from './theme'; // @todo To be refactored.
export { default as CircularProgress } from './components/circularProgress';
export { default as InterfaceSkeleton } from './components/layout';
export { default as Tooltip } from './components/tooltip';
export { default as Popup } from './components/popup';
export { default as useInspector } from './components/inspector/useInspector';
export { default as InspectorContext } from './components/inspector/context';
export {
  styles as highlightStyles,
  states as highlightStates,
  useHighlights,
} from './app/highlights';
export { ConfigProvider as EditorConfigProvider } from './app/config';

export { Dialog };
export default StoryEditor;
