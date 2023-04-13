let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

// Open cart
cartIcon.onclick = () => {
  cart.classList.add('active');
};

// Close cart
closeCart.onclick = () => {
  cart.classList.remove('active');
};

// Wait for DOM to load
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

// Function to handle DOMContentLoaded event
function ready() {
  // Remove items from cart
  var removeCartButtons = document.getElementsByClassName('cart-remove');
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener('click', removeCartItem);
  }
  //Quantity Changes
  var quantityInputs = document.getElementsByClassName('cart-quantity');
  for (var i = 0; i < quantityInputs.length; i++){
    var input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
  }
  // Add To Cart
  var addCart = document.getElementsByClassName('add-cart');
  for (var i = 0; i < addCart.length; i++){
    var button = addCart[i];
    button.addEventListener('click', addCartClicked);
  }
  // Buy Button Work
  document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);

}

// Buy Button Work
function buyButtonClicked(){
  alert('Your Order Is Placed');
  var cartContent = document.getElementsByClassName('cart-content')[0];
  while (cartContent.hasChildNodes()){
    cartContent.removeChild(cartContent.firstChild);
  }
  updatetotal();
}

// Function to remove item from cart
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updatetotal();
}

// Quantity Changed
function quantityChanged(event){
  var input = event.target;
  if (isNaN(input.value)  || input.value <= 0) {
    input.value = 1;
  }
  updatetotal();
}

// Add To Cart
function addCartClicked(event){
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
  var price = shopProducts.getElementsByClassName('price')[0].innerText;
  var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
  addProductToCart(title, price, productImg);
  updatetotal();
}

function addProductToCart(title, price, productImg) {
  var cartShopBox = document.createElement('div');
  cartShopBox.classList.add('cart-box');
  var cartItems = document.getElementsByClassName('cart-content')[0];
  var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
  for (var i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert("You Have Already Add This Item To Cart");
      return;
    }
  }
    
  var cartBoxContent = `
    <img src="${productImg}" alt="" class="cart-img">
    <div class="detail-box">
      <div class="cart-product-title">${title}</div>
      <div class="cart-price">${price}</div>
      <input type="number" value="1" class="cart-quantity">
    </div>
    <!-- Remove Cart -->
    <i class='bx bxs-trash-alt cart-remove'></i>`;
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);

  cartShopBox
  .getElementsByClassName('cart-remove')[0]
  .addEventListener('click', removeCartItem );

  cartShopBox
  .getElementsByClassName('cart-quantity')[0]
  .addEventListener('change', quantityChanged);
}

// Update Total
function updatetotal(){
  var cartContent = document.getElementsByClassName('cart-content')[0];
  var cartBoxes = cartContent.getElementsByClassName('cart-box');
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName('cart-price')[0];
    var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
    var price = parseFloat(priceElement.innerText.replace('NOK', ''));
    var quantity = quantityElement.value;
    total= total + (price * quantity);
  }
  
  document.getElementsByClassName('total-price')[0].innerText = 'NOK' + total;
}

var slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
  showSlides(slideIndex += n);
}
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1;}
  if (n < 1) {slideIndex = slides.length;}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}



const hero = document.getElementById("hero");

window.addEventListener("scroll", function () {
  const heroPosition = hero.getBoundingClientRect().top;
  const screenPosition = window.innerHeight / 1.3;

  if (heroPosition < screenPosition) {
    hero.classList.add("animate-hero");
  }
});



const form = document.querySelector('.search-form');
const input = document.querySelector('.search-form input');
const products = document.querySelectorAll('.product-box');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const term = input.value.trim().toLowerCase();
  products.forEach(function(product) {
    const title = product.querySelector('.product-title').textContent;
    if (title.toLowerCase().indexOf(term) > -1) {
      product.style.display = '';
    } else {
      product.style.display = 'none';
    }
  });
});

// Get the search form and input field
const searchForm = document.querySelector('.search-form');
const searchInput = searchForm.querySelector('input[type="text"]');

// Add event listener for form submission
searchForm.addEventListener('submit', function(event) {
  // Prevent the default form submission behavior
  event.preventDefault();
  
  // Get the search query
  const query = searchInput.value.trim();

  // Perform the search
  const shopContent = document.querySelectorAll('.shop-content');

  // Loop through each shop content item
  for (let i = 0; i < shopContent.length; i++) {
    const item = shopContent[i];

    // Get the item's text content
    const itemText = item.textContent.trim().toLowerCase();

    // Check if the search query matches the item's text content
    if (itemText.includes(query.toLowerCase())) {
      // Show the item
      item.style.display = 'block';
    } else {
      // Hide the item
      item.style.display = 'none';
    }
  }
});
