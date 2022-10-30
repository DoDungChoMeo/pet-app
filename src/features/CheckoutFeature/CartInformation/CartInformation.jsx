import React from 'react';
import styled from 'styled-components';
import { Badge } from 'antd';
import { Price } from '~/components';

function CartInformation({ cart }) {
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

export default CartInformation;
