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

// Curated Fonts list source:
// https://github.com/googleforcreators/web-stories-wp/issues/1989#issuecomment-662253222
export const CURATED_FONT_NAMES = [
  'Karla',
  'Lato',
  'Lora',
  'Merriweather',
  'Montserrat',
  'Nunito',
  'Oswald',
  'Playfair Display',
  'Poppins',
  'Raleway',
  'Roboto',
  'Roboto Condensed',
  'Source Serif Pro',
  'Titillium Web',
  'Work Sans',
  'Alegreya',
  'Arimo',
  'EB Garamond',
  'IBM Plex Mono',
  'IBM Plex Serif',
  'Inconsolata',
  'Mulish',
  'Noto Sans',
  'Noto Serif',
  'Open Sans',
  'Open Sans Condensed',
  'PT Mono',
  'PT Sans',
  'PT Serif',
  'Roboto Mono',
  'Source Sans Pro',
  'Ubuntu',
  'Anton',
  'BioRhyme',
  'Bungee',
  'Bungee Shade',
  'Cookie',
  'Dancing Script',
  'Monoton',
  'Nothing You Could Do',
  'Parisienne',
  'Rock Salt',
  'UnifrakturMaguntia',
];
export const TEXT_ELEMENT_DEFAULT_FONT = {
  family: 'Roboto',
  weights: [100, 300, 400, 500, 700, 900],
  styles: ['italic', 'regular'],
  variants: [
    [0, 100],
    [1, 100],
    [0, 300],
    [1, 300],
    [0, 400],
    [1, 400],
    [0, 500],
    [1, 500],
    [0, 700],
    [1, 700],
    [0, 900],
    [1, 900],
  ],
  fallbacks: ['Helvetica Neue', 'Helvetica', 'sans-serif'],
  service: 'fonts.google.com',
  metrics: {
    upm: 2048,
    asc: 1900,
    des: -500,
    tAsc: 1536,
    tDes: -512,
    tLGap: 102,
    wAsc: 1946,
    wDes: 512,
    xH: 1082,
    capH: 1456,
    yMin: -555,
    yMax: 2163,
    hAsc: 1900,
    hDes: -500,
    lGap: 0,
  },
};
