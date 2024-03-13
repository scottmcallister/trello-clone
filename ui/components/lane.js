import React, { useState } from 'react';
import { Stack } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import AddButton from './addButton';
import { createPost, updateLane } from '../data';
import PostCard from './postCard';
import { Trash } from 'react-feather';
import EditableText from './editableText';

const Lane = ({ lane, onClose }) => {
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
  const updateLaneTitle = async (title) => {
    lane.title = title;
    await updateLane(lane.id, lane);
  }
  return (
    <Card style={{ minWidth: '400px' }}>
      <Card.Body>
        <Card.Title>
          <EditableText givenText={lane.title} onSubmit={updateLaneTitle} />
          <button style={{float: 'right'}} className="btn btn-outline-danger btn-sm" onClick={onClose}><Trash /></button>
        </Card.Title>
        <Card.Body>
            <Stack direction="vertical" gap={3}>
                <AddButton callback={addPost} placeholder="add post" />
                {posts.map(post => (
                  <React.Fragment key={post.id}>
                    <PostCard post={post}/>
                  </React.Fragment>
                ))}
            </Stack>
        </Card.Body>
      </Card.Body>
    </Card>
  );
};

export default Lane;
