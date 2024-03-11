import React, { useEffect, useState } from 'react';
import { Stack, Spinner, Container, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Lane from '../components/lane';
import AddButton from '../components/addButton';
import { createLane, fetchBoard } from '../data';

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
    useEffect(() => {
        getBoardData();
    }, [boardId]);
    return(
        <Container>
            
            {loading ? <Spinner /> : (
                <>
                    <h1>{board.title}</h1>
                    <Stack direction="horizontal" gap={3}>
                        {board.lanes.map(list => (
                            <Lane key={list.id} lane={list} />
                        ))}
                        <Card style={{ minWidth: '200px' }}>
                            <AddButton callback={addLane} placeholder="add lane" />
                        </Card>
                    </Stack>
                </>
            )}
        </Container>
    );
};

export default Board;
