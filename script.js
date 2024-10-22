document.getElementById('product-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const productName = document.getElementById('product-name').value;
    const productPrice = document.getElementById('product-price').value;
    const productDescription = document.getElementById('product-description').value;
    const productImage = document.getElementById('product-image').files[0];

    if (productPrice <= 0) {
        alert('Please enter a valid price.');
        return;
    }

    const product = {
        name: productName,
        price: productPrice,
        description: productDescription,
        image: productImage ? URL.createObjectURL(productImage) : 'path/to/default/image.jpg'
    };

    // Save product to localStorage
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));

    displayProduct(product);
    alert('Product submitted successfully!');
    this.reset();
});

function displayProduct(product) {
    const productsList = document.getElementById('products-list');

    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Price: $${product.price}</p>
        <p>${product.description}</p>
        <button class="buy-button">Buy</button>
        <button class="delete-button">Delete</button>
    `;

    productsList.appendChild(productDiv);

    // Add buy functionality
    const buyButton = productDiv.querySelector('.buy-button');
    buyButton.addEventListener('click', () => {
        alert(`You bought ${product.name} for $${product.price}!`);
    });

    // Add delete functionality
    const deleteButton = productDiv.querySelector('.delete-button');
    deleteButton.addEventListener('click', () => {
        const index = Array.from(productsList.children).indexOf(productDiv);
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.splice(index, 1); // Remove product from the array
        localStorage.setItem('products', JSON.stringify(products)); // Update localStorage
        productsList.removeChild(productDiv); // Remove from DOM
    });
}

window.addEventListener('DOMContentLoaded', (event) => {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.forEach(displayProduct);
});
