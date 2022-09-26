import React from 'react';
import { List } from 'antd';
import { Card } from '~/components';

const data = [
  {
    title: 'Đồ chơi bóng đồng giá',
    price: { value: 14000, unit: 'VND' },
    rating: 2,
    image:
      'https://matpetfamily.com/wp-content/uploads/2021/01/kiotviet_eee77b1a2f3509ab4834d89d0748bf71-300x300.jpeg',
  },
  {
    title: 'Xịt vệ sinh đúng chỗ',
    price: { value: 55000, unit: 'VND' },
    rating: 2,
    image:
      'https://matpetfamily.com/wp-content/uploads/2021/05/kiotviet_0940466be9c1ca03485eaaaf66e3506b-300x300.jpg',
  },
  {
    title: 'Dây vòng cổ chuông',
    price: { value: 14000, unit: 'VND' },
    rating: 2,
    image:
      'https://matpetfamily.com/wp-content/uploads/2021/05/kiotviet_a6359746e157b7d34d43f9d9ba408a0f.jpg',
  },
  {
    title: 'Vòng dây cổ chuông',
    price: { value: 50000, unit: 'VND' },
    rating: 2,
    image:
      'https://matpetfamily.com/wp-content/uploads/2020/10/kiotviet_d15c1f7486eebcf8a252f0e5330e6e77-300x300.jpg',
  },
  {
    title: 'Mouse Bell',
    price: { value: 200000, unit: 'VND' },
    rating: 3,
    image:
      'https://pawfriends.qodeinteractive.com/wp-content/uploads/2019/07/shop-img-2.jpg',
  },
  {
    title: 'Rain coat',
    price: { value: 50000, unit: 'VND' },
    rating: 4,
    image:
      'https://pawfriends.qodeinteractive.com/wp-content/uploads/2019/07/shop-img-15-1.jpg',
  },
  {
    title: 'party hat',
    price: { value: 258000, unit: 'VND' },
    rating: 2,
    image:
      'https://pawfriends.qodeinteractive.com/wp-content/uploads/2019/07/shop-img-4.jpg',
  },
  {
    title: 'storage bag',
    price: { value: 58000, unit: 'VND' },
    rating: 2,
    image:
      'https://pawfriends.qodeinteractive.com/wp-content/uploads/2019/07/shop-img-18-1.jpg',
  },
];

function HomePage() {
  return (
    <div className="home-page">
      <List
        grid={{
          gutter: [20, 40],
          xxl: 4,
          xl: 4,
          lg: 3,
          md: 2,
          sm: 1,
          xs: 1,
        }}
        dataSource={data}
        renderItem={(item) => {
          const { title, image, rating, price, id } = item;
          return (
            <List.Item>
              <Card
                title={title}
                image={image}
                rating={rating}
                price={price}
                id={id}
              />
            </List.Item>
          );
        }}
      />
    </div>
  );
}

export default HomePage;
