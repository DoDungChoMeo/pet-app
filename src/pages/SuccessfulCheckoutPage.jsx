import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Typography, Row, Col, Badge } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import { Price } from '~/components';

function SuccessfulCheckoutPage() {
  const location = useLocation();
  const {
    state: { order },
  } = location;
  const { user, cart } = order;

  return (
    <ContainerStyled>
      <header>
        <Typography.Title level={2} className="heading">
          Đặt hàng thành công
          {'  '}
          <CheckCircleOutlined />
        </Typography.Title>
      </header>

      <Row>
        <Col span={24}>
          <Typography.Title level={3}>Thông tin đơn hàng </Typography.Title>
        </Col>
        <Col span={24} lg={8}>
          <Typography.Title level={4}>Người đặt</Typography.Title>
          <UserInfo user={user} />
        </Col>
        <Col span={24} lg={8}>
          <Typography.Title level={4}>Phương thức thanh toán</Typography.Title>
          <p>
            {order?.paymentMethod === 'cod'
              ? 'Thanh toán tiền mặt khi nhận hàng COD'
              : order?.paymentMethod}
          </p>
        </Col>
        <Col span={24} className="cart-info">
          <Typography.Title level={4}>
            Sản phẩm {cart?.quantity}
          </Typography.Title>
          <CartInfo cart={cart} />
          <div className="footer-group">
            <Link to="/">Tiếp tục mua sắm</Link>
            <strong className="total-price">
              <span>Tổng cộng: </span>
              <Price>{cart?.total}</Price>
            </strong>
          </div>
        </Col>
      </Row>
    </ContainerStyled>
  );
}

const ContainerStyled = styled.div`
  box-shadow: var(--box-shadow-0);
  padding: 20px;
  background-color: var(--white-color);
  border-radius: 10px;

  header {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    margin: -20px;
    margin-bottom: 20px;
    padding: 20px;
    background: var(--ant-success-color);
    .heading {
      color: var(--white-color);
      margin: 0;
    }
  }

  .cart-info {
    .footer-group {
      float: right;
    }
    .total-price {
      margin-left: 20px;
    }
  }
`;

function UserInfo({ user }) {
  return (
    <UserInfoStyled>
      <div>
        <p className="user-name">Họ tên: {user?.name}</p>
        <p className="user-phone">Số điện thoại: {user?.phone}</p>
        <p className="user-address">Địa chỉ: {user?.address}</p>
        <p className="user-email">Email: {user?.email}</p>
      </div>
    </UserInfoStyled>
  );
}

const UserInfoStyled = styled.div``;

// section cart
function CartInfo({ cart }) {
  return (
    <div>
      {cart?.products?.map((item) => {
        return <CartItem key={item.productId} item={item} />;
      })}
    </div>
  );
}

const CartItem = ({ item }) => {
  return (
    <CartItemStyled>
      <Badge count={item.quantity} showZero>
        <figure>
          <img src={item.image} alt={item.title} />
        </figure>
      </Badge>
      <p className="cart-item-title" title={item.title}>
        {item.title}
      </p>

      <div className="cart-item-price">
        <Price>{item.price * item.quantity}</Price>
      </div>
    </CartItemStyled>
  );
};

const CartItemStyled = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 5px;

  .cart-item-title {
  }

  .cart-item-price {
    margin-left: auto;
    min-width: 100px;
    text-align: right;
  }

  figure {
    position: relative;
    display: block;
    min-width: 50px;
    border: 1px solid #ccc;
    &::before {
      content: '';
      width: 100%;
      display: block;
      padding-bottom: 100%;
    }
    img {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover; /* add object-fit */
    }
  }
`;

export default SuccessfulCheckoutPage;
