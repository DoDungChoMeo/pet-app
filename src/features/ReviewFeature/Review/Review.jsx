import { Avatar, Rate } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import timeDifference from '~/utils/timeDifference';

const rateTooltips = [
  'Rất không hài lòng',
  'Không hài lòng',
  'Bình thường',
  'Hài lòng',
  'Cực kì hài lòng',
];

function Review({ review }) {
  return (
    <ContainerStyled className="review">
      <Avatar size={80} shape="square" icon={<UserOutlined />} />

      <div>
        <div className="title-group">
          <div className="rate-group">
            <Rate defaultValue={review?.rating} disabled />
            {review?.rating ? (
              <span className="ant-rate-text">
                {rateTooltips[review?.rating - 1]}
              </span>
            ) : (
              ''
            )}
          </div>
          <div className="title">
            <span>{review?.name}</span>
            <time>
              {timeDifference(new Date(), review?.createAt?.toDate())}
            </time>
          </div>
        </div>

        <div className="comment">{review?.comment}</div>
      </div>
    </ContainerStyled>
  );
}

const ContainerStyled = styled.article`
  margin: 20px 0;
  display: flex;
  gap: 20px;

  .rate-group span {
    font-weight: 600;
  }

  .title {
    display: flex;
    align-items: center;
    gap: 8px;

    span {
      font-size: 1rem;
      font-weight: 700;
      color: var(--ant-primary-color);
    }
  }

  .comment {
    max-width: 700px;
  }
`;

export default Review;
