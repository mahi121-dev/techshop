console.log("script is connected");
const buttons = document.querySelectorAll(".add-to-cart");
let cartCount = 0;
let cartItems = [];
let cartTotal = 0;
const cartCountDisplay = document.getElementById("cart-count");
const cartPanel = document.getElementById("cart-panel");
const cartToggle = document.getElementById("cart-toggle");
buttons.forEach(function(button) {
    button.addEventListener("click", function() {
const productName = button.getAttribute("data-name");cartCount = cartCount + 1;
const productPrice = button.getAttribute("data-price");
const priceNumber = Number(productPrice);
cartTotal = cartTotal + priceNumber;
cartCountDisplay.textContent = cartCount;
cartItems.push({ name: productName, price: priceNumber });
console.log(cartItems);
updateCartPanel();     

});
});
function updateCartPanel() {
    cartPanel.innerHTML = "";
    cartItems.forEach(function(item, index) {
        cartPanel.innerHTML = cartPanel.innerHTML + "<p>" + item.name + " - ৳" + item.price + " <button class='remove-btn' data-index='" + index + "'>Remove</button></p>";
        });
        cartPanel.innerHTML = cartPanel.innerHTML + "<p><strong>Total: ৳" + cartTotal + "</strong></p>";
}

cartToggle.addEventListener("click", function() {
    if (cartPanel.style.display === "none") {
        cartPanel.style.display = "block";
        } else {
            cartPanel.style.display = "none";
            }
});

cartPanel.addEventListener("click", function(event) {
    if (event.target.classList.contains("remove-btn")) {
        const indexToRemove = event.target.getAttribute("data-index");
        cartTotal = cartTotal - cartItems[indexToRemove].price;
        cartItems.splice(indexToRemove, 1);
        cartCount = cartCount - 1;
        cartCountDisplay.textContent = cartCount;
        updateCartPanel();
        }
});