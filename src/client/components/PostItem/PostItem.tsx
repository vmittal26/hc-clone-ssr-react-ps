import * as React from "react";
import { ReactElement } from "react";
import { PostType } from "../../model";
import getDomainURL from "../../utils/getDomainURL";
import { format } from "date-fns";
import { Postitemcontainer } from "./PostItemCss";

interface PostTypeProps {
  onHidePost: (postId: number) => void;
  postType: PostType;
}

export const PostItem = ({
  postType,
  onHidePost,
}: PostTypeProps): ReactElement => {
  const { title, author, url: domain, created_at, objectID } = postType;
  let domainURL = getDomainURL(domain);

  return (
    <Postitemcontainer>
      <h4 className="post-title item"> {title ? title : "No Title exists for this news"}</h4>
      <span className="post-domain item">{domainURL && `(${domainURL})`}</span>
      <span className="item">by  <strong>{author}</strong></span>
      <span className="item">{`on ${format(
        new Date(created_at),
        "dd-MMM-yyyy"
      )}`}</span>
      <button className="post-hide item" onClick={() => onHidePost(objectID)}>
        <span>[</span>hide<span>]</span>
      </button>
    </Postitemcontainer>
  );
};
