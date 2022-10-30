import React from 'react';
import { List, Row, Col, Skeleton } from 'antd';
import styled from 'styled-components';
import { getFirestore, collection, query, where } from 'firebase/firestore';
import { Card } from '~/components';
import { Category } from '~/features/ProductFeature';
import { useFirestoreCollection, useFirestoreQuery } from '~/hooks';

function HomePage() {
  const firestore = getFirestore();
  const productQuery = query(
    collection(firestore, 'products'),
    where('status', '==', 'visible')
  );
  const [products, productsLoading] = useFirestoreQuery(productQuery);
  const [categories, categoriesLoading] = useFirestoreCollection('categories');
  const [brands, brandsLoading] = useFirestoreCollection('brands');

  return (
    <ContainerStyled className="home-page">
      <Row gutter={[20, 0]}>
        <Col span={24} lg={4}>
          <Category
            title="Danh mục sản phẩm"
            items={categories}
            loading={categoriesLoading}
          />
          <Category title="Nhãn hiệu" items={brands} loading={brandsLoading} />
        </Col>
        <Col span={24} lg={20}>
          {productsLoading ? (
            <>
              <Skeleton
                active
                paragraph={{
                  rows: 8,
                }}
              />
            </>
          ) : (
            <List
              grid={{
                gutter: [20, 40],
                xxl: 5,
                xl: 5,
                lg: 5,
                md: 3,
                sm: 2,
                xs: 1,
              }}
              dataSource={products}
              renderItem={(item) => {
                const {
                  title,
                  images,
                  rating,
                  productId,
                  bookmarkName,
                  inventory,
                } = item;

                return (
                  <List.Item>
                    <Card
                      title={title}
                      image={images[0]}
                      rating={rating}
                      id={productId}
                      price={inventory?.price}
                      bookmarkName={bookmarkName}
                    />
                  </List.Item>
                );
              }}
            />
          )}
        </Col>
      </Row>
    </ContainerStyled>
  );
}

const ContainerStyled = styled.div`
  box-shadow: var(--box-shadow-0);
  padding: 20px;
  background-color: var(--white-color);
  border-radius: 10px;
`;

export default HomePage;
