import React, { useState } from 'react';
import { Stack } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import AddButton from './addButton';
import { createPost } from '../data';

const Lane = ({ lane }) => {
  const [posts, setPosts] = useState(lane.posts);
  const author = 'John Doe'; // TODO: replace with actual author
  const addPost = async (content) => {
    const response = await createPost({
        content,
        author,
        timestamp: new Date().toISOString()
    }, lane.id);
    setPosts([...posts, response]);
}
  return (
    <Card style={{ minWidth: '200px' }}>
      <Card.Body>
        <Card.Title>{lane.title}</Card.Title>
        <Card.Text>
            <Stack direction="vertical" gap={3}>
                {posts.map(post => (
                    <Card key={post.id}>
                        <Card.Body>
                            <Card.Text>{post.content}</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
                <AddButton callback={addPost} placeholder="add post" />
            </Stack>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Lane;
