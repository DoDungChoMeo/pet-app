import { Table, Button, Popconfirm, InputNumber } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import React from 'react';
import styled from 'styled-components';
import { query, where, collection, getFirestore } from 'firebase/firestore';
import { useCartContext } from '~/contexts/CartProvider';
import { Price } from '~/components';
import { useFirestoreQuery } from '~/hooks';
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
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    inputQuantity,
    removeItem,
  } = useCartContext();
  const firestore = getFirestore();
  const productIdList = cart.products.map((product) => product.productId);
  const q =
    productIdList.length > 0
      ? query(
          collection(firestore, 'inventories'),
          where('productId', 'in', productIdList)
        )
      : query(
          collection(firestore, 'inventories'),
          where('productId', 'in', [''])
        );
  const [inventories] = useFirestoreQuery(q);

  let dataSource = [];
  dataSource = cart.products.map((product) => {
    const inventory = inventories.find(
      (inven) => inven.productId === product?.productId
    );
    const salesState = productSalesState(
      inventory?.stock,
      inventory?.reservations
    );
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
          <Button
            size="small"
            onClick={() => {
              // không được ít hơn 1
              if (product?.quantity > 1) {
                decreaseQuantity(product?.productId);
              }
            }}
          >
            -
          </Button>
          {/* <span>{product?.quantity}</span> */}
          <InputNumber
            value={product?.quantity}
            controls={false}
            size="small"
            className="input-number"
            min={1}
            max={salesState.remaining}
            onChange={(value) => inputQuantity(product?.productId, value)}
          />
          <Button
            size="small"
            onClick={() => {
              // không được tăng quá số lượng còn lại
              if (product?.quantity < salesState.remaining) {
                increaseQuantity(product?.productId);
              }
            }}
          >
            +
          </Button>
        </Quantity>
      ),
      total: <Price>{product?.quantity * product?.price}</Price>,
      action: (
        <Popconfirm
          title="Bạn có muốn xóa?"
          okText="Xóa"
          cancelText="Không"
          onConfirm={() => removeItem(product?.productId)}
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
        <strong>
          <span>Tổng cộng: </span>
          <Price>{cart?.total}</Price>
        </strong>

        <Button type="primary">Thanh toán</Button>
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
