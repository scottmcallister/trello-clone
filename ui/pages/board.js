import React, { useEffect, useState } from 'react';
import { Stack, Spinner, Container, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Lane from '../components/lane';
import AddButton from '../components/addButton';
import { createLane, fetchBoard, deleteLane } from '../data';
import { RefreshCw } from 'react-feather';

const Board = () => {
    const { id: boardId } = useParams();
    const [board, setBoard] = useState({});
    const [loading, setLoading] = useState(true);
    const getBoardData = async () => {
        const response = await fetchBoard(boardId);
        setBoard(response);
        setLoading(false);
    };
    const addLane = async (text) => {
        const response = await createLane({
            title: text,
            posts: []
        }, boardId);
        setBoard({
            ...board,
            lanes: [...board.lanes, response]
        });
    }
    const removeLane = async (id) => {
        await deleteLane(id);
        setBoard({
            ...board,
            lanes: board.lanes.filter(lane => lane.id !== id)
        });
    }

    useEffect(() => {
        getBoardData();
    }, [boardId]);
    return(
        <Container>
            
            {loading ? <Spinner /> : (
                <>
                    <h1>{board.title}</h1>
                    <div className='py-3'>
                        <Button variant="outline-success" onClick={getBoardData}><RefreshCw /></Button>
                    </div>
                    <Stack direction="horizontal" gap={3} style={{ alignItems: 'baseline' }}>
                        {board.lanes.map(lane => (
                            <Lane key={lane.id} lane={lane} onClose={() => removeLane(lane.id)} />
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
