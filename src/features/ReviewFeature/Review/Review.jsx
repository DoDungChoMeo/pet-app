import { Avatar, Rate } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';

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
      <Avatar size={100} shape="square" icon={<UserOutlined />} />

      <div>
        <div className="title-group">
          <div className="rate-group">
            <Rate defaultValue={4} disable={true} />
            {4 ? (
              <span className="ant-rate-text">{rateTooltips[4 - 1]}</span>
            ) : (
              ''
            )}
          </div>
          <div className="title">
            <span>Mark Salas</span>
            <time>July 29, 2019</time>
          </div>
        </div>

        <div className="comment">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit officiis
          animi nisi obcaecati facilis, sint omnis quia harum architecto, alias
          blanditiis commodi voluptates aperiam tenetur corrupti voluptas at
          possimus nobis?
        </div>
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
