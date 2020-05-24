import * as React from 'react';
import styled from 'styled-components';


const HackerNewsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 100%;
  font-size: 20px;
  background: linear-gradient(20deg, rgb(219, 112, 147), #daa357);
`;

export const HackerNews = () => {
 
    const [pageNumber , setPageNumber] = React.useState<number>(0);
    const [posts , setPosts] = React.useState([]);

    React.useEffect(() => {
        const fetchPosts = async (pageNumber: number) => {
            const response = await fetch(
                `https://hn.algolia.com/api/v1/search?page=${pageNumber}&hitsPerPage=20`
            );
            const { hits:posts} = await response.json();
            setPosts([...posts]);
        }
        fetchPosts(pageNumber);

    }, [pageNumber]);

    return (
        <HackerNewsContainer>
           <ul>
               {posts.map((post:any) => <li key={post.objectID}>{post.title}</li>)}
           </ul>
            <button onClick ={()=>setPageNumber(pageNumber+1)}>More</button>
        </HackerNewsContainer>
    )
}

