import React, { useState } from 'react';

const EditableText = ({ givenText, onSubmit = (text) => console.log(text) }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(givenText);

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleBlur = () => {
        setIsEditing(false);
        onSubmit(text);
    };

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleBlur();
        }
    };

    return (
        <>
            {isEditing ? (
                <input
                    type="text"
                    value={text}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyPress={handleKeyPress}
                    autoFocus
                />
            ) : (
                <span onDoubleClick={handleDoubleClick}>{text}</span>
            )}
        </>
    );
};

export default EditableText;
