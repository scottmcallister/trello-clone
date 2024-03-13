import React, { useState, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import { Stack } from 'react-bootstrap';
import { User, Trash, Edit, Film } from 'react-feather';
import Button from 'react-bootstrap/Button';
import { deletePost, updatePost } from '../data';
import { DataContext } from '../state/dataProvider';
import GifPicker from 'gif-picker-react';
import GifImage from './gifimage';

const PostCard = ({ post }) => {
    const data = useContext(DataContext);
    const [hide, setHide] = useState(false);
    const [currentPost, setCurrentPost] = useState(post);
    const [gifSelectorOpen, setGifSelectorOpen] = useState(false);
    const clearPost = () => {
        deletePost(currentPost.id);
        setHide(true);
    }
    const updateGif = async (imageUrl) => {
        console.log('updateGif', imageUrl)
        const response = await updatePost(currentPost.id, { ...currentPost, imageUrl });
        console.log(response);
        currentPost.imageUrl = imageUrl;
        setCurrentPost({...currentPost, imageUrl});
    }
    const showGifSelector = gifSelectorOpen && data?.apiKey;
    const showGif = currentPost.imageUrl && !showGifSelector;
    
    return hide ?
    null
    : (
        <Card border={'secondary'}>
        <Card.Body>
            <Card.Title>{currentPost.content}</Card.Title>
            <Card.Subtitle>
            <User />
            {currentPost.author}
            </Card.Subtitle>
            <Card.Body>
                { showGif && <GifImage src={currentPost.imageUrl} onClose={() => updateGif(undefined)} />}
                { showGifSelector 
                    && <GifPicker
                            tenorApiKey={data?.apiKey}
                            onGifClick={async (gif) => {
                                setGifSelectorOpen(false);
                                await updateGif(gif.url);
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
