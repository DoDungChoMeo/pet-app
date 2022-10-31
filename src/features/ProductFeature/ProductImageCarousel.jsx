import { useState } from 'react';
import styled from 'styled-components';

const ProductImageCarousel = ({ images = [] }) => {
  const [active, setActive] = useState(0);

  return (
    <Container>
      <Ratio>
        <ImageStyled src={images[active]} />
      </Ratio>
      <div className="image-picker">
        {images.length > 1
          ? images.map((image, i) => {
              return (
                <a key={i} onClick={() => setActive(i)}>
                  <img
                    key={image}
                    className="image"
                    src={image}
                    onClick={() => {}}
                  />
                </a>
              );
            })
          : null}
      </div>
    </Container>
  );
};

const Ratio = styled.div`
  display: block;
  position: relative;
  &::before {
    content: '';
    display: block;
    width: 100%;
    padding-bottom: 75%;
  }
`;

const ImageStyled = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Container = styled.div`
  .image-picker {
    margin-top: 20px;
    display: flex;
    gap: 8px;

    .image {
      display: block;
      height: 100px;
      border-radius: 10px;
      border: 1px solid #ccc;
      padding: 5px;
    }
  }
`;

export default ProductImageCarousel;
