import * as React from "react";
import { PostType } from "client/model";
import { getLocalStorageMap } from "client/utils/getLocalStorageMap";

interface FetchDataState {
  isLoading: boolean;
  posts: PostType[];
}

export const useFetchPosts = (pageNumber: number) => {
  const [data, setData] = React.useState<FetchDataState>({
    isLoading: false,
    posts: [],
  });

  React.useEffect(() => {
    const fetchPosts = async (pageNumber: number) => {
      setData({
        isLoading: true,
        posts: [],
      });
      const response = await fetch(
        `https://hn.algolia.com/api/v1/search?page=${pageNumber}&hitsPerPage=30`
      );
      const { hits: posts } = await response.json();
      setData({
        isLoading: false,
        posts: [...posts],
      });
    };

    const pagePostMapFromLocalStorage = getLocalStorageMap();
    const currentPagePosts = pagePostMapFromLocalStorage.get(pageNumber);
    currentPagePosts != null
      ? setData(({ isLoading }: FetchDataState) => ({
          isLoading,
          posts: [...currentPagePosts],
        }))
      : fetchPosts(pageNumber);
  }, [pageNumber]);

  return { data , setData };
};
