import styled from 'styled-components';
const ContentStyled = styled.section`
  max-width: 1400px;
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 576px) {
    padding: 0;
  }
`;

function Content({ children }) {
  return <ContentStyled className="content">{children}</ContentStyled>;
}

export default Content;
