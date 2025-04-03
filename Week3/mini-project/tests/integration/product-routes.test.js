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
    it('should return 401 if no API key is provided', async () => {
      const res = await request(app).get('/api/products/1');
      expect(res.statusCode).toEqual(401);
    });
    
    it('should return 404 if product with the given ID is not found', async () => {
      const res = await request(app)
        .get('/api/products/999')
        .set('X-API-Key', validApiKey);
        
      expect(res.statusCode).toEqual(404);
    });
    
    it('should return the product with the given ID', async () => {
      const res = await request(app)
        .get('/api/products/1')
        .set('X-API-Key', validApiKey);
        
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('product');
      expect(res.body.product.id).toEqual(1);
    });
  });


  
  // More test suites to be added by students
  
  describe('POST /api/products', () => {
    it('should return 401 if no API key is provided', async () => {
      const res = await request(app).post('/api/products');
      expect(res.statusCode).toEqual(401);
    });
    
    it('should return 400 if product data is invalid', async () => {
      const res = await request(app)
        .post('/api/products')
        .set('X-API-Key', validApiKey)
        .send({});
        
      expect(res.statusCode).toEqual(400);
    });
    
    it('should create a new product with valid data', async () => {
      const res = await request(app)
        .post('/api/products')
        .set('X-API-Key', validApiKey)
        .send({
          name: 'New Product',
          price: 9.99
        });
        
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('product');
      expect(res.body.product.id).toBeGreaterThan(0);
    });
  });
  
  describe('PUT /api/products/:id', () => {
    it('should return 401 if no API key is provided', async () => {
      const res = await request(app).put('/api/products/1');
      expect(res.statusCode).toEqual(401);
    });
    
    it('should return 404 if product with the given ID is not found', async () => {
      const res = await request(app)
        .put('/api/products/999')
        .set('X-API-Key', validApiKey);
        
      expect(res.statusCode).toEqual(404);
    });
    
    it('should return 400 if product data is invalid', async () => {
      const res = await request(app)
        .put('/api/products/1')
        .set('X-API-Key', validApiKey)
        .send({});
        
      expect(res.statusCode).toEqual(400);
    });
    
    it('should update the product with the given ID', async () => {
      const res = await request(app)
        .put('/api/products/1')
        .set('X-API-Key', validApiKey)
        .send({
          name: 'Updated Product',
          price: 19.99
        });
        
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('product');
      expect(res.body.product.name).toEqual('Updated Product');
    });
  });  
});