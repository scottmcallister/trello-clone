import React, { useState, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import { Stack } from 'react-bootstrap';
import { User, Trash, Edit, Film } from 'react-feather';
import Button from 'react-bootstrap/Button';
import { deletePost } from '../data';
import { DataContext } from '../state/dataProvider';
import GifPicker from 'gif-picker-react';

const PostCard = ({ post }) => {
    const data = useContext(DataContext);
    const [hide, setHide] = useState(false);
    const [gifSelectorOpen, setGifSelectorOpen] = useState(false);
    const clearPost = () => {
        deletePost(post.id);
        setHide(true);
    }
    const showGifSelector = gifSelectorOpen && data?.apiKey;
    
    return hide ?
    null
    : (
        <Card border={'secondary'}>
        <Card.Body>
            <Card.Title>{post.content}</Card.Title>
            <Card.Subtitle>
            <User />
            {post.author}
            </Card.Subtitle>
            <Card.Body>
                { showGifSelector 
                    && <GifPicker
                            tenorApiKey={data?.apiKey}
                            onGifClick={(gif) => {
                                setGifSelectorOpen(false);
                                console.log(gif);
                            }}
                        /> }
                <Stack direction="horizontal" style={{ paddingTop: '5px' }}>
                    <Button variant="outline-primary" size="sm" className="mx-4" onClick={() => setGifSelectorOpen(true)}>
                        <Film />
                    </Button>
                    <Button variant="outline-success" size="sm" className="mx-4">
                        <Edit />
                    </Button>
                    <Button variant="outline-danger" size="sm" className="mx-4" onClick={clearPost}>
                        <Trash />
                    </Button>
                </Stack>
            </Card.Body>
        </Card.Body>
        </Card>
    );
};

export default PostCard;
