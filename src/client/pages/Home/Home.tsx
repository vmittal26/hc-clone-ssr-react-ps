import * as React from "react";
import { useHistory } from "react-router-dom";
import * as query from "query-string";

import { Spinner, useFetchPosts } from '../../shared/'
import { getLocalStorageMap } from "client/utils/getLocalStorageMap";
import { Posts , Header, Message} from "client/components";
import { PostType } from "client/model";
import { HomeContainer } from "./HomeCss";

interface FetchDataState{
    isLoading:boolean;
    posts:PostType[];
}

export const Home = (): React.ReactElement => {
  const history = useHistory();
  const { location } = history;
  const { page } = query.parse(location.search);
  const pageNum = page != null && !isNaN(Number(page)) ? Number(page) : 0;
  const [pageNumber, setPageNumber] = React.useState<number>(pageNum);
  //Custom hook to fetch posts and set state to loading and finish
  const { data : {isLoading , posts, error } , setData} = useFetchPosts(pageNumber);

  const onMore = () => {
    history.push(`/?page=${pageNumber + 1}`);
    setPageNumber(pageNumber + 1);
  };

  const persistPosts = (posts:PostType[] , pageNum: number)=>{
    const pagePostsStorage = getLocalStorageMap();
    pagePostsStorage.set(pageNum, posts);
    localStorage.pagePostsMap = JSON.stringify(Array.from(pagePostsStorage.entries()));
    setData(({
      isLoading:false,
      error:[],
      posts:[...posts]
    }));
  }

  const onClickHome = () => {
    history.push(`/`);
  }
  const onUpvote = (postId: number) => {
    console.log("on upvote", postId);
    const post: PostType | undefined = posts.find(
      (post) => post.objectID === postId
    );
    if (post != null) {
      post.points = post.points + 1;
      persistPosts(posts,pageNumber);
      setData(({
        isLoading:false,
        error:[],
        posts:[...posts]
      }));
    }
  };

  const onHidePost = (postId: number) => {
    console.log("on hidePost", postId);
    const postsFiltered = posts.filter((post) => post.objectID !== postId);
    persistPosts(postsFiltered,pageNumber);
    setData(({
      isLoading:false,
      error:[],
      posts:[...postsFiltered]
    }));
  };

  React.useEffect(() => {
    const unlisten = history.listen((location, _action) => {
      console.log('route changed');
      const { page } = query.parse(location.search);
      const pageNum = page != null && !isNaN(Number(page)) ? Number(page) : 0;
      setPageNumber(pageNum);
    });

    return unlisten;
  }, []);

 
  return (
    <HomeContainer>
      <Header onMore={onMore} onClickHome={onClickHome}/>
      {isLoading && <Spinner/>}
      {error!=null && error.length > 0 && <Message message={'Error loading posts'}/>}
      <Posts postItems={posts} onUpvote={onUpvote} onHidePost={onHidePost} />
    </HomeContainer>
  );
};
