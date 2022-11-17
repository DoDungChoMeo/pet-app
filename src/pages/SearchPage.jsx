import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Typography } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { ProductList } from '~/features/ProductFeature';
import { useProductContext } from '~/contexts/ProductProvider';
import { useState } from 'react';
import { useEffect } from 'react';
import { searchProduct } from '~/utils';

const { Title } = Typography;

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q');
  const { productState } = useProductContext();
  const [foundResult, setFoundResult] = useState([]);
  const [searchLoading, setSearchLoading] = useState(true);

  useEffect(() => {
    setSearchLoading(true)
    setFoundResult(searchProduct(productState?.originalProducts, q));
    setTimeout(() => {
      setSearchLoading(false)
    }, 1000);
  }, [q]);

  return (
    <ContainerStyled>
      <Title level={2}>Kết quả tìm kiếm cho "{q}"</Title>
      <>
        {foundResult.length === 0 ? (
          <p className="notfound">
            <WarningOutlined style={{ marginRight: '8px' }} />
            <span>
              Rất tiếc, không tìm thấy sản phẩm phù hợp với lựa chọn của bạn
            </span>
          </p>
        ) : (
          <ProductList
            products={foundResult}
            loading={searchLoading}
            totalProducts={foundResult.length}
          />
        )}
      </>
    </ContainerStyled>
  );
}

const ContainerStyled = styled.div`
  box-shadow: var(--box-shadow-0);
  padding: 20px;
  background-color: var(--white-color);
  border-radius: 10px;
  min-height: 60vh;

  .notfound {
    color: var(--ant-warning-color);
    font-size: 1rem;
    font-weight: 500;
  }
`;

export default SearchPage;
