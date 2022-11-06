import { useParams } from 'react-router-dom';
import { Rate, Form, Input, Button, message } from 'antd';
import styled from 'styled-components';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { getProductId } from '~/utils';

const { TextArea } = Input;

const rateTooltips = [
  'Rất không hài lòng',
  'Không hài lòng',
  'Bình thường',
  'Hài lòng',
  'Cực kì hài lòng',
];

function ReviewForm({ title, buttonText }) {
  const { bookmarkName } = useParams();
  const firestore = getFirestore();

  const sendReview = async (values) => {
    const timestamp = serverTimestamp();
    const reviewData = {
      ...values,
      createAt: timestamp,
    };

    const productId = await getProductId(bookmarkName);
    const reviewsRef = doc(
      collection(firestore, `products/${productId}/reviews`)
    );

    setDoc(reviewsRef, reviewData)
      .then(() => {
        message.success('Đánh giá thành công');
      })
      .catch((e) => {
        message.error('Đánh giá thất bại');
        console.log(e);
      });
  };

  return (
    <ContainerStyled className="review-form">
      <h4 className="form-title">{title}</h4>
      <Form onFinish={sendReview} layout="vertical" autoComplete="off">
        <Form.Item
          name="rating"
          rules={[
            {
              required: true,
              message:
                'Vui lòng cho biết mức độ hài lòng của bạn đối với sản phẩm',
            },
          ]}
        >
          <Rate tooltips={rateTooltips} />
        </Form.Item>

        <Form.Item
          label="Bình luận"
          name="comment"
          rules={[
            {
              required: true,
              message: 'Vui lòng để lại bình luận của bạn về sản phẩm',
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Họ tên"
          name="name"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập họ tên của bạn',
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
              message: 'Vui lòng nhập email của bạn',
            },
            {
              type: 'email',
              message: 'Địa chỉ email không hợp lệ',
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

  .ant-rate-text {
    font-weight: 600;
  }
`;

export default ReviewForm;
