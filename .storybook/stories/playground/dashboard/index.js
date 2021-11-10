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
import Dashboard, { InterfaceSkeleton } from '@web-stories-wp/dashboard';
import styled from 'styled-components';
import { useRef } from 'react';
import { toId } from '@storybook/csf';

/**
 * Internal dependencies
 */
import { GlobalStyle } from './theme';

export default {
  title: 'Playground/Dashboard',
};

const AppContainer = styled.div`
  height: 100vh;
`;

const apiCallbacksNames = [
  'createStoryFromTemplate',
  'duplicateStory',
  'fetchStories',
  'getAuthors',
  'trashStory',
  'updateStory',
];

// @todo Remove items which are not required for now.
const fetchStoriesResp = {
  stories: {
    1: {
      id: 1,
      status: 'publish',
      title: 'Example story',
      created: '2021-11-04T10:12:47',
      createdGmt: '2021-11-04T10:12:47Z',
      modified: '2021-11-04T10:12:48',
      modifiedGmt: '2021-11-04T10:12:48Z',
      author: {
        name: 'author',
        id: 3,
      },
      locked: false,
      lockUser: {
        id: 0,
        name: '',
        avatar: null,
      },
      bottomTargetAction:
        'http://localhost:8899/wp-admin/post.php?post=85&action=edit',
      featuredMediaUrl: '',
      editStoryLink:
        'http://localhost:8899/wp-admin/post.php?post=85&action=edit',
      previewLink: 'http://localhost:8899/web-stories/test-quick-edit',
      link: 'http://localhost:8899/web-stories/test-quick-edit',
      capabilities: {
        hasEditAction: true,
        hasDeleteAction: true,
      },
    },
  },
  fetchedStoryIds: [1],
  totalPages: 1,
  totalStoriesByStatus: {
    all: 1,
    publish: 1,
    draft: 0,
    future: 0,
    pending: 0,
    private: 0,
  },
};

// @todo Callbacks should be optional.
const apiCallbacks = apiCallbacksNames.reduce((callbacks, name) => {
  let response;

  switch (name) {
    case 'fetchStories':
      response = fetchStoriesResp;
      break;
    case 'getAuthors':
      response = [];
      break;
    default:
      response = {};
  }
  callbacks[name] = () => Promise.resolve(response);

  return callbacks;
}, {});

const linkHrefTo = (title, name) => {
  const url = new URL(window.parent.location);
  url.searchParams.set('path', '/story/' + toId(title, name));
  return decodeURIComponent(url.href);
};

// @todo Cleanup config and use a default configuration inside core dashboard package.
const config = {
  userId: 1,
  flags: {
    enableSVG: false,
    enablePostLocking: false,
    archivePageCustomization: true,
    enableBetterCaptions: true,
    enableInProgressTemplateActions: false,
  },
  capabilities: {
    canManageSettings: true,
    canUploadFiles: true,
  },
  newStoryURL: linkHrefTo('Playground/Stories Editor', 'default'),
  api: {},
  apiCallbacks,
};

/**
 * Clears url hash ( Required only for storybook )
 * Dashboard uses # for checking route path and story-editor uses #page,
 * when returning from story-editor to dashboard in storybook, currentPath read from history package gets manipulated,
 * which breaks the current path, so this custom hook is used to clear the hash before dashboard app is mounted.
 */
const useClearHash = () => {
  const isHashCleaned = useRef(false);

  if (!isHashCleaned.current) {
    window.location.hash = '/';
    isHashCleaned.current = true;
  }
};

export const _default = () => {
  useClearHash();

  return (
    <AppContainer>
      <Dashboard config={config}>
        <GlobalStyle />
        <InterfaceSkeleton />
      </Dashboard>
    </AppContainer>
  );
};
