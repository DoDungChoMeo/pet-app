import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Skeleton } from 'antd';
import { query, where, collection, getFirestore } from 'firebase/firestore';

import { useFirestoreQuery, useFirestoreCollection } from '~/hooks';
import { ReviewSection } from '~/features/ReviewFeature';
import { ProductImageCarousel, ProductEntry } from '~/features/ProductFeature';

function ProductPage() {
  const { bookmarkName } = useParams();
  const path = `products`;
  const firestore = getFirestore();
  const q = query(
    collection(firestore, path),
    where('bookmarkName', '==', bookmarkName)
  );
  const [[product], productLoading] = useFirestoreQuery(q);

  const [reviews, reviewsLoading] = useFirestoreCollection(
    `products/${product?.productId}/reviews`
  );

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

        <ReviewSection reviews={reviews} />
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
`;

export default ProductPage;
