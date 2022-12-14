import { useState } from 'react';
import { Rate, InputNumber, Button, Tag } from 'antd';
import styled from 'styled-components';
import { formatVietnamCurrency } from '~/utils';
import { useCartContext } from '~/contexts/CartProvider';
import { productSalesState } from './utils';

const ProductEntry = ({ product }) => {
  const { cart, addToCart } = useCartContext();
  const [productQuantity, setProductQuantity] = useState(1);
  const { inventory } = product;

  const salesState = productSalesState(
    inventory?.stock,
    inventory?.reservations
  );
  const productInCart = cart?.products?.find(
    (cartItem) => cartItem?.productId === product?.productId
  );

  const numberCanAdd = productInCart?.quantity
    ? salesState?.remaining - productInCart?.quantity
    : salesState?.remaining;

  return (
    <Container>
      <h3>{product?.title}</h3>
      {/* <Rate defaultValue={product?.rating} disabled={true} /> */}
      <p>
        <span>Thương hiệu: </span>
        <span className="brand">{product?.brand}</span>
        <span className='divider'></span>
        <span>Tình trạng: </span>
        <Tag>{salesState?.status}</Tag>
      </p>
      {/* <p>
        <span>Đã bán: </span>
        <Tag>{salesState?.sold}</Tag>
        <span> | </span>
        <span>Còn lại: </span>
        <Tag>{salesState?.remaining}</Tag>
      </p> */}
      <p className="price">{formatVietnamCurrency(inventory?.price)}</p>
      <div className="product-control">
        <label htmlFor="quantity-input">
          <span className="quantity-label">Số lượng: </span>
          <InputNumber
            id="quantity-input"
            min={1}
            max={
              productInCart?.quantity
                ? salesState?.remaining - productInCart?.quantity
                : salesState?.remaining
            }
            defaultValue={1}
            value={productQuantity}
            onChange={(value) => setProductQuantity(value)}
          />
        </label>
        <Button
          type="primary"
          onClick={() => {
            addToCart({
              image: product?.images[0],
              title: product?.title,
              productId: product?.productId,
              quantity: productQuantity,
              price: inventory?.price,
              inventory,
            });
          }}
          disabled={numberCanAdd === 0}
        >
          Thêm vào giỏ hàng
        </Button>
      </div>
      <div className="additional-info">
        <div className="additional-info-group">
          <span>Danh mục: </span>
          {product?.categories?.map((category) => {
            return <Tag key={category}>{category}</Tag>;
          })}
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  h3 {
    font-size: var(--fs-h3);
    line-height: 1;
    margin-bottom: 1rem;
  }

  .divider {
    border-left: 2px solid #bababa;
    margin: 0 5px;
  }

  .price {
    color: var(--ant-primary-color);
    font-size: 1.2rem;
    font-weight: 700;
  }

  .description {
  }

  .product-control {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .quantity-label {
    color: var(--ant-primary-color);
    font-weight: 700;
    font-size: 1rem;
  }

  .additional-info {
    margin-top: 20px;
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .brand {
    color: var(--ant-primary-color);
  }
`;

export default ProductEntry;
