import styled from 'styled-components';

const ContainerStyled = styled.header`
  height: 80px;
  background-color: var(--ant-primary-1);
`;

function Header() {
  return <ContainerStyled>Header</ContainerStyled>;
}

export default Header;
