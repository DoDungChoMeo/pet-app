import React from 'react';
import { useParams } from 'react-router-dom';
import { Image, Rate, Button, InputNumber, Tag } from 'antd';
import styled from 'styled-components';

import { products } from '~/data';
import { formatVietnamCurrency } from '~/utils';
import { Review, ReviewForm } from '~/features/ReviewFeature';

function ProductPage() {
  const { productId } = useParams();
  const product = products.find((item) => item.id === productId);

  return (
    <ContainerStyled className="product-page">
      <section className="product-main-content">
        <div className="product-images">
          <div className="main-image">
            <Image className="image" src={product.image} />
          </div>
          <div className="image-picker">
            <img className="image" src={product.image} />
            <img className="image" src={product.image} />
          </div>
        </div>

        <div className="product-info">
          <h3>{product.title}</h3>
          <Rate defaultValue disabled={true} />
          <p className="price">{formatVietnamCurrency(product.price.value)}</p>
          <p className="description">{product.description}</p>
          <div className="product-control">
            <label htmlFor="quantity-input">
              <span className="quantity-label">Số lượng: </span>
              <InputNumber
                id="quantity-input"
                size="large"
                min={1}
                defaultValue={1}
              />
            </label>
            <Button type="primary" size="large">
              Thêm vào giỏ hàng
            </Button>
          </div>
          <div className="additional-info">
            <div className="additional-info-group">
              <span>Mã đơn hàng: </span>
              <Tag>{product.sku}</Tag>
            </div>
            <div className="additional-info-group">
              <span>Tình trạng: </span>
              <Tag>
                {(product.quantity > 0 && `còn ${product.quantity}`) ||
                  'hết hàng'}
              </Tag>
            </div>
            <div className="additional-info-group">
              <span>Danh mục: </span>
              <Tag>{product.category}</Tag>
            </div>
          </div>
        </div>
      </section>

      <ReviewSection className="review-section">
        <h3 className="review-title">1 đánh giá</h3>
        <Review />
        <ReviewForm title={'Đánh giá cho sản phẩm'} buttonText="Gửi đánh giá" />
      </ReviewSection>
    </ContainerStyled>
  );
}

const ContainerStyled = styled.div`
  background-color: var(--white-color);
  box-shadow: var(--box-shadow-1);
  border-radius: 10px;
  width: 100%;
  padding: 40px 20px;

  .product-main-content {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .product-images,
  .product-info {
    flex: 1 1 400px;
    border-radius: 10px;
    min-height: 200px;
    border-radius: 6px;
  }

  .main-image {
    text-align: center;
  }

  .image-picker {
    margin-top: 20px;
    display: flex;
    gap: 8px;

    img {
      display: block;
      height: 100px;
    }
  }

  .image {
    border-radius: 10px;
  }

  ${'' /* for product info */}
  .product-info {
    h3 {
      font-size: var(--fs-h3);
      font-weight: 700;
      margin: 0;
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
  }
`;

const ReviewSection = styled.section`
  margin-top: 50px;

  .review-title {
    font-size: var(--fs-h3);
  }

  .review-form {
    max-width: 700px;
  }
`;

export default ProductPage;
