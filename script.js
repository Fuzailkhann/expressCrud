

// Function to fetch and display the product list
function fetchProductList() {
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(products => {
        const productContainer = document.getElementById('product-list');
        productContainer.innerHTML = '';
  
        products.forEach(product => {
          const listItem = document.createElement('li');
          listItem.innerHTML = `
            <strong>${product.name}</strong>
            <p>Price: $${product.price}</p>
            <p>${product.description}</p>
            <button onclick="editProduct(${product.id})">Edit</button>
            <button onclick="deleteProduct(${product.id})">Delete</button>
          `;
  
          productContainer.appendChild(listItem);
        });
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }
  
  // Function to handle form submission
  function handleSubmit(event) {
    event.preventDefault();
  
    const nameInput = document.getElementById('name');
    const priceInput = document.getElementById('price');
    const descriptionInput = document.getElementById('description');
  
    const productData = {
      name: nameInput.value,
      price: parseFloat(priceInput.value),
      description: descriptionInput.value
    };
  
    fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    })
      .then(() => {
        nameInput.value = '';
        priceInput.value = '';
        descriptionInput.value = '';
  
        fetchProductList();
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }
  
  // Function to handle product deletion
  function deleteProduct(productId) {
    fetch(`http://localhost:3000/products/${productId}`, {
      method: 'DELETE'
    })
      .then(() => {
        fetchProductList();
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }
  
  // Function to handle product editing
  function editProduct(productId) {
    fetch(`http://localhost:3000/products/${productId}`)
      .then(response => response.json())
      .then(product => {
        const nameInput = document.getElementById('name');
        const priceInput = document.getElementById('price');
        const descriptionInput = document.getElementById('description');
  
        nameInput.value = product.name;
        priceInput.value = product.price;
        descriptionInput.value = product.description;
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }
  
  // Add event listener to the form
  const productForm = document.getElementById('input-form');
  productForm.addEventListener('submit', handleSubmit);
  
  // Fetch and display the initial product list
  fetchProductList();
  