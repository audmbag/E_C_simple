import "../src/App.js"
import CartController from "../src/CartController.js";

import Layout from '../src/Layouts.js';


Layout.setHeader()
// Layout.setFooter()


document.addEventListener('DOMContentLoaded', () => {
    CartController.setFooter()
    CartController.setProducts()
})

document.addEventListener('productsUpdated', function (e) {
    CartController.setFooter()
    CartController.setProducts()
})