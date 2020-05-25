import * as React from "react";
import { useHistory } from "react-router-dom";
import * as query from "query-string";
import { Header } from "../../components/Header/Header";
import { Posts } from "client/components";
import { PostType } from "client/model";
import { HomeContainer } from "./HomeCss";
import { getLocalStorageMap } from "client/utils/getLocalStorageMap";
import { Spinner, useFetchPosts } from '../../shared/'

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
  const { data : {isLoading , posts } , setData} = useFetchPosts(pageNumber);

  const onMore = () => {
    history.push(`/?page=${pageNumber + 1}`);
    setPageNumber(pageNumber + 1);
  };

  const persistPosts = (posts:PostType[] , pageNum: number)=>{
    const pagePostsStorage = getLocalStorageMap();
    pagePostsStorage.set(pageNum, posts);
    localStorage.pagePostsMap = JSON.stringify(Array.from(pagePostsStorage.entries()));
    setData(({isLoading}:FetchDataState)=>({
      isLoading,
      posts:[...posts]
    }));
  }

  const onUpvote = (postId: number) => {
    console.log("on upvote", postId);
    const post: PostType | undefined = posts.find(
      (post) => post.objectID === postId
    );
    if (post != null) {
      post.points = post.points + 1;
      persistPosts(posts,pageNumber);
      setData(({isLoading}:FetchDataState)=>({
        isLoading,
        posts:[...posts]
      }));
    }
  };

  const onHidePost = (postId: number) => {
    console.log("on hidePost", postId);
    const postsFiltered = posts.filter((post) => post.objectID !== postId);
    persistPosts(postsFiltered,pageNumber);
    setData(({isLoading}:FetchDataState)=>({
      isLoading,
      posts:[...postsFiltered]
    }));
  };

  const onResetPosts = () => {
    localStorage.removeItem("pagePostsMap");
    history.push(`/?page=${pageNumber}`);
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
      <Header onMore={onMore} onResetPosts={onResetPosts} />
      {isLoading && <Spinner/>}
      <Posts postItems={posts} onUpvote={onUpvote} onHidePost={onHidePost} />
    </HomeContainer>
  );
};
