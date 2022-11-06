import React from 'react';
import styled from 'styled-components';

function Footer() {
  return (
    <ContainerStyled>
      <div className="footer-inner">
        <p>
          Pet Friends ©2022 Made with love by <span className='author'>Duc Tran</span>
        </p>
      </div>
    </ContainerStyled>
  );
}

const ContainerStyled = styled.footer`
  background: var(--white-color);
  height: 100px;
  padding: 20px;

  .footer-inner {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;
  }

  p {
    font-size: 1rem;
  }

  .author {
    font-weight: 600;
  }
`;

export default Footer;
