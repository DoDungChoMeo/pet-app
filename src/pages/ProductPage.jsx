import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Image, Rate, Button, InputNumber, Tag } from 'antd';
import styled from 'styled-components';

// import { products } from '~/data';
import { useFirestoreDocument } from '~/hooks';
import { formatVietnamCurrency } from '~/utils';
import { Review, ReviewForm } from '~/features/ReviewFeature';
import { useCartContext } from '~/contexts/CartProvider';
import { ProductImageCarousel } from '~/features/ProductFeature';

function ProductPage() {
  const { productId } = useParams();
  const path = `products/${productId}`;
  const [product, productLoading] = useFirestoreDocument(path);
  console.log(product);
  if (productLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <ContainerStyled className="product-page">
        <section className="product-main-content">
          <div className="product-images">
            <ProductImageCarousel images={product?.images} />
          </div>

          <div className="product-info">
            <ProductEntry product={product} />
          </div>
        </section>

        {/* <ReviewSection className="review-section">
          <h3 className="review-title">1 đánh giá</h3>
          <Review />
          <ReviewForm
            title={'Đánh giá cho sản phẩm'}
            buttonText="Gửi đánh giá"
          />
        </ReviewSection> */}
      </ContainerStyled>
    </>
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

  .image {
    border-radius: 10px;
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
