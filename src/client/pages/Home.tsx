import * as React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import * as query from 'query-string';
import { Header } from '../components/Header/Header';


const HomeContainer = styled.div`
    max-width: 62.5rem;
    width: 95%;
    font-size: 0.6rem;
    margin: 0 auto;
    margin-top: 0.5rem;
    align-items: center;
    background: #f7f7f7;
    overflow: auto;
    height: 98vh;
    position: relative;
`;

export const Home = ():React.ReactElement => {

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
        <HomeContainer>
            <Header/>
            <button onClick={onMore}>More</button>
        </HomeContainer>
    )
}

