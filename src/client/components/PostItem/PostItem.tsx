import * as React from 'react';
import { ReactElement } from 'react';
import { PostType } from '../../model';
import getDomainURL from '../../utils/getDomainURL';
import { format } from 'date-fns';

import { FlexContainer } from 'client/shared';
import { Postitemcontainer } from './PostItemCss';

interface PostTypeProps{
  onHidePost:(postId:number)=>void;
  postType:PostType
}

export const PostItem = ({ postType , onHidePost }: PostTypeProps): ReactElement => {
  const { title, author, url: domain, created_at , objectID} = postType;
  let domainURL = getDomainURL(domain);

  return (
    <Postitemcontainer>
      <FlexContainer>
        <h4 className="post-title item"> {title ? title : ''}</h4>
      </FlexContainer>
      <FlexContainer>
        <div className="post-domain item">{domainURL && `(${domainURL})`}</div>
        <div className="post-author item">
          <span>by</span> {<strong>{author}</strong>}
        </div>
        <div className="post-date item">{`on ${format(
          new Date(created_at),
          'dd-MMM-yyyy'
        )}`}</div>
        <button className="post-hide item" onClick={()=>onHidePost(objectID)}>
          <span>[</span>hide<span>]</span>
        </button>
      </FlexContainer>
    </Postitemcontainer>
  );
};
