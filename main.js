let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')



// Get total
function getTotal() {
    if (price.value != '') {
        let result = 
            (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = result
        total.style.background = '#040'
    } else {
        total.innerHTML = ''
        total.style.background = '#a00d02'
    }
}

// Create product
let productData

if (localStorage.product != null) {
    productData = JSON.parse(localStorage.product)
} else {
    productData = []
}

// Save products to the localStorage
submit.onclick = function() {
    let newProduct = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value
    }
    productData.push(newProduct)
    localStorage.setItem('product', JSON.stringify(productData))

    clearInputs()
}

// Clear inputs
function clearInputs() {
    title.value = ''
    price.value = ''
    taxes.value = ''
    ads.value = ''
    discount.value = ''
    total.innerHTML = ''
    count.value = ''
    category.value = ''
}




// Read 
// Count 
// Update
// Delete
// Search
// Clean data

