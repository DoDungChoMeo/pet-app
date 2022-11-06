import React, { useState } from 'react';
import { Skeleton } from 'antd';
import styled from 'styled-components';
import { useEffect } from 'react';

function Category({ title, items, loading, getActiveItem = () => {} }) {
  const [activeItem, setActiveItem] = useState('');
  useEffect(() => {
    getActiveItem(activeItem);
  }, [activeItem]);

  return (
    <ContainerStyled>
      <div className="category-header">
        <h3>{title}</h3>
      </div>
      {loading ? (
        <Skeleton active />
      ) : (
        <Menu>
          {items?.map((item) => {
            return (
              <MenuItem
                key={item.id}
                onClick={() =>
                  setActiveItem(() =>
                    activeItem === item.value ? '' : item.value
                  )
                }
                active={activeItem === item.value}
              >
                {item.value}
              </MenuItem>
            );
          })}
        </Menu>
      )}
    </ContainerStyled>
  );
}

const ContainerStyled = styled.div`
  margin-bottom: 20px;
  .category-header {
    text-align: center;
    padding: 4px 8px;
    background: var(--ant-primary-5);
    h3 {
      margin: 0;
      color: white;
    }
  }
`;

const Menu = styled.ul`
  padding: 4px;
  list-style-type: none;
  user-select: none;
  cursor: pointer;
`;
const MenuItem = styled.li`
  transition: all 0.2s ease-in-out;
  :hover {
    transform: translate(4px, 0);
    color: var(--ant-primary-color-hover);
  }
  transform: ${(props) => (props.active ? 'translate(4px, 0)' : 'initial')};
  color: ${(props) =>
    props.active ? 'var(--ant-primary-color-active)' : 'initial'};
`;

export default Category;
