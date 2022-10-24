const ProductEntry = ({ product }) => {
  return (
    <Container>
      <h3>{product?.title}</h3>
      <p>
        <span>Thương hiệu: </span>
        <span className="brand">{product?.brand}</span>
      </p>
      <Rate defaultValue={product?.rating} disabled={true} />
      <p className="price">
        {formatVietnamCurrency(product?.inventories[0].price)}
      </p>
      <p className="description">{product?.description}</p>
      <div className="product-control">
        <label htmlFor="quantity-input">
          <span className="quantity-label">Số lượng: </span>
          <InputNumber
            id="quantity-input"
            size="large"
            min={1}
            defaultValue={1}
          />
        </label>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            addToCart({ title: 'iphone', quantity: 2, price: 200 });
          }}
        >
          Thêm vào giỏ hàng
        </Button>
      </div>
      <div className="additional-info">
        <div className="additional-info-group">
          <span>Tình trạng: </span>
          <Tag>
            {(product?.stock > 0 && `còn ${product?.stock}`) || 'hết hàng'}
          </Tag>
        </div>
        <div className="additional-info-group">
          <span>Danh mục: </span>
          {product?.categories?.map((category) => {
            return <Tag>{category}</Tag>;
          })}
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  h3 {
    font-size: var(--fs-h3);
    font-weight: 700;
    margin: 0;
  }

  .price {
    color: var(--ant-primary-color);
    font-size: 1.2rem;
    font-weight: 700;
  }

  .description {
  }

  .product-control {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .quantity-label {
    color: var(--ant-primary-color);
    font-weight: 700;
    font-size: 1rem;
  }

  .additional-info {
    margin-top: 20px;
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
`;

export default ProductEntry;
