import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, getDocs , collection } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyApWwoJ3mGbwXJkh4eiiIi_DC-zpBUzRm8",
    authDomain: "organic-store-2dff9.firebaseapp.com",
    projectId: "organic-store-2dff9",
    storageBucket: "organic-store-2dff9.appspot.com",
    messagingSenderId: "1079383200282",
    appId: "1:1079383200282:web:2a370bcfa756b18819b7a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

let dataProduct = localStorage.getItem('Products-list')

let items_tab_1 = document.querySelector(".pd-tab-1")

let HTMLContent_Grid_1 = (x) =>
`
    <div class="item">
        <div class="products-grid">
            <div class="product-item">
                <div class="product-item-info">	
                    <div class=" product-item-images">
                        <span class="hot-sale">${x.saleOff} off</span>
                        <a href="" class="product-item-photo">
                            
                            <span class="product-image-container" style="width:198px;">
                                <span class="product-image-wrapper" style="padding-bottom: 100%;">
                                    <img
                                        class="product-image-photo"
                                        src="${x.imgUrl}"
                                        width="150"
                                        height="150"
                                        alt="">
                                </span>
                            </span>

                        </a>
                    </div>
                    <div class="product-item-details">

                        <strong class="product-item-name">
                            <a href="" class="product-item-link">
                                ${x.name}
                            </a>
                        </strong>

                        <div class="price-box price-final_price">

                            <span class="special-price">

                                <span class="price-container price-final_price tax weee">
                                    <span class="price-label">Special Price</span>
                                    <span class="price-wrapper">
                                        <span class="price">$${Math.round((x.oldPrice * (1 - x.saleOffValue)) * 100) / 100}</span>
                                    </span>
                                </span>
                                    
                            </span>
                                    
                            <span class="old-price">
                                    
                                <span class="price-container price-final_price tax weee">
                                    <span class="price-label">Regular Price</span>
                                    <span class="price-wrapper">
                                        <span class="price">$${x.oldPrice}</span>
                                    </span>
                                </span>

                            </span>
                        
                        </div>

                        <div class="product-item-actions">

                            <div class="add-to-links-secondary">

                                <a href="#" class="action wishlist" onclick="window.open('${x.imgUrl}', '_blank')">
                                </a>

                            </div>
                            <div class="add-to-cart-primary">
                                <button class="action tocart primary" id="${x.id}" type="button" title="Add to Cart">
                                    <span>Add to Cart</span>
                                </button>
                            </div>	

                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
`




if(dataProduct){
    var products_list = JSON.parse(dataProduct);
    console.log("Have products")
}else{
    let products = []
    const querySnapshot = await getDocs(collection(db, "products-list"));
    querySnapshot.forEach((doc) => {
        products.push(doc.data())
    });
    const products_fetch = products.sort( (a,b) => a["index"] - b["index"] )
    const productsString = JSON.stringify(products_fetch)

    localStorage.setItem('Products-list', productsString);
    dataProduct = localStorage.getItem('Products-list')
    var products_list = JSON.parse(dataProduct);

    console.log("No products, setting up...")
}
console.log(products_list)

var products_tab_1 = products_list.filter( (organic) => organic.special == `Tab_1` );
var products_tab_2 = products_list.filter( (organic) => organic.special == `Tab_2` );
var products_tab_3 = products_list.filter( (organic) => organic.special == `Tab_3` );

console.log(products_tab_1)

let update_tab_1 = () => {
    items_tab_1.innerHTML = '';
    for(let x of products_tab_1){
        items_tab_1.insertAdjacentHTML('beforeend', HTMLContent_Grid_1(x))
    }
}
let update_tab_2 = () => {
    items_tab_1.innerHTML = '';
    for(let x of products_tab_2){
        items_tab_1.insertAdjacentHTML('beforeend', HTMLContent_Grid_1(x))
    }
}
let update_tab_3 = () => {
    items_tab_1.innerHTML = '';
    for(let x of products_tab_3){
        items_tab_1.insertAdjacentHTML('beforeend', HTMLContent_Grid_1(x))
    }
}

update_tab_1()

document.querySelector("#tab_1_1").addEventListener("click", update_tab_1)
document.querySelector("#tab_1_2").addEventListener("click", update_tab_2)
document.querySelector("#tab_1_3").addEventListener("click", update_tab_3)