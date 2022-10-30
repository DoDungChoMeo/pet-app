import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Skeleton } from 'antd';

import { useFirestoreQuery } from '~/hooks';
import { Review, ReviewForm } from '~/features/ReviewFeature';
import { ProductImageCarousel, ProductEntry } from '~/features/ProductFeature';
import { query, where, collection, getFirestore } from 'firebase/firestore';

function ProductPage() {
  const { bookmarkName } = useParams();
  const path = `products`;
  const firestore = getFirestore();
  const q = query(
    collection(firestore, path),
    where('bookmarkName', '==', bookmarkName)
  );
  const [[product], productLoading] = useFirestoreQuery(q);

  return (
    <>
      <ContainerStyled className="product-page">
        <section className="product-main-content">
          <div className="product-images">
            {productLoading ? (
              <Skeleton
                active
                paragraph={{
                  rows: 8,
                }}
              />
            ) : (
              <ProductImageCarousel images={product?.images} />
            )}
          </div>

          <div className="product-info">
            {productLoading ? (
              <Skeleton
                active
                paragraph={{
                  rows: 8,
                }}
              />
            ) : (
              <ProductEntry product={product} />
            )}
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
    gap: 40px;
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
