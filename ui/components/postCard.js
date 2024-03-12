import React from 'react';
import Card from 'react-bootstrap/Card';
import { Stack } from 'react-bootstrap';
import { User, Trash, Edit, Film } from 'react-feather';
import Button from 'react-bootstrap/Button';

const PostCard = ({ post }) => {
    
    return (
        <Card border={'secondary'}>
        <Card.Body>
            <Card.Title>{post.content}</Card.Title>
            <Card.Subtitle>
            <User />
            {post.author}
            </Card.Subtitle>
            <Card.Text>
                <Stack direction="horizontal" style={{ paddingTop: '5px' }}>
                    <Button variant="outline-primary" size="sm" className="mx-4">
                        <Film />
                    </Button>
                    <Button variant="outline-success" size="sm" className="mx-4">
                        <Edit />
                    </Button>
                    <Button variant="outline-danger" size="sm" className="mx-4">
                        <Trash />
                    </Button>
                </Stack>
            </Card.Text>
        </Card.Body>
        </Card>
    );
};

export default PostCard;
