import React, {useEffect, useState} from 'react';
import { Button, Container, Spinner, Stack, Row } from 'react-bootstrap';
import { fetchAllBoards, createBoard } from '../data';
import AddButton from '../components/addButton';
import { Trash, Trash2 } from 'react-feather';

const Home = () => {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);
    const updateBoards = async () => {
        const response = await fetchAllBoards();
        setBoards(response);
        setLoading(false);
    }
    const createNewBoard = async (text) => {
        const response = await createBoard({
            title: text,
            lanes: []
        });
        setBoards([...boards, response]);
    }
    useEffect(() => {
        updateBoards();
    }, []);
    
    return (
        <Container>
            <h1 style={{ textAlign: 'center' }}>List of Boards</h1>
            {loading ? <div className="text-center"><Spinner /></div> : (
                <Container>
                    <Stack gap={3}>
                        {boards.map(board => (
                            <div key={board.id}>
                                <a href={`#/board/${board.id}`} style={{ width: 'fit-content' }}>
                                    <Button variant="outline-secondary">{board.title}</Button>
                                </a>
                                <Button variant="outline-danger" onClick={() => console.log(board.id)} style={{ float: 'right' }}><Trash/></Button>
                            </div>
                        ))}
                        <AddButton callback={createNewBoard} />
                    </Stack>
                </Container>
            )}
        </Container>
    );
}
export default Home;
