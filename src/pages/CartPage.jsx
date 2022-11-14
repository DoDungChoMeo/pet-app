import { useNavigate, Link } from 'react-router-dom';
import { Table, Button, Popconfirm, InputNumber } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import React from 'react';
import styled from 'styled-components';
import { useCartContext } from '~/contexts/CartProvider';
import { Price } from '~/components';
import { productSalesState } from '~/features/ProductFeature/utils';

const columns = [
  {
    key: 'item',
    title: 'Sản phẩm',
    dataIndex: 'item',
  },
  {
    key: 'price',
    title: 'Giá bán',
    dataIndex: 'price',
  },
  {
    key: 'quantity',
    title: 'Số lượng',
    dataIndex: 'quantity',
  },
  {
    key: 'total',
    title: 'Tổng',
    dataIndex: 'total',
  },
  {
    key: 'action',
    title: 'Thao tác',
    dataIndex: 'action',
  },
];

function CartPage() {
  const navigate = useNavigate();
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    inputQuantity,
    removeItem,
  } = useCartContext();

  let dataSource = [];
  dataSource = cart.products.map((cartItem) => {
    const { inventory } = cartItem;
    const salesState = productSalesState(
      inventory?.stock,
      inventory?.reservations
    );
    return {
      key: cartItem?.productId,
      item: (
        <Item>
          <img width={100} src={cartItem?.image} alt={cartItem?.title} />
          <span>{cartItem?.title}</span>
        </Item>
      ),
      price: <Price>{cartItem?.price}</Price>,
      quantity: (
        <Quantity>
          <Button
            size="small"
            onClick={() => {
              // không được ít hơn 1
              if (cartItem?.quantity > 1) {
                decreaseQuantity(cartItem?.productId);
              }
            }}
          >
            -
          </Button>
          {/* <span>{product?.quantity}</span> */}
          <InputNumber
            value={cartItem?.quantity}
            controls={false}
            size="small"
            className="input-number"
            min={1}
            max={salesState.remaining}
            onChange={(value) => inputQuantity(cartItem?.productId, value)}
          />
          <Button
            size="small"
            onClick={() => {
              // không được tăng quá số lượng còn lại
              if (cartItem?.quantity < salesState.remaining) {
                increaseQuantity(cartItem?.productId);
              }
            }}
          >
            +
          </Button>
        </Quantity>
      ),
      total: <Price>{cartItem?.quantity * cartItem?.price}</Price>,
      action: (
        <Popconfirm
          title="Bạn có muốn xóa?"
          okText="Xóa"
          cancelText="Không"
          onConfirm={() => removeItem(cartItem?.productId)}
        >
          <DeleteOutlined
            style={{
              color: 'var(--ant-error-color)',
              fontSize: 20,
            }}
          />
        </Popconfirm>
      ),
    };
  });

  return (
    <ContainerStyled>
      <Table columns={columns} dataSource={dataSource} pagination={false} />
      <CartSummary>
        <Link to="/">Tiếp tục mua sắm</Link>
        <strong>
          <span>Tổng cộng: </span>
          <Price>{cart?.total}</Price>
        </strong>

        <Button
          type="primary"
          onClick={() => navigate('/checkout')}
          disabled={cart?.quantity === 0}
        >
          Tiến hành đặt hàng
        </Button>
      </CartSummary>
    </ContainerStyled>  
  );
}

const CartSummary = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  align-items: baseline;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Quantity = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  .input-number {
    width: 50px;
  }
`;

const ContainerStyled = styled.div`
  box-shadow: var(--box-shadow-0);
  padding: 20px;
  background-color: var(--white-color);
  border-radius: 10px;
`;

export default CartPage;
