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
import type { Link } from '@googleforcreators/types';
import { withProtocol } from '@googleforcreators/url';
/**
 * Internal dependencies
 */
import type { WithLinkProps } from '../../types';

function WithLink({ element, children, ...rest }: WithLinkProps) {
  const link: Link = element.link || ({} as Link);
  const { url, icon, desc, rel = [] } = link;
  if (!url) {
    return children;
  }
  const clonedRel = rel.concat(['noreferrer']);
  const urlWithProtocol = withProtocol(url);
  return (
    // eslint-disable-next-line react/jsx-no-target-blank -- False positive
    <a
      href={urlWithProtocol}
      data-tooltip-icon={icon || undefined}
      data-tooltip-text={desc}
      target="_blank"
      rel={clonedRel.join(' ')}
      {...rest}
    >
      {children}
    </a>
  );
}

export default WithLink;
