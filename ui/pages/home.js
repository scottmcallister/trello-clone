import React, {useEffect, useState} from 'react';
import { Button, Container, Spinner, Stack } from 'react-bootstrap';
import { fetchAllBoards, createBoard, deleteBoard } from '../data';
import AddButton from '../components/addButton';
import { Trash, LogIn } from 'react-feather';

const Home = () => {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);
    const updateBoards = async () => {
        const response = await fetchAllBoards();
        setBoards(response);
        setLoading(false);
    }
    const deleteExistingBoard = async (id) => {
        const response = await deleteBoard(id);
        const newBoards = response.status === 200 ? boards.filter(board => board.id !== id) : boards;
        setBoards(newBoards);
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
            <div style={{ maxWidth: '1000px', margin: 'auto' }}>
                <h1 style={{ textAlign: 'center' }}>List of Boards</h1>
                {loading ? <div className="text-center"><Spinner /></div> : (
                    <Container>
                        <Stack gap={3}>
                            {boards.map(board => (
                                <div key={board.id}>
                                    <span className="h3">{board.title}</span>
                                    <Button variant="outline-danger" onClick={(e) => {
                                        e.stopPropagation();
                                        deleteExistingBoard(board.id);
                                    }} style={{ float: 'right' }}><Trash/></Button>
                                    <a href={`#/board/${board.id}`} style={{ float: 'right', paddingRight: '20px' }}>
                                        <Button variant="outline-primary"><LogIn/></Button>
                                    </a>
                                </div>
                            ))}
                            <AddButton callback={createNewBoard} placeholder='add board' />
                        </Stack>
                    </Container>
                )}
            </div>
        </Container>
    );
}
export default Home;
