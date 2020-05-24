import * as React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import * as query from 'query-string';


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

export const HackerNews = ():React.ReactElement => {

    const history = useHistory();
    const { location }  = history;
    const { page } = query.parse(location.search);
    const  pageNum =  page!=null && !isNaN(Number(page)) ? Number(page) : 0;
    const [pageNumber, setPageNumber] = React.useState<number>(pageNum);
    const [posts, setPosts] = React.useState([]);
 
    const onMore = () => {
        history.push(`/?page=${pageNumber + 1}`);
        setPageNumber(pageNumber + 1);
    }

    React.useEffect(() => {
        const unlisten = history.listen((location, _action) => {
            const { page } = query.parse(location.search);
            const  pageNum =  page!=null && !isNaN(Number(page)) ? Number(page) : 0;
            setPageNumber(pageNum);
        });

        return unlisten;
    },[])
    React.useEffect(() => {
        const fetchPosts = async (pageNumber: number) => {
            const response = await fetch(
                `https://hn.algolia.com/api/v1/search?page=${pageNumber}&hitsPerPage=20`
            );
            const { hits: posts } = await response.json();
            setPosts([...posts]);
        }
        fetchPosts(pageNumber);

    }, [pageNumber]);

    return (
        <HackerNewsContainer>
            <ul>
                {posts.map((post: any) => <li key={post.objectID}>{post.title}</li>)}
            </ul>
            <button onClick={onMore}>More</button>
        </HackerNewsContainer>
    )
}

