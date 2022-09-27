import { Rate, Form, Input, Button } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';

const { TextArea } = Input;

const rateTooltips = [
  'Rất không hài lòng',
  'Không hài lòng',
  'Bình thường',
  'Hài lòng',
  'Cực kì hài lòng',
];

function ReviewForm({ title, buttonText }) {
  const [rating, setRating] = useState();

  const sendReview = (values) => {
    console.log({ ...values, rating });
  };

  return (
    <ContainerStyled className="review-form">
      <h4 className="form-title">{title}</h4>

      <div className="rate-group">
        <Rate value={rating} onChange={setRating} tooltips={rateTooltips} />
        {rating ? (
          <span className="ant-rate-text">{rateTooltips[rating - 1]}</span>
        ) : (
          ''
        )}
      </div>

      <Form onFinish={sendReview} layout="vertical" autoComplete="off">
        <Form.Item
          label="Bình luận"
          name="comment"
          rules={[
            {
              required: true,
              message: 'vui lòng nhập để lại bình luận của bạn về sản phẩm',
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Họ tên"
          name="username"
          rules={[
            {
              required: true,
              message: 'vui lòng nhập họ tên của bạn',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Địa chỉ email"
          rules={[
            {
              required: true,
              message: 'vui lòng nhập email của bạn',
            },
            {
              type: 'email',
              message: 'địa chỉ email không hợp lệ',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" size="large" htmlType="submit">
            {buttonText}
          </Button>
        </Form.Item>
      </Form>
    </ContainerStyled>
  );
}

const ContainerStyled = styled.div`
  .form-title {
    font-size: var(--fs-h4);
  }

  .ant-form {
    margin-top: 20px;
    width: 100%;
    max-width: 600px;
  }

  .ant-rate-text {
    font-weight: 600;
  }
`;

export default ReviewForm;
