let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')

let submitMood = 'create'
let tmp


// Get total
function getTotal() {
    if (price.value != '') {
        let result = 
            (+price.value + +taxes.value + +ads.value) - +discount.value
        total.textContent = ' ' + result
        total.style.background = '#040'
    } else {
        total.innerHTML = ''
        total.style.background = '#a00d02'
    }
}

// Checking if the localStorage has a products or not !
let productData

if (localStorage.product != null) {
    productData = JSON.parse(localStorage.product)
} else {
    productData = []
}

// Create Product 
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
    
    if (title.value != '' 
    && price.value != '' 
    && category.value != ''
    && newProduct.count < 100) {
        if (submitMood === 'create') {
            // Count === The number of the products in the stock
            if (newProduct.count > 1) {
                for (let i = 0; i < newProduct.count; i++) {
                    productData.push(newProduct)
                }
            } else {
                productData.push(newProduct)
            }

            clearInputs()
            
        } else {
            productData[tmp] = newProduct
            submitMood = 'create'
            submit.textContent = 'Create'
            submit.style.backgroundColor = '#451'
            count.style.display = 'block'
    
        }
    } else {
        // clearInputs()
    }
    

    // Save products to the localStorage
    localStorage.setItem('product', JSON.stringify(productData))

    readData()

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

// Read Outputs
function readData() {
    let table = ''

    getTotal()
    
    for (let i = 0; i < productData.length; i++) {
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${productData[i].title}</td>
                <td>${productData[i].price}</td>
                <td>${productData[i].taxes}</td>
                <td>${productData[i].ads}</td>
                <td>${productData[i].discount}</td>
                <td>${productData[i].total}</td>
                <td>${productData[i].category}</td>
                <td>
                    <button
                        onClick="updateData(${i})"
                        id="update"
                        >
                            update
                    </button>
                </td>
                <td>
                    <button 
                        onClick="deleteProduct(${i})"
                        id="delete"
                        class="delete"
                        >
                            delete
                    </button>
                </td>
            </tr>
        `
    }
    
    document.getElementById('tbody').innerHTML = table

    const btnDeleteAll = document.getElementById('deleteAll')
    if (productData.length > 0 ) {
        btnDeleteAll.innerHTML = `
            <button onClick='deleteAll()'>
                Delete All (${productData.length})
            </button>
        `
    } else {
        btnDeleteAll.innerHTML = ''
    }
}

readData()

// Delete one product
function deleteProduct(index) {
    productData.splice(index, 1)
    localStorage.product = JSON.stringify(productData)
    readData()
}

// Delete all products
function deleteAll() {
    localStorage.clear()
    productData.splice(0)
    readData()
}


// Update
function updateData(i) {
     title.value = productData[i].title
     price.value = productData[i].price
     taxes.value = productData[i].taxes
     ads.value = productData[i].ads
     discount.value = productData[i].discount
     category.value = productData[i].category

     submit.textContent = 'Update'
     count.style.display = 'none'
     submit.style.background = 'dodgerblue'

     getTotal()

    submitMood = 'update'
    tmp = i

    scroll({
        top: 0,
        behavior: 'smooth'
    })



}

// Search
let searchMood = 'title'

function getSearchMood(id) {

    let search = document.getElementById('search')
    
    if (id == 'searchTitle') {
        searchMood = 'title'
    } else {
        searchMood = 'category'
    }

    search.placeholder = 'Search by ' + searchMood.toUpperCase()

    search.focus()
    search.value = ''
    readData()
}

function searchData(value) {
    let table = ''
    
    for (let i = 0; i < productData.length; i++) {
        if (searchMood == 'title') {
        

            if (productData[i].title.toLowerCase().includes(value.toLowerCase())) {

                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${productData[i].title}</td>
                        <td>${productData[i].price}</td>
                        <td>${productData[i].taxes}</td>
                        <td>${productData[i].ads}</td>
                        <td>${productData[i].discount}</td>
                        <td>${productData[i].total}</td>
                        <td>${productData[i].category}</td>
                        <td>
                            <button
                                onClick="updateData(${i})"
                                id="update"
                                >
                                    update
                            </button>
                        </td>
                        <td>
                            <button 
                                onClick="deleteProduct(${i})"
                                id="delete"
                                class="delete"
                                >
                                    delete
                            </button>
                        </td>
                    </tr>
                `
            }
        
     } else {
                    
            if (productData[i].category.toLowerCase().includes(value.toLowerCase())) {

                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${productData[i].title}</td>
                        <td>${productData[i].price}</td>
                        <td>${productData[i].taxes}</td>
                        <td>${productData[i].ads}</td>
                        <td>${productData[i].discount}</td>
                        <td>${productData[i].total}</td>
                        <td>${productData[i].category}</td>
                        <td>
                            <button
                                onClick="updateData(${i})"
                                id="update"
                                >
                                    update
                            </button>
                        </td>
                        <td>
                            <button 
                                onClick="deleteProduct(${i})"
                                id="delete"
                                class="delete"
                                >
                                    delete
                            </button>
                        </td>
                    </tr>
                `
            }
    }

    document.getElementById('tbody').innerHTML = table
    
    }
}




// Clean data

