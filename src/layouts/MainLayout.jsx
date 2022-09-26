import { Outlet } from 'react-router-dom';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import styled from 'styled-components';

const LayoutStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  max-width: 1200px;
  margin: auto;
`;

function MainLayout() {
  return (
    <LayoutStyled className="main-layout">
      <Header />
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </LayoutStyled>
  );
}

export default MainLayout;
