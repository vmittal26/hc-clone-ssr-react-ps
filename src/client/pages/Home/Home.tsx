import * as React from "react";
import { useHistory } from "react-router-dom";
import * as query from "query-string";
import { Header } from "../../components/Header/Header";
import { Posts } from "client/components";
import { PostType } from "client/model";
import { HomeContainer } from "./HomeCss";
import { getLocalStorageMap } from "client/utils/getLocalStorageMap";

export const Home = (): React.ReactElement => {
  const history = useHistory();
  const { location } = history;
  const { page } = query.parse(location.search);
  const pageNum = page != null && !isNaN(Number(page)) ? Number(page) : 0;
  const [pageNumber, setPageNumber] = React.useState<number>(pageNum);
  const [posts, setPosts] = React.useState([]);

  const onMore = () => {
    history.push(`/?page=${pageNumber + 1}`);
    setPageNumber(pageNumber + 1);
  };

  const onUpvote = (postId: number) => {
    console.log("on upvote", postId);
    const post: PostType | undefined = posts.find(
      (post) => post.objectID === postId
    );
    if (post != null) {
      post.points = post.points + 1;
      const pagePostsStorage = getLocalStorageMap();
      pagePostsStorage.set(pageNumber, posts);
      localStorage.pagePostsMap = JSON.stringify( Array.from(pagePostsStorage.entries()));
      setPosts([...posts]);
    }
  };

  const onHidePost = (postId: number) => {
    console.log("on hidePost", postId);
    const postsFiltered = posts.filter((post) => post.objectID !== postId);
    const pagePostsStorage = getLocalStorageMap();
    pagePostsStorage.set(pageNumber, postsFiltered);
    localStorage.pagePostsMap = JSON.stringify( Array.from(pagePostsStorage.entries()));
    setPosts([...postsFiltered]);
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

  React.useEffect(() => {
    console.log('fetching posts...');
    const fetchPosts = async (pageNumber: number) => {
      const response = await fetch(
        `https://hn.algolia.com/api/v1/search?page=${pageNumber}&hitsPerPage=30`
      );
      const { hits: posts } = await response.json();
      setPosts([...posts]);
    };
    const pagePostMapFromLocalStorage = getLocalStorageMap();
    const currentPagePosts = pagePostMapFromLocalStorage.get(pageNumber);
    currentPagePosts != null ? setPosts([...currentPagePosts]) : fetchPosts(pageNumber);
    
  }, [pageNumber]);

  return (
    <HomeContainer>
      <Header onMore={onMore} onResetPosts={onResetPosts} />
      <Posts postItems={posts} onUpvote={onUpvote} onHidePost={onHidePost} />
    </HomeContainer>
  );
};
