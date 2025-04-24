// This is a starter file - students will complete this
const productService = require('../../src/services/product-service');

describe('ProductService', () => {
  // Sample test to get started
  describe('getAllProducts', () => {
    it('should return all products when no filters are applied', () => {
      const result = productService.getAllProducts();
      expect(result.products.length).toBeGreaterThan(0);
      expect(result).toHaveProperty('total');
      expect(result).toHaveProperty('limit');
      expect(result).toHaveProperty('offset');
    });

    it('should filter products by category', () => {
      const category = 'electronics';
      const result = productService.getAllProducts({ category });

      expect(result.products.length).toBeGreaterThan(0); // At least one product should match
      result.products.forEach(product => {
        expect(product.category).toBe(category); // Ensure all returned products match the category
      });
    });
  });
});

describe('getProductsById', () => {
  it('should return an error message when given an invalid ID', async () => {
    const productId = '123'; // Non-existent product ID

    try {
      await productService.getProductById(productId);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Product not found');
    }
  });

});

