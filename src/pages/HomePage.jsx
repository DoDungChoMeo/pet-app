import React from 'react';
import { List } from 'antd';
import { Card } from '~/components';
// import { products } from '~/data';
import styled from 'styled-components';
import { useProductContext } from '~/contexts/ProductProvider';

function HomePage() {
  const { products } = useProductContext();

  return (
    <ContainerStyled className="home-page">
      <List
        grid={{
          gutter: [20, 40],
          xxl: 4,
          xl: 4,
          lg: 3,
          md: 2,
          sm: 1,
          xs: 1,
        }}
        dataSource={products}
        renderItem={(item) => {
          const { title, images, rating, productId, inventories } = item;
          return (
            <List.Item>
              <Card
                title={title}
                image={images[0]}
                rating={rating}
                price={inventories[0]?.price}
                id={productId}
              />
            </List.Item>
          );
        }}
      />
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
