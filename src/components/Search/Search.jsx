import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Search({ placeholderText, buttonMode, buttonText, ...props }) {
  const navigate = useNavigate();
  const [value, setValue] = useState('');

  const handleButtonClick = () => {
    console.log("Button click ", value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && value.length !== 0) {
      navigate(`./search?q=${value}`) 
    }
  }

  return (
    <ContainerStyled className="search">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        {...props}
      />

      {buttonMode ? (
        <ButtonStyled disabled={value.length === 0} onClick={handleButtonClick}>
          {buttonText}
        </ButtonStyled>
      ) : null}
    </ContainerStyled>
  );
}

const ContainerStyled = styled.div`
  background-color: #e9e9e9;
  border-radius: 100vh;
  display: flex;

  input {
    flex: 1 1 100%;
    border-top-left-radius: inherit;
    border-bottom-left-radius: inherit;
    padding: 12px 20px;
    border: none;
    outline: none;
    background-color: transparent;
  }

  &&:focus-within {
    outline-width: 4px;
    outline-style: solid;
    outline-color: var(--ant-primary-color-outline);
  }
`;

const ButtonStyled = styled.button`
  flex: 1 1 100px;
  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  cursor: ${(props) => (props.disabled ? 'initial' : 'pointer')};
`;

export default Search;
