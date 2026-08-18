console.log("checkout script connected");
const savedCart = localStorage.getItem("techshopCart");
const cartItems = JSON.parse(savedCart);
console.log("Cart items on checkout page:", cartItems);
const checkoutItemsDiv = document.getElementById("checkout-items");
let orderTotal = 0;
cartItems.forEach(function(item) {
    checkoutItemsDiv.innerHTML = checkoutItemsDiv.innerHTML + "<p>" + item.name + " - ৳" + item.price + "</p>";
    orderTotal = orderTotal + item.price;
    });
    checkoutItemsDiv.innerHTML = checkoutItemsDiv.innerHTML + "<p><strong>Order Total: ৳" + orderTotal + "</strong></p>";
document.getElementById("checkout-form").addEventListener("submit", async function(event) {
        event.preventDefault();
        const customerName = document.getElementById("customer-name").value;
        const customerAddress = document.getElementById("customer-address").value;
        const customerPhone = document.getElementById("customer-phone").value;
        const ordersCollection = window.collection(window.db, "orders");
await window.addDoc(ordersCollection, { customerName: customerName, customerAddress: customerAddress, customerPhone: customerPhone, items: cartItems, total: orderTotal });
        alert("Order placed successfully!");
        localStorage.removeItem("techshopCart");
        window.location.href = "index.html";
        });