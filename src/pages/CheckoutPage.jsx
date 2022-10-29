import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Divider, Button } from 'antd';
import styled from 'styled-components';

import {
  CheckoutForm,
  PaymentMethod,
  CartInformation,
} from '~/features/CheckoutFeature';
import { Price } from '~/components';
import { useCartContext } from '~/contexts/CartProvider';

function CheckoutPage() {
  const { cart } = useCartContext();

  return (
    <ContainerStyled>
      <Row gutter={[50, 0]}>
        <Col span={24} lg={8}>
          <Headline>
            <h2>Thông tin khách hàng</h2>
          </Headline>
          <CheckoutForm />
        </Col>
        <Col span={24} lg={8}>
          <Headline>
            <h2>Phương thức thanh toán</h2>
          </Headline>
          <PaymentMethod />
        </Col>
        <Col span={24} lg={8} className="cart-info">
          <Headline>
            <h2>{`Đơn hàng (${cart?.quantity} sản phẩm)`}</h2>
          </Headline>
          <CartInformation cart={cart} />
          <Divider />
          <strong className="total-price">
            <span>Tổng cộng: </span>
            <Price>{cart?.total}</Price>
          </strong>
          <Divider />
          <ButtonGroup>
            <Link to="/cart">Quay lại giỏ hàng</Link>

            <Button type="primary" disabled={cart?.quantity === 0}>
              Thanh toán
            </Button>
          </ButtonGroup>
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

  .total-price {
    display: flex;
    justify-content: space-between;
  }

  .cart-info {
    @media (min-width: 992px) {
      border-left: 2px solid #eee;
    }
  }
`;

const Headline = styled.div`
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default CheckoutPage;
