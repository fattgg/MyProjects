// This is a starter file - students will complete this
const request = require('supertest');
const app = require('../../src/app');

describe('Product API Routes', () => {
  // Valid API key for tests
  const validApiKey = 'test-api-key';

  // Sample test to get started
  describe('GET /api/products', () => {
    it('should return 401 if no API key is provided', async () => {
      const res = await request(app).get('/api/products');
      expect(res.statusCode).toEqual(401);
    });

    it('should return a list of products with valid API key', async () => {
      const res = await request(app)
        .get('/api/products')
        .set('X-API-Key', validApiKey);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('products');
      expect(Array.isArray(res.body.products)).toBe(true);
    });

    // Students will add more tests here
  });

  describe('GET /api/products/:id', () => {
    it('should return 404 if the product is not found', async () => {
      const res = await request(app)
        .get('/api/products/invalid-id')
        .set('X-API-Key', validApiKey);

      expect(res.statusCode).toEqual(404);
    });


  });

  describe('DELETE /api/products/:id', () => {
    it('should return 401 if no API key is provided', async () => {
      const res = await request(app).delete('/api/products/1');
      expect(res.statusCode).toEqual(401);
    });

    it('should return 404 if the product to delete is not found', async () => {
      const res = await request(app)
        .delete('/api/products/invalid-id')
        .set('X-API-Key', validApiKey);

      expect(res.statusCode).toEqual(404);
      expect(res.body.message).toBe('Product not found');
    });

    it('should successfully delete a product with a valid ID', async () => {
      const productId = 1; // Replace with an actual product ID from your setup or test data
      const res = await request(app)
        .delete(`/api/products/${productId}`)
        .set('X-API-Key', validApiKey);

      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toBe('Product deleted successfully');

      // Optionally, verify the product was indeed deleted by trying to fetch it
      const fetchRes = await request(app)
        .get(`/api/products/${productId}`)
        .set('X-API-Key', validApiKey);
      expect(fetchRes.statusCode).toEqual(404); // Product should no longer exist
    });
  });



  // More test suites to be added by students
});