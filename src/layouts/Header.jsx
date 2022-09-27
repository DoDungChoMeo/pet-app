import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '~/assets/img/logo-pet-friends-2.png';

const ContainerStyled = styled.header`
  background-color: var(--white-color);
  box-shadow: var(--box-shadow-1);
  nav {
    height: 100px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    max-width: 1200px;
    margin: 0 auto;
  }
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
      <nav>
        <Logo>
          <Link to="/">
            <h1 className="sr-only">Pet Friends</h1>
            <img src={logo} />
          </Link>
        </Logo>
      </nav>
    </ContainerStyled>
  );
}

export default Header;
