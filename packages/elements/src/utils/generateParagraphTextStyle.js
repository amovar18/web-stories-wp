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
import calcFontMetrics from './calcFontMetrics';
import generateFontFamily from './generateFontFamily';
function generateParagraphTextStyle(
  props,
  dataToStyleX,
  dataToStyleY,
  dataToFontSizeY = dataToStyleY,
  element,
  dataToPaddingY = dataToStyleY
) {
  const { font, fontSize, lineHeight, padding, textAlign } = props;
  const { marginOffset } = calcFontMetrics(element);

  const verticalPadding = padding?.vertical || 0;
  const horizontalPadding = padding?.horizontal || 0;
  const hasPadding = verticalPadding || horizontalPadding;
  const paddingStyle = hasPadding
    ? `${dataToStyleY(verticalPadding)} ${dataToStyleX(horizontalPadding)}`
    : 0;

  return {
    dataToEditorY: dataToStyleY,
    whiteSpace: 'pre-wrap',
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
    margin: `${dataToPaddingY(-marginOffset / 2)} 0`,
    fontFamily: generateFontFamily(font),
    fontSize: dataToFontSizeY(fontSize),
    font,
    lineHeight,
    textAlign,
    padding: paddingStyle,
  };
}
export default generateParagraphTextStyle;
