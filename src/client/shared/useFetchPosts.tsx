import * as React from "react";
import { PostType } from "client/model";
import { getLocalStorageMap } from "client/utils/getLocalStorageMap";
import { getAPIURL } from "client/utils/getAPIURL";
import { DEFAULT_PAGE_SIZE } from "./Constants";

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
        const response = await fetch(getAPIURL(pageNumber, DEFAULT_PAGE_SIZE));
        const { hits: posts } = await response.json();
        const pagePostMapFromLocalStorage = getLocalStorageMap();
        const currentPagePosts = pagePostMapFromLocalStorage.get(pageNumber);
        // Check if posts are in localstorage if exists load from localstorage else load 
        // from api
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
