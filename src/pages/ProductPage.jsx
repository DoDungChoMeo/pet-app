import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Skeleton, Tabs } from 'antd';
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

  const formatDescription = (descStr) => {
    if (descStr) {
      const descArr = descStr?.split('\n');
      const formattedDesc = descArr?.map((current, index, arr) => {
        const after = arr[index + 1];
        if (current.length == 0) return;
        if (current?.length < 30 && current?.length < after?.length) {
          return <h2 key={index}>{current}</h2>;
        }
        return <p key={index}>{current}</p>;
      });

      // remove undefined values
      const removedFormattedDesc = formattedDesc?.filter(
        (element) => element !== undefined
      );

      return removedFormattedDesc;
    }
  };

  const tabItems = [
    {
      label: 'Mô tả sản phẩm',
      key: 'tab-1',
      children: (
        <>
          {product?.description ? (
            formatDescription(product?.description)
          ) : (
            <p>Không có mô tả</p>
          )}
        </>
      ),
    },
    {
      label: 'Đánh giá',
      key: 'tab-2',
      children: (
        <>
          <ReviewSection reviews={reviews} />
        </>
      ),
    },
  ];

  return (
    <>
      <ProductSectionStyled className="product-page">
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
      </ProductSectionStyled>

      <TabsStyled defaultActiveKey="tab-1" items={tabItems} size="large" />
    </>
  );
}

const TabsStyled = styled(Tabs)`
  margin: 20px 0;
  background-color: var(--white-color);
  box-shadow: var(--box-shadow-1);
  border-radius: 10px;
  width: 100%;
  padding: 0px 20px;
`;

const ProductSectionStyled = styled.div`
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
