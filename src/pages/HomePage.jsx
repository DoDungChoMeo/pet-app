import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Row, Col } from 'antd';
import styled from 'styled-components';

import { ProductList } from '~/features/ProductFeature';
import { Category } from '~/features/ProductFeature';
import { useProductContext } from '~/contexts/ProductProvider';
import { useFirestoreCollection } from '~/hooks';

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, categoriesLoading] = useFirestoreCollection('categories');
  const [brands, brandsLoading] = useFirestoreCollection('brands');
  const { productState, productLoading } = useProductContext();

  return (
    <ContainerStyled className="home-page">
      <Row gutter={[20, 0]}>
        <Col span={24} lg={4}>
          <Category
            title="Danh mục sản phẩm"
            items={categories}
            loading={categoriesLoading}
            getActiveItem={(item) => {
              if (item) {
                searchParams.set('category', item);
                setSearchParams(searchParams);
              } else {
                searchParams.delete('category');
                setSearchParams(searchParams);
              }
            }}
          />
          <Category
            title="Nhãn hiệu"
            items={brands}
            loading={brandsLoading}
            getActiveItem={(item) => {
              if (item) {
                searchParams.set('brand', item);
                setSearchParams(searchParams);
              } else {
                searchParams.delete('brand');
                setSearchParams(searchParams);
              }
            }}
          />
        </Col>
        <Col span={24} lg={20}>
          <ProductList
            products={productState?.products}
            loading={productLoading}
            totalProducts={productState?.originalProducts?.length}
            hidePagination
          />
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
