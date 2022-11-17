import { Link } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import styled from 'styled-components';
import logo from '~/assets/img/logo-pet-friends-2.png';
import { useCartContext } from '~/contexts/CartProvider';
import { Search } from '~/components';

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
        <div className='nav-search'>
          <Search placeholder="Tìm sản phẩm, danh mục hay thương hiệu mong muốn ..." />
        </div>
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
    min-height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px 0;
    padding: 20px;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    max-width: 1400px;
    margin: 0 auto;
  }
  .nav-search {
    width: 40%;
    @media (max-width: 576px) {
      flex: 1 1 100%;
      order: 2;
      text-align: center;
    }
  }
`;

const Logo = styled.div`
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
