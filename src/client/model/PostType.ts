export interface PostResponse{
    hits:PostType[];
};

export interface PostType{
        objectID:number;
        num_comments:number;
        author:string;
        points:number;
        title:string;
        url:string;
        created_at:string;
}