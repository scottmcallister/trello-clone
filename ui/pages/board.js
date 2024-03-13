import React, { useEffect, useState } from 'react';
import { Stack, Spinner, Container, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Lane from '../components/lane';
import AddButton from '../components/addButton';
import { createLane, fetchBoard, deleteLane, updateBoard } from '../data';
import { ArrowLeft, RefreshCw } from 'react-feather';
import EditableText from '../components/editableText';

const Board = () => {
    const { id: boardId } = useParams();
    const [board, setBoard] = useState({});
    const [loading, setLoading] = useState(true);
    const getBoardData = async () => {
        const response = await fetchBoard(boardId);
        console.log('fetchBoard response:', response); // Check the response
        setBoard(response);
        setLoading(false);
    };
    React.useEffect(() => {
        console.log('board state:', board);
    }, [board]);
    const addLane = async (text) => {
        const response = await createLane({
            title: text,
            posts: []
        }, boardId);
        setBoard(prevBoard => ({
            ...prevBoard,
            lanes: [...prevBoard.lanes, response]
        }));
    }
    const removeLane = async (id) => {
        await deleteLane(id);
        setBoard(prevBoard => ({
            ...prevBoard,
            lanes: prevBoard.lanes.filter(lane => lane.id !== id)
        }));
    }
    const updateBoardTitle = async (title) => {
        board.title = title;
        await updateBoard(boardId, board);
    }

    useEffect(() => {
        getBoardData();
    }, [boardId]);
    return(
        <Container>
            
            {loading ? <Spinner /> : (
                <>
                    <h1><EditableText givenText={board.title} onSubmit={updateBoardTitle} /></h1>
                    <Stack direction="horizontal" gap={3} className='py-3'>
                        <Button variant="outline-primary" href="#/"><ArrowLeft /></Button>
                        <Button variant="outline-success" onClick={getBoardData}><RefreshCw /></Button>
                    </Stack>
                    <Stack direction="horizontal" gap={3} style={{ alignItems: 'baseline' }}>
                        {board.lanes.map(lane => (
                            <Lane key={lane.posts.reduce((a, c) => `${a}${c}`, '')} lane={lane} onClose={() => removeLane(lane.id)} />
                        ))}
                        <div style={{ minWidth: '400px', maxWidth: '400px' }}>
                            <AddButton callback={addLane} placeholder="add lane" />
                        </div>
                    </Stack>
                </>
            )}
        </Container>
    );
};

export default Board;
