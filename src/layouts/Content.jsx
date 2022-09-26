import styled from 'styled-components';
const ContentStyled = styled.section``;

function Content({ children }) {
  return <ContentStyled className="content">{children}</ContentStyled>;
}

export default Content;
