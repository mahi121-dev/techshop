async function loadOrders() {
    const ordersCollection = window.collection(window.db, "orders");
    const snapshot = await window.getDocs(ordersCollection);
    const ordersListDiv = document.getElementById("orders-list");
    snapshot.forEach(function(doc) {
        const order = doc.data();
        const orderCard = document.createElement("div");
        orderCard.className = "product";
        orderCard.innerHTML = "<h3>" + order.customerName + "</h3><p>" + order.customerAddress + "</p><p>" + order.customerPhone + "</p>";
        let itemsList = "";
        order.items.forEach(function(item) {
            itemsList = itemsList + item.name + " (৳" + item.price + "), ";
            });
            orderCard.innerHTML = orderCard.innerHTML + "<p><strong>Items:</strong> " + itemsList + "</p><p><strong>Total: ৳" + order.total + "</strong></p>";
            ordersListDiv.appendChild(orderCard);
            });
}
loadOrders();