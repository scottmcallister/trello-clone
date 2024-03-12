import React, { useState } from 'react';
import { Stack } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import AddButton from './addButton';
import { createPost } from '../data';
import PostCard from './postCard';

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
        <Card.Body>
            <Stack direction="vertical" gap={3}>
                {posts.map(post => (
                  <React.Fragment key={post.id}>
                    <PostCard post={post}/>
                  </React.Fragment>
                ))}
                <AddButton callback={addPost} placeholder="add post" />
            </Stack>
        </Card.Body>
      </Card.Body>
    </Card>
  );
};

export default Lane;
