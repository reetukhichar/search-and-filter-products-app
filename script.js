(async () => {
    const url = "https://fakestoreapi.com/products";
    const productContainer = document.querySelector("#product-container");
    const inputSearch = document.querySelector("#input-search");

    const fetchApi = async() => {
        try{
            const response = await fetch(url);
            return await response.json();
        }
        catch(error){
            console.log(error);
            return error;
        }
    };
    const products = await fetchApi();
    console.log("products",products);

    const generateProducts = (product) => {
        return `<div class="card">
        <div class="product">
            <img src="${product.image}"/>
        </div>
        <div class="description">
            <h2>${product.title}</h2>
            <p>${product.description.split(" ").slice(0,20).join(" ")}</p>
            <button>${product.price}$</button>
        </div>
    </div>`;      
    }

    const renderProducts = (products) => {
        productContainer.innerHTML = "";
        products.forEach((product) => {
            productContainer.innerHTML += generateProducts(product);
        })
    };

    const filterHandler = (event) => {
        const searchText = event.target.value.toLowerCase();
        const filteredProducts = products.filter((product) => {
            return product.title.toLowerCase().includes(searchText) ||
            product.description.toLowerCase().includes(searchText) ||
            product.price.toString().toLowerCase().includes(searchText);
        });
        renderProducts(filteredProducts);
    }

    inputSearch.addEventListener('keyup', filterHandler)

    renderProducts(products);
})();