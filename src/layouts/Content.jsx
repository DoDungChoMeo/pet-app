import styled from 'styled-components';
const ContentStyled = styled.section`
  margin: 0 -20px;
  padding: 0 20px;
`;

function Content({ children }) {
  return <ContentStyled className="content">{children}</ContentStyled>;
}

export default Content;
