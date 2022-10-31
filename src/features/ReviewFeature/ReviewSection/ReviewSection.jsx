import React from 'react';
import styled from 'styled-components';
import { Review, ReviewForm } from '~/features/ReviewFeature';

function ReviewSection({ reviews }) {
  return (
    <ContainerStyled className="review-section">
      <h3 className="review-title">{reviews?.length} đánh giá</h3>
      {reviews.map((review) => {
        return <Review key={review.reviewId} review={review} />;
      })}
      <ReviewForm title={'Đánh giá cho sản phẩm'} buttonText="Gửi đánh giá" />
    </ContainerStyled>
  );
}

const ContainerStyled = styled.section`
  margin-top: 50px;

  .review-title {
    font-size: var(--fs-h3);
  }

  .review-form {
    max-width: 700px;
  }
`;

export default ReviewSection;
