import { PAGE_POSTS_STORAGE_KEY } from "./../shared/Constants";
import { PostType } from "./../model/PostType";

export const getLocalStorageMap = (): Map<number, PostType[]> => {
  if (localStorage.getItem(PAGE_POSTS_STORAGE_KEY)) {
    console.log("data exists in local storage");
    return new Map(JSON.parse(localStorage.pagePostsMap));
  } else {
    console.log("data does not exist local storage");
    return new Map<number, PostType[]>();
  }
};
