const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// 🟢 Get all products
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('products').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// 🟢 Get product by ID
router.get('/:id', async (req, res) => {
  const { data, error } = await supabase.from('products').select('*').eq('id', req.params.id).single();
  if (error) return res.status(404).json({ error: 'Product not found' });
  res.json(data);
});

// 🟢 Create a new product
// 🟢 Create a new product
router.post('/', async (req, res) => {
  const { name, description, price, category, image_url } = req.body;

  // Insert the new product into the database
  const { data, error } = await supabase.from('products').insert([
    { name, description, price, category, image_url }
  ]).select();  // This will ensure the inserted data is returned

  // Handle errors during insert
  if (error) return res.status(400).json({ error: error.message });

  // Extract the first product from the returned data (inserted product)
  const insertedProduct = data ? data[0] : null;

  // If the product was not inserted, return an error
  if (!insertedProduct) {
    return res.status(500).json({ error: 'Failed to create product' });
  }

  // Return the newly created product
  res.status(201).json(insertedProduct);
});


// 🟢 Update a product
router.patch('/:id', async (req, res) => {
  const { name, description, price, category, image_url } = req.body;

  const { data, error } = await supabase.from('products')
    .update({ name, description, price, category, image_url })
    .eq('id', req.params.id)
    .select()
    .single();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// 🟢 Delete a product
router.delete('/:id', async (req, res) => {
  const { data, error } = await supabase.from('products')
    .delete()
    .eq('id', req.params.id)
    .select()
    .single();

  if (error) return res.status(404).json({ error: 'Product not found' });
  res.json({ message: 'Product deleted', product: data });
});

module.exports = router;
