var cart = [];

function addToCart(item) {
    console.log(item);
    if (!cart.includes(item.id)) {
        cart.push(item.id);
        //const list = document.getElementById("list");
        let newItem = `<li id="item${item.id}">${item.name} <button class='btn' onclick='removeItem(${item.id})'><img src='Assets/x-square.svg' class='float-end'></button></li>`;
        $("#list").append(newItem);
        //list.innerHTML += newItem;
    }
}

function removeItem(itemId) {
    // const list = document.getElementById("list");
    // let i = document.getElementById("item" + itemId);
    // list.removeChild(i);

    $("#item" + itemId).remove();
    delete cart[cart.indexOf(itemId)];
}

// function generateProduct({ title, price, thumbnail, description }) {
//     return `${title}`;
// }
// products.forEach((product) => {
//     $("product.container").append(generateProduct(product));
// });

let output = "";

async function getUsers() {
    let url = 'https://dummyjson.com/products';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderUsers() {
    let users = await getUsers();
    
    users.products.forEach(user => {
        console.log(user);

        output += `
                <div class="col-md-2 card text-center" style="width: 200px; margin: 30px; padding: 15px 2px;">
                    <img src="${user.thumbnail}" class="card-img-top" alt="A03s" style="padding-top:15px">
                    <div class="card-body">
                        <h5 class="card-title txt" id="text1">${user.title}</h5>
                        <h5><span>&dollar;</span>${user.price}</h5>
                    </div>
                    <div class="card-footer" style="padding: 10px;">
                        <button class="btn btn-primary" onclick="addToCart({id:${user.id}, name:'${user.title}'})">Add to Cart</button>
                    </div>
                </div>
			`;
    });

    document.querySelector(".products").innerHTML = output;
}

renderUsers();