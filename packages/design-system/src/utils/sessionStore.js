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
import { trackError } from '@googleforcreators/tracking';

export const SESSION_STORAGE_PREFIX = {
  LOCAL_AUTOSAVE_PREFIX: 'wp_stories_autosave_story',
};

export function getItemByKey(key) {
  let parsed;
  try {
    const stored = window.sessionStorage.getItem(key);
    parsed = JSON.parse(stored);
  } catch (err) {
    trackError('session_storage_read', err.message);
  }

  return parsed;
}

export function setItemByKey(key, data) {
  try {
    window.sessionStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    trackError('session_storage_write', err.message);
  }
}

export function deleteItemByKey(key) {
  try {
    window.sessionStorage.removeItem(key);
  } catch (err) {
    trackError('session_storage_delete', err.message);
  }
}

export default {
  getItemByKey,
  setItemByKey,
  deleteItemByKey,
};
