import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, Divider, Button, Form, message, Typography } from 'antd';
import styled from 'styled-components';
import { getFirestore, collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';

import {
  CheckoutForm,
  PaymentMethod,
  CartInformation,
} from '~/features/CheckoutFeature';
import { Price } from '~/components';
import { useCartContext } from '~/contexts/CartProvider';

function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, userId, submitCart } = useCartContext();
  const [formCheckout] = Form.useForm();
  const [formPayment] = Form.useForm();
  const handleCheckout = () => {
    formCheckout
      .validateFields()
      .then((values) => {
        formPayment
          .validateFields()
          .then((payment) => {
            const userData = {
              email: values.email.trim() || '',
              name: values.name.trim() || '',
              phone: values.phone.trim() || '',
              address: values.address.trim() || '',
              userId
            }
            const firestore = getFirestore();
            const orderRef = doc(collection(firestore, 'orders'));
            const orderData = {
              orderId: orderRef.id,
              user: userData,
              notes: values.notes || '',
              paymentMethod: payment.paymentMethod || '',
              cart,
              createAt: serverTimestamp()
            };
            setDoc(orderRef, orderData)
            .then(() => {
                submitCart();
                message.success('Đặt hàng thành công');
                navigate('/successful-checkout', {state: {order: orderData}});
              })
              .catch((e) => {
                message.error('Đặt hàng thất bại: ', e);
              });            
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  };

  return (
    <ContainerStyled>
      <Typography.Title level={2}>Đặt hàng</Typography.Title>
      <Row gutter={[50, 0]}>
        <Col span={24} lg={8}>
          <Headline>
            <h2>Thông tin khách hàng</h2>
          </Headline>
          <CheckoutForm form={formCheckout} />
        </Col>
        <Col span={24} lg={8}>
          <Headline>
            <h2>Phương thức thanh toán</h2>
          </Headline>
          <PaymentMethod form={formPayment} />
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

            <Button
              onClick={handleCheckout}
              type="primary"
              disabled={cart?.quantity === 0}
            >
              Đặt hàng
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
