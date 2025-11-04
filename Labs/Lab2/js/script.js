let inventory = [];

function initializeInventory()
{
    inventory = [
        {
            name: "USB Flash Drive",
            type: "storage",
            price: 15.99,
            quantity: 20,
            description: "Fast USB 3.0 flash drive with 32GB storage"
        },
        {
            name: "Power Bank 10000mAh",
            type: "accessory",
            price: 34.99,
            quantity: 10,
            description: "Portable charger with dual USB ports"
        },
        {
            name: "Phone Charger",
            type: "accessory",
            price: 11.99,
            quantity: 30,
            description: "Fast charging USB-C wall adapter"
        },
        {
            name: "LED Bulb 9W",
            type: "lighting",
            price: 5.99,
            quantity: 40,
            description: "LED bulb"
        },
        {
            name: "Extension Cord 6ft",
            type: "cable",
            price: 19.99,
            quantity: 15,
            description: "6 feet outlet extension cord"
        },
        {
            name: "AA Batteries Pack",
            type: "accessory",
            price: 4.99,
            quantity: 40,
            description: "Pack of 4 AA alkaline batteries"
        },
        {
            name: "Wireless Earphones",
            type: "audio",
            price: 39.99,
            quantity: 12,
            description: "Bluetooth earphones with noise cancellation"
        },
        {
            name: "Wireless Keyboard",
            type: "External Hardware",
            price: 18.99,
            quantity: 15,
            description: "Slim wireless keyboard"
        },
        {
            name: "Gaming Mouse",
            type: "External Hardware",
            price: 16.99,
            quantity: 21,
            description: "RGB gaming mouse"
        },
        {
            name: "HD Webcam",
            type: "External Hardware",
            price: 51.99,
            quantity: 10,
            description: "1080p webcam with built-in microphone"
        }
    ];

    listItems();
}

function addItem() {
    let name = document.getElementById('itemName').value;
    let type = document.getElementById('itemType').value;
    let price = document.getElementById('itemPrice').value;
    let quantity = document.getElementById('itemQuantity').value;
    let description = document.getElementById('itemDescription').value;

    if (name === '' || type === '' || price === '' || quantity === '' || description === '')
    {
        alert('Please fill in all the fields!');
        return;
    }

    let newItem = {
        name: name,
        type: type,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        description: description
    };

    inventory.push(newItem);

    document.getElementById('itemName').value = '';
    document.getElementById('itemType').value = '';
    document.getElementById('itemPrice').value = '';
    document.getElementById('itemQuantity').value = '';
    document.getElementById('itemDescription').value = '';

    listItems();

    alert('Item added successfully!');
}

function removeItem()
{
    let itemName = document.getElementById('removeItemName').value;

    if (itemName === '')
    {
        alert('Please enter an item name to remove!');
        return;
    }

    let index = -1;
    for (let i = 0; i < inventory.length; i++)
    {
        if (inventory[i].name.toLowerCase() === itemName.toLowerCase())
        {
            index = i;
            break;
        }
    }

    if (index !== -1)
    {
        inventory.splice(index, 1);
        listItems();
        alert('Item removed successfully!');
    }
    else
    {
        alert('Item not found!');
    }
    document.getElementById('removeItemName').value = '';
}

function getItem(itemName)
{
    for (let i = 0; i < inventory.length; i++)
    {
        if (inventory[i].name.toLowerCase() === itemName.toLowerCase())
        {
            return inventory[i];
        }
    }
    return null;
}

function listItems()
{
    let displayArea = document.getElementById('inventoryDisplay');
    displayArea.innerHTML = '';

    if (inventory.length === 0)
    {
        displayArea.innerHTML = '<p style="text-align: center; color: #999;">No items in inventory</p>';
        return;
    }

    for (let i = 0; i < inventory.length; i++)
    {
        let item = inventory[i];
        let itemCard = document.createElement('div');
        itemCard.className = 'item-card';

        itemCard.innerHTML = `
            <span class="item-type">${item.type}</span>
            <h3>${item.name}</h3>
            <p class="item-price">$${item.price.toFixed(2)}</p>
            <p class="item-quantity">Stock: ${item.quantity} units</p>
            <p>${item.description}</p>
        `;
        displayArea.appendChild(itemCard);
    }
}

function searchItems()
{
    let query = document.getElementById('searchQuery').value.toLowerCase();

    if (query === '')
    {
        alert('Please enter a search term!');
        return;
    }

    let displayArea = document.getElementById('inventoryDisplay');
    displayArea.innerHTML = '';
    let foundItems = [];

    for (let i = 0; i < inventory.length; i++)
    {
        let item = inventory[i];
        if (item.name.toLowerCase().includes(query) || item.type.toLowerCase().includes(query))
        {
            foundItems.push(item);
        }
    }

    if (foundItems.length === 0)
    {
        displayArea.innerHTML = '<p style="text-align: center; color: #999;">No items found matching your search</p>';
        return;
    }

    for (let i = 0; i < foundItems.length; i++)
    {
        let item = foundItems[i];
        let itemCard = document.createElement('div');
        itemCard.className = 'item-card';

        itemCard.innerHTML = `
            <span class="item-type">${item.type}</span>
            <h3>${item.name}</h3>
            <p class="item-price">$${item.price.toFixed(2)}</p>
            <p class="item-quantity">Stock: ${item.quantity} units</p>
            <p>${item.description}</p>
        `;

        displayArea.appendChild(itemCard);
    }
}

function calculateTotalValue()
{
    let total = 0;

    for (let i = 0; i < inventory.length; i++)
    {
        total += inventory[i].price * inventory[i].quantity;
    }

    let totalDisplay = document.getElementById('totalValue');
    totalDisplay.innerHTML = `Total Inventory Value: $${total.toFixed(2)}`;
}

function groupByCategory()
{
    let displayArea = document.getElementById('inventoryDisplay');
    displayArea.innerHTML = '';
    let categories = {};

    for (let i = 0; i < inventory.length; i++)
    {
        let item = inventory[i];
        let type = item.type;

        if (!categories[type])
        {
            categories[type] = [];
        }
        categories[type].push(item);
    }

    for (let category in categories)
    {
        let categoryHeader = document.createElement('div');
        categoryHeader.className = 'category-group';
        categoryHeader.innerHTML = '<h3>' + category.toUpperCase() + ' (' + categories[category].length + ' items)</h3>';
        displayArea.appendChild(categoryHeader);

        for (let i = 0; i < categories[category].length; i++)
        {
            let item = categories[category][i];

            let itemCard = document.createElement('div');
            itemCard.className = 'item-card';

            itemCard.innerHTML = `
                <h3>${item.name}</h3>
                <p class="item-price">$${item.price.toFixed(2)}</p>
                <p class="item-quantity">Stock: ${item.quantity} units</p>
                <p>${item.description}</p>
            `;

            displayArea.appendChild(itemCard);
        }
    }
}

function findDuplicates()
{
    let displayArea = document.getElementById('inventoryDisplay');
    displayArea.innerHTML = '';

    let haveNames = new Set();
    let duplicates = [];

    for (let i = 0; i < inventory.length; i++)
    {
        let itemName = inventory[i].name.toLowerCase();

        if (haveNames.has(itemName))
        {
            duplicates.push(inventory[i]);
        } else {
            haveNames.add(itemName);
        }
    }

    if (duplicates.length === 0)
    {
        displayArea.innerHTML = '<p style="text-align: center; color: #27ae60; font-size: 1.2em;">✓ No duplicate items found!</p>';
        return;
    }

    for (let i = 0; i < duplicates.length; i++)
    {
        let item = duplicates[i];
        let itemCard = document.createElement('div');
        itemCard.className = 'item-card duplicate-item';

        itemCard.innerHTML = `
            <span class="item-type">${item.type}</span>
            <h3>${item.name} (DUPLICATE)</h3>
            <p class="item-price">$${item.price.toFixed(2)}</p>
            <p class="item-quantity">Stock: ${item.quantity} units</p>
            <p>${item.description}</p>
        `;

        displayArea.appendChild(itemCard);
    }

    alert('Found ' + duplicates.length + ' duplicate item(s)!');
}

function applyDiscount(discountPercentage)
{
    if (discountPercentage < 0 || discountPercentage > 100)
    {
        alert('Please enter a discount between 0 and 100!');
        return;
    }

    for (let i = 0; i < inventory.length; i++)
    {
        let originalPrice = inventory[i].price;
        let discount = originalPrice * (discountPercentage / 100);
        inventory[i].price = originalPrice - discount;
    }

    listItems();
    alert(discountPercentage + '% discount applied to all items!');
}

function applyDiscountToAll()
{
    let discount = document.getElementById('discountPercent').value;

    if (discount === '')
    {
        alert('Please enter a discount percentage!');
        return;
    }

    applyDiscount(parseFloat(discount));
    document.getElementById('discountPercent').value = '';
}

window.onload = function()
{
    initializeInventory();
};
