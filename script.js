console.log("Firebase db object:", window.db);
console.log("script is connected");

let cartCount = 0;
let cartItems = [];
let cartTotal = 0;
const cartCountDisplay = document.getElementById("cart-count");
const cartPanel = document.getElementById("cart-panel");
const cartToggle = document.getElementById("cart-toggle");

async function loadProductsFromFirestore() {
    const productsCollection = window.collection(window.db, "products");
    const sortedQuery = window.query(productsCollection, window.orderBy("sortOrder"));
    const snapshot = await window.getDocs(sortedQuery);
    const productsContainer = document.querySelector(".products");
    productsContainer.innerHTML = "";
    snapshot.forEach(function(doc) {
        const product = doc.data();
        const card = document.createElement("div");
        card.className = "product";
        card.setAttribute("data-category", product.category);
        card.innerHTML = "<img src='" + product.imageUrl + "'><h3>" + product.name + "</h3><p class='price'>৳" + product.price + "</p><button class='add-to-cart' data-name='" + product.name + "' data-price='" + product.price + "'>Add to Cart</button>";
        productsContainer.appendChild(card);
    });
    attachButtonListeners();
}

function attachButtonListeners() {
    const buttons = document.querySelectorAll(".add-to-cart");
    buttons.forEach(function(button) {
        button.addEventListener("click", function() {
            const productName = button.getAttribute("data-name");
            const productPrice = button.getAttribute("data-price");
            const priceNumber = Number(productPrice);
            cartCount = cartCount + 1;
            cartTotal = cartTotal + priceNumber;
            cartCountDisplay.textContent = cartCount;
            cartItems.push({ name: productName, price: priceNumber });
            localStorage.setItem("techshopCart", JSON.stringify(cartItems));
            updateCartPanel();
        });
    });
}

function updateCartPanel() {
    cartPanel.innerHTML = "";
    cartItems.forEach(function(item, index) {
        cartPanel.innerHTML = cartPanel.innerHTML + "<p>" + item.name + " - ৳" + item.price + " <button class='remove-btn' data-index='" + index + "'>Remove</button></p>";
    });
    cartPanel.innerHTML = cartPanel.innerHTML + "<p><strong>Total: ৳" + cartTotal + "</strong></p>";
    cartPanel.innerHTML = cartPanel.innerHTML + "<a href='checkout.html'><button class='add-to-cart'>Go to Checkout</button></a>";
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
        localStorage.setItem("techshopCart", JSON.stringify(cartItems));
        cartCount = cartCount - 1;
        cartCountDisplay.textContent = cartCount;
        updateCartPanel();
    }
});

loadProductsFromFirestore();
const filterButtons = document.querySelectorAll(".filter-btn");
filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const selectedCategory = button.getAttribute("data-category");
        const allCards = document.querySelectorAll(".product");
        allCards.forEach(function(card) {
            if (selectedCategory === "all" || card.getAttribute("data-category") === selectedCategory) {
                card.style.display = "block";
                } else {
                    card.style.display = "none";
                    }
});
});
});
const searchBar = document.getElementById("search-bar");
searchBar.addEventListener("input", function() {
    const searchText = searchBar.value.toLowerCase();
    const allCards = document.querySelectorAll(".product");
    allCards.forEach(function(card) {
        const productName = card.querySelector("h3").textContent.toLowerCase();
        if (productName.includes(searchText)) {
            card.style.display = "block";
            } else {
                card.style.display = "none";
                }
});
});