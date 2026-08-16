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
cartItems.push(productName);
console.log(cartItems);
updateCartPanel();     

});
});
function updateCartPanel() {
    cartPanel.innerHTML = "";
    cartItems.forEach(function(item) {
        cartPanel.innerHTML = cartPanel.innerHTML + "<p>" + item + "</p>";
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