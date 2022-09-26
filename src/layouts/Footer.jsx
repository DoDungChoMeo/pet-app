import React from 'react';
import styled from 'styled-components';

const ContainerStyled = styled.footer`
  background: var(--ant-primary-1);
  height: 100px;
  padding: 20px;

  p {
    font-size: 1.2rem;
    font-weight: 700;
  }
`;

function Footer() {
  return (
    <ContainerStyled>
      <div>
        <p>Duc Tran</p>
      </div>
    </ContainerStyled>
  );
}

export default Footer;
