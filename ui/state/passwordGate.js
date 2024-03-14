import React, { useState } from 'react';
import { checkPassword } from '../data/';
import { Button, Form, InputGroup } from 'react-bootstrap';

const PasswordProtected = ({ password, children }) => {
    const [input, setInput] = useState('');
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
    const [failure, setFailure] = useState(false);

    const handleChange = (event) => {
        setInput(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await checkPassword(input);
        const text = await response.text();
        console.log(text);
        if (text === "Correct") {
            setIsPasswordCorrect(true);
        } else {
            setFailure(true);
        }
    };

    return failure ? 
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <img src='/dennis.gif' alt='Dennis GIF' />
    </div>
    : (
        <div>
            {!isPasswordCorrect && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <div style={{maxWidth: '600px'}}>
                        <InputGroup>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" value={input} onChange={handleChange} onKeyPress={(event) => event.key === 'Enter' && handleSubmit(event)} />
                            <Button onClick={handleSubmit} type="submit">Submit</Button>
                        </InputGroup>
                    </div>
                </div>
            )}
            {isPasswordCorrect && children}
            
        </div>
    );
};

export default PasswordProtected;