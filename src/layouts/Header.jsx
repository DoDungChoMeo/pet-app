import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '~/assets/logo-pet-friends-2.png';

const ContainerStyled = styled.header`
  height: 100px;
  background-color: var(--ant-primary-1);
  display: flex;
  align-items: center;
  padding: 0 20px;

  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
`;

const Logo = styled.div`
  img {
    display: block;
    height: 80px;
  }
`;

function Header() {
  return (
    <ContainerStyled>
      <Logo>
        <Link to="/">
          <h1 className="sr-only">Pet Friends</h1>
          <img src={logo} />
        </Link>
      </Logo>
    </ContainerStyled>
  );
}

export default Header;
