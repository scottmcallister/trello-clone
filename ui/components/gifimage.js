import React, { useState } from 'react';
import { XSquare } from 'react-feather';

const GifImage = ({ src, onClose }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            style={{ position: 'relative', display: 'inline-block' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img src={src} alt="gif" style={{ maxWidth: '300px', maxHeight: '300px' }} />
            {isHovered && (
                <button
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '20px',
                        color: 'red',
                    }}
                    onClick={onClose}
                >
                    <XSquare />
                </button>
            )}
        </div>
    );
};

export default GifImage;
