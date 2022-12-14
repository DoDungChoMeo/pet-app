import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Skeleton, List, Pagination, Menu } from 'antd';
import styled from 'styled-components';
import { Card } from '~/components';
import { PAGE_SIZE } from '~/constants';

function ProductList({
  products,
  loading,
  totalProducts,
  hideHeader,
  hidePagination,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const menuItems = [
    { label: 'Mới nhất', key: 'newest' },
    { label: 'Cũ nhất', key: 'oldest' },
    { label: 'Giá giảm dần', key: 'price-desc' },
    { label: 'Giá tăng dần', key: 'price-asc' },
  ];

  return (
    <div>
      <>
        {hideHeader ? null : (
          <HeaderStyled className="product-list-header">
            <Menu
              style={{ minWidth: 0, flex: 'auto' }} // responsive
              className="sort-menu"
              items={menuItems}
              mode={'horizontal'}
              onSelect={(select) => {
                const { key } = select;
                if (key === 'default') {
                  searchParams.delete('sort');
                  setSearchParams(searchParams);
                } else {
                  searchParams.set('sort', key);
                  setSearchParams(searchParams);
                }
              }}
            />
            <>
              {hidePagination ? null : (
                <Pagination
                  className="pagination"
                  simple
                  pageSize={PAGE_SIZE}
                  total={totalProducts}
                  onChange={(page) => {
                    searchParams.set('page', page);
                    setSearchParams(searchParams);
                  }}
                />
              )}
            </>
          </HeaderStyled>
        )}
      </>

      {loading ? (
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
    </div>
  );
}

const HeaderStyled = styled.header`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;

  margin-bottom: 24px;

  .sort-menu {
    flex: 1 1 auto;
  }

  .pagination {
    margin-left: auto;
  }
`;
export default ProductList;
