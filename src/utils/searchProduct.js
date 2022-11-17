import { removeVietnameseTones } from '~/utils';

function searchProduct(products, text) {
  text = removeVietnameseTones(text.toLowerCase());
  text = text.split(' ');
  return products.filter((product) => {
    return text.every((el) => {
      const productTitleText = removeVietnameseTones(product.title.toLowerCase());
      const productCategoriesText = 
      removeVietnameseTones(product.categories.join(' ').toLowerCase())
      const productBrandText = removeVietnameseTones(product.brand.toLowerCase());
      const productFullText = `${productTitleText} ${productCategoriesText} ${productBrandText}`
      return productFullText.includes(el);
    });
  });
}

export default searchProduct;