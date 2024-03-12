import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function AddButton({ callback = (text) => {console.log(text)}, placeholder = 'add card'}) {
  const [text, setText] = useState('');
  const [showButton, setShowButton] = useState(false);

  const handleInputChange = (event) => {
    setText(event.target.value);
    setShowButton(event.target.value.length > 0);
  };
  const onSubmit = () => {
    if (text.length === 0) return;
    callback(text);
    setText('');
  };
  const onKeyDownEvent = (event) => {
    if (event.code === "Enter" || event.code === "NumpadEnter") {
      onSubmit();
    }
  }

  return (
    <InputGroup>
    <Form.Control
      type="text"
      placeholder={placeholder}
      value={text}
      onChange={handleInputChange}
      onKeyDown={onKeyDownEvent}
    />
      <Button active={showButton} variant="outline-primary" onClick={onSubmit}>Submit</Button>
    </InputGroup>
  );
}

export default AddButton;
