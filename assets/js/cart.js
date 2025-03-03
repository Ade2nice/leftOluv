document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartCount() {
        let cartCount = document.getElementById("cart-count");
        let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.innerText = totalItems;
    }

    // function addToCart(id, name, price) {
    //     let existingItem = cart.find(item => item.id === id);
        
    //     if (existingItem) {
    //         existingItem.quantity += 1;
    //     } else {
    //         cart.push({ id, name, price: parseFloat(price), quantity: 1 });
    //     }

    //     localStorage.setItem("cart", JSON.stringify(cart));
    //     updateCartCount();
    //     alert(`${name} added to cart!`);
    // }
    function addToCart(id, name, price) {
        let existingItem = cart.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id, name, price: parseFloat(price), quantity: 1 });
        }
        
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
    
        // Toast notification style
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });
    
        Toast.fire({
            icon: 'success',
            title: `${name} added to cart!`
        });
    }

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            let id = this.getAttribute("data-id");
            let name = this.getAttribute("data-name");
            let price = this.getAttribute("data-price");
            addToCart(id, name, price);
        });
    });

    updateCartCount();
});
