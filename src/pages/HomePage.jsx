import React from 'react';
import { List } from 'antd';
import { Card } from '~/components';

const data = [
  {
    title: 'Mouse Bell',
    price: { amount: 200000, unit: 'VND' },
    rating: 3,
    image:
      'https://pawfriends.qodeinteractive.com/wp-content/uploads/2019/07/shop-img-2.jpg',
  },
  {
    title: 'Rain coat',
    price: { amount: 50000, unit: 'VND' },
    rating: 4,
    image:
      'https://pawfriends.qodeinteractive.com/wp-content/uploads/2019/07/shop-img-15-1.jpg',
  },
  {
    title: 'party hat',
    price: { amount: 258000, unit: 'VND' },
    rating: 2,
    image:
      'https://pawfriends.qodeinteractive.com/wp-content/uploads/2019/07/shop-img-4.jpg',
  },
  {
    title: 'storage bag',
    price: { amount: 58000, unit: 'VND' },
    rating: 2,
    image:
      'https://pawfriends.qodeinteractive.com/wp-content/uploads/2019/07/shop-img-18-1.jpg',
  },
  {
    title: 'Đồ chơi bóng đồng giá',
    price: { amount: 14000, unit: 'VND' },
    rating: 2,
    image:
      'https://matpetfamily.com/wp-content/uploads/2021/01/kiotviet_eee77b1a2f3509ab4834d89d0748bf71-300x300.jpeg',
  },
  {
    title: 'Xịt vệ sinh đúng chỗ',
    price: { amount: 55000, unit: 'VND' },
    rating: 2,
    image:
      'https://matpetfamily.com/wp-content/uploads/2021/0…viet_0940466be9c1ca03485eaaaf66e3506b-300x300.jpg',
  },
  {
    title: 'Đồ chơi bóng đồng giá',
    price: { amount: 14000, unit: 'VND' },
    rating: 2,
    image:
      'https://matpetfamily.com/wp-content/uploads/2021/01/kiotviet_eee77b1a2f3509ab4834d89d0748bf71-300x300.jpeg',
  },
  {
    title: 'Vòng dây cổ chuông',
    price: { amount: 50000, unit: 'VND' },
    rating: 2,
    image:
      'https://matpetfamily.com/wp-content/uploads/2021/01/kiotviet_eee77b1a2f3509ab4834d89d0748bf71-300x300.jpeg',
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
