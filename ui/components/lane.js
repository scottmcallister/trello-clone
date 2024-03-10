import React from 'react';
import { Stack, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import AddButton from './addButton';

const Lane = ({ lane }) => {
  return (
    <Card style={{ minWidth: '200px' }}>
      <Card.Body>
        <Card.Title>{lane.title}</Card.Title>
        <Card.Text>
            <Stack direction="vertical" gap={3}>
                {lane.posts.map(card => (
                    <Card key={card.id}>
                        <Card.Body>
                            <Card.Text>{card.title}</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
                <AddButton />
            </Stack>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Lane;
