document.getElementById('product-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const productName = document.getElementById('product-name').value;
    const productPrice = document.getElementById('product-price').value;
    const productDescription = document.getElementById('product-description').value;
    const productImage = document.getElementById('product-image').files[0];

    const product = {
        name: productName,
        price: productPrice,
        description: productDescription,
        image: URL.createObjectURL(productImage)
    };

    displayProduct(product);

    // Clear the form
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
    `;

    productsList.appendChild(productDiv);
}
