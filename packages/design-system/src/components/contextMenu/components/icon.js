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
import PropTypes from 'prop-types';
import styled from 'styled-components';
/**
 * Internal dependencies
 */
import { VisuallyHidden } from '../../visuallyHidden';

const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  > * {
    flex: 1;
  }
`;

/**
 * A styled icon for use in the context menu. To be used within
 * the styled Button for the context menu.
 *
 * @param {Object} props Attributes to pass to the link.
 * @param {Node} props.children Children to render.
 * @param {string} props.title The text to display in the tooltip.
 * @param {string} props.className Optional class name to add to icon wrapper.
 * @return {Node} The react node
 */
function Icon({ children, title, className = '', ...props }) {
  return (
    <>
      <VisuallyHidden>{title}</VisuallyHidden>
      <IconWrapper className={className} {...props}>
        {children}
      </IconWrapper>
    </>
  );
}
Icon.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Icon;
