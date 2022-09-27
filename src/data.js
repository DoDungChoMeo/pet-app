import toKebabCase from '~/utils/toKebabCase';
import removeVietnameseTones from '~/utils/removeVietnameseTones';

const products = [
  {
    title: 'Đồ chơi bóng đồng giá',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit officiis animi nisi obcaecati facilis, sint omnis quia harum architecto, alias blanditiis commodi voluptates aperiam tenetur corrupti voluptas at possimus nobis?',
    price: { value: 14000, unit: 'VND' },
    sku: '12345',
    quantity: 2,
    category: 'vòng cổ',
    rating: 2,
    image:
      'https://matpetfamily.com/wp-content/uploads/2021/01/kiotviet_eee77b1a2f3509ab4834d89d0748bf71-300x300.jpeg',
  },
  {
    title: 'Xịt vệ sinh đúng chỗ',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit officiis animi nisi obcaecati facilis, sint omnis quia harum architecto, alias blanditiis commodi voluptates aperiam tenetur corrupti voluptas at possimus nobis?',
    price: { value: 55000, unit: 'VND' },
    sku: '12345',
    quantity: 2,
    category: 'vòng cổ',
    rating: 2,
    image:
      'https://matpetfamily.com/wp-content/uploads/2021/05/kiotviet_0940466be9c1ca03485eaaaf66e3506b-300x300.jpg',
  },
  {
    title: 'Dây vòng cổ chuông',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit officiis animi nisi obcaecati facilis, sint omnis quia harum architecto, alias blanditiis commodi voluptates aperiam tenetur corrupti voluptas at possimus nobis?',
    price: { value: 14000, unit: 'VND' },
    sku: '12345',
    quantity: 2,
    category: 'vòng cổ',
    rating: 2,
    image:
      'https://matpetfamily.com/wp-content/uploads/2021/05/kiotviet_a6359746e157b7d34d43f9d9ba408a0f.jpg',
  },
  {
    title: 'Vòng dây cổ chuông',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit officiis animi nisi obcaecati facilis, sint omnis quia harum architecto, alias blanditiis commodi voluptates aperiam tenetur corrupti voluptas at possimus nobis?',
    price: { value: 50000, unit: 'VND' },
    sku: '12345',
    quantity: 0,
    category: 'vòng cổ',
    rating: 2,
    image:
      'https://matpetfamily.com/wp-content/uploads/2020/10/kiotviet_d15c1f7486eebcf8a252f0e5330e6e77-300x300.jpg',
  },
  {
    title: 'Mouse Bell',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit officiis animi nisi obcaecati facilis, sint omnis quia harum architecto, alias blanditiis commodi voluptates aperiam tenetur corrupti voluptas at possimus nobis?',
    price: { value: 200000, unit: 'VND' },
    sku: '12345',
    quantity: 2,
    category: 'vòng cổ',
    rating: 3,
    image:
      'https://pawfriends.qodeinteractive.com/wp-content/uploads/2019/07/shop-img-2.jpg',
  },
  {
    title: 'Rain coat',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit officiis animi nisi obcaecati facilis, sint omnis quia harum architecto, alias blanditiis commodi voluptates aperiam tenetur corrupti voluptas at possimus nobis?',
    price: { value: 50000, unit: 'VND' },
    sku: '12345',
    quantity: 2,
    category: 'vòng cổ',
    rating: 4,
    image:
      'https://pawfriends.qodeinteractive.com/wp-content/uploads/2019/07/shop-img-15-1.jpg',
  },
  {
    title: 'party hat',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit officiis animi nisi obcaecati facilis, sint omnis quia harum architecto, alias blanditiis commodi voluptates aperiam tenetur corrupti voluptas at possimus nobis?',
    price: { value: 258000, unit: 'VND' },
    sku: '12345',
    quantity: 2,
    category: 'vòng cổ',
    rating: 2,
    image:
      'https://pawfriends.qodeinteractive.com/wp-content/uploads/2019/07/shop-img-4.jpg',
  },
  {
    title: 'storage bag',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit officiis animi nisi obcaecati facilis, sint omnis quia harum architecto, alias blanditiis commodi voluptates aperiam tenetur corrupti voluptas at possimus nobis?',
    price: { value: 58000, unit: 'VND' },
    sku: '12345',
    quantity: 2,
    category: 'vòng cổ',
    rating: 2,
    image:
      'https://pawfriends.qodeinteractive.com/wp-content/uploads/2019/07/shop-img-18-1.jpg',
  },
].map((item) => {
  return { id: toKebabCase(removeVietnameseTones(item.title)), ...item };
});

export { products };
