import * as React from 'react';
import { ReactElement } from 'react';

import upvoteIcon from '../../images/grayarrow.gif';
import { PostType } from '../../model';
import { PostItem } from '../PostItem/PostItem';
import Image from '../Image/Image';
import { PostsContainer } from './PostsCss';


interface PostsProps {
  postItems: PostType[];
  onHidePost:(postId: number)=>void;
  onUpvote: (postId: number) => void;
}

export const Posts = ({ postItems, onUpvote , onHidePost }: PostsProps): ReactElement => {
  return (
    <PostsContainer>
      <table>
        <thead></thead>
        <tbody>
          {postItems
            // .filter((postItem: PostType) => postItem.title)
            .map((postItem: PostType) => {
              const { num_comments, objectID, points } = postItem;
              return (
                <tr key={objectID}>
                  <td>
                    <span className='posts-comments'>{num_comments}</span>
                  </td>
                  <td>
                    <div className='posts-upvotes'>
                      <span>{points}</span>
                      <Image
                        src={upvoteIcon}
                        alt={'hackernews-logo'}
                        onClick={() => onUpvote(objectID)}
                      />
                    </div>
                  </td>
                  <td>
                    <PostItem postType ={postItem} onHidePost={onHidePost}/>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </PostsContainer>
  );
};
