import * as React from "react";
import { PostType } from "client/model";
import { getLocalStorageMap } from "client/utils/getLocalStorageMap";

interface FetchDataState {
  isLoading: boolean;
  posts: PostType[];
  error?: any[];
}

export const useFetchPosts = (pageNumber: number) => {
  const [data, setData] = React.useState<FetchDataState>({
    isLoading: false,
    posts: [],
    error: [],
  });

  React.useEffect(() => {
    const fetchPosts = async (pageNumber: number) => {
      setData({
        isLoading: true,
        posts: [],
        error: [],
      });
      try {
        const response = await fetch(
          `https://hn.algolia.com/api/v1/search?page=${pageNumber}&hitsPerPage=30`
        );
        const { hits: posts } = await response.json();
        const pagePostMapFromLocalStorage = getLocalStorageMap();
        const currentPagePosts = pagePostMapFromLocalStorage.get(pageNumber);
        currentPagePosts != null
          ? setData({
              isLoading: false,
              error: [],
              posts: [...currentPagePosts],
            })
          : setData({
              isLoading: false,
              posts: [...posts],
              error: [],
            });
      } catch (error) {
        console.log({ error });
        setData({
          isLoading: false,
          posts: [],
          error: [{ error }],
        });
      }
    };
    fetchPosts(pageNumber);
  }, [pageNumber]);

  return { data, setData };
};
