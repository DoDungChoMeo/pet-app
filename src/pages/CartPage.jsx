import { Table, Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import React from 'react';
import styled from 'styled-components';
import { useCartContext } from '~/contexts/CartProvider';
import { Price } from '~/components';

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
    key: 'action',
    title: 'Thao tác',
    dataIndex: 'action',
  },
];

function CartPage() {
  const { cart } = useCartContext();
  let dataSource = [];

  dataSource = cart.products.map((product) => {
    return {
      key: product?.productId,
      item: (
        <Item>
          <img width={100} src={product?.image} alt={product?.title} />
          <span>{product?.title}</span>
        </Item>
      ),
      price: <Price>{product?.price}</Price>,
      quantity: (
        <Quantity>
          <Button size="small">+</Button>
          <span>{product?.quantity}</span>
          <Button size="small">-</Button>
        </Quantity>
      ),
      action: (
        <Popconfirm title="Bạn có muốn xóa?" okText="Xóa" cancelText="Không">
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
      <Table columns={columns} dataSource={dataSource} />
    </ContainerStyled>
  );
}

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Quantity = styled.div`
  display: flex;
  gap: 4px;
`;

const ContainerStyled = styled.div`
  box-shadow: var(--box-shadow-0);
  padding: 20px;
  background-color: var(--white-color);
  border-radius: 10px;
`;

export default CartPage;
