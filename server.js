const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use(cors({
  origin: 'http://127.0.0.1:5500',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

let products = [
  { id: 1, name: 'Product 1', price: 10, description: 'This is product 1' },
  { id: 2, name: 'Product 2', price: 20, description: 'This is product 2' },
  { id: 3, name: 'Product 3', price: 30, description: 'This is product 3' }
];

// Get all products
app.get('/products', (req, res) => {
  res.json(products);
});



app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Product not found');
  }
});


app.post('/products', (req, res) => {
  const newProduct = req.body;
  newProduct.id = products.length + 1;
  products.push(newProduct);
  res.send('Product created successfully');
})

app.put('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const updatedProduct = req.body;
  const productIndex = products.findIndex(p => p.id === productId);
  if (productIndex !== -1) {
    products[productIndex] = { ...products[productIndex], ...updatedProduct };
    res.send('Product updated successfully');
  } else {
    res.status(404).send('Product not found');
  }
});
app.delete('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === productId);
  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    res.send('Product deleted successfully');
  } else {
    res.status(404).send('Product not found');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

