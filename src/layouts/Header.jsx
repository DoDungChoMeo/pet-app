import { Link } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import styled from 'styled-components';
import logo from '~/assets/img/logo-pet-friends-2.png';
import { useCartContext } from '~/contexts/CartProvider';

function Header() {
  const { cart } = useCartContext();

  return (
    <ContainerStyled>
      <nav>
        <Logo>
          <Link to="/">
            <h1 className="sr-only">Pet Friends</h1>
            <img src={logo} />
          </Link>
        </Logo>

        <CartLink to="/cart">
          <Badge count={cart?.quantity} showZero>
            <ShoppingCartOutlined className="cart-icon" />
          </Badge>
        </CartLink>
      </nav>
    </ContainerStyled>
  );
}

const ContainerStyled = styled.header`
  background-color: var(--white-color);
  box-shadow: var(--box-shadow-0);
  nav {
    height: 100px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    max-width: 1400px;
    margin: 0 auto;
  }
`;

const Logo = styled.div`
  margin-right: auto;
  img {
    display: block;
    height: 80px;
  }
`;

const CartLink = styled(Link)`
  cursur: pointer;
  .cart-icon {
    color: var(--ant-primary-color);
    font-size: 2.5rem;

    &:hover {
      color: var(--ant-primary-color-hover);
    }
  }
`;

export default Header;
