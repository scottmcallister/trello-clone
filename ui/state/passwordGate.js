import React, { useState } from 'react';
import { checkPassword } from '../data/';

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
    <div><img src='/dennis.gif'></img></div>
    : (
        <div>
            {!isPasswordCorrect && (
                <form onSubmit={handleSubmit}>
                    <label>
                        Password:
                        <input type="password" value={input} onChange={handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            )}
            {isPasswordCorrect && children}
            
        </div>
    );
};

export default PasswordProtected;