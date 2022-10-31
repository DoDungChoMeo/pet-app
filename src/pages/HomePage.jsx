import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { List, Row, Col, Skeleton } from 'antd';
import styled from 'styled-components';

import { Card } from '~/components';
import { Category, useProducts } from '~/features/ProductFeature';
import { useFirestoreCollection } from '~/hooks';

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, productsLoading] = useProducts();
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
            getActiveItem={(item) => {
              searchParams.set('category', item);
              setSearchParams(searchParams);
            }}
          />
          <Category
            title="Nhãn hiệu"
            items={brands}
            loading={brandsLoading}
            getActiveItem={(item) => {
              searchParams.set('brand', item);
              setSearchParams(searchParams);
            }}
          />
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
