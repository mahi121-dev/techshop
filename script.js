console.log("script is connected");
const buttons = document.querySelectorAll(".add-to-cart");
let cartCount = 0;
const cartCountDisplay = document.getElementById("cart-count");
buttons.forEach(function(button) {
    button.addEventListener("click", function() {
cartCount = cartCount + 1;
cartCountDisplay.textContent = cartCount;
        });
});