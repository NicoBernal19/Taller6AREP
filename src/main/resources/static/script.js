const apiUrl = "https://ec2-18-212-209-232.compute-1.amazonaws.com:8443/api/properties";

document.addEventListener("DOMContentLoaded", fetchProperties);

document.getElementById("propertyForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const id = document.getElementById("propertyId").value;
    const property = {
        address: document.getElementById("address").value,
        price: document.getElementById("price").value,
        size: document.getElementById("size").value,
        description: document.getElementById("description").value
    };

    if (id) {
        await fetch(`${apiUrl}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(property)
        });
    } else {
        await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(property)
        });
    }

    resetForm();
    fetchProperties();
});

async function fetchProperties() {
    const response = await fetch(apiUrl);
    const properties = await response.json();

    const tableBody = document.getElementById("propertyList");
    tableBody.innerHTML = "";

    properties.forEach(property => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${property.address}</td>
        <td>$${property.price}</td>
        <td>${property.size} m²</td>
        <td>${property.description}</td>
        <td>
            <button class="edit" onclick="editProperty(${property.id}, '${property.address}', ${property.price}, ${property.size}, '${property.description}')">Edit</button>
            <button class="delete" onclick="deleteProperty(${property.id})">Delete</button>
        </td>
    `;
        tableBody.appendChild(row);
    });
}

document.getElementById("searchForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const address = document.getElementById("searchAddress").value;
    const minPrice = document.getElementById("searchMinPrice").value;
    const maxPrice = document.getElementById("searchMaxPrice").value;
    const minSize = document.getElementById("searchMinSize").value;
    const maxSize = document.getElementById("searchMaxSize").value;

    let queryParams = new URLSearchParams();
    if (address) queryParams.append("address", address);
    if (minPrice) queryParams.append("minPrice", minPrice);
    if (maxPrice) queryParams.append("maxPrice", maxPrice);
    if (minSize) queryParams.append("minSize", minSize);
    if (maxSize) queryParams.append("maxSize", maxSize);

    const response = await fetch(`${apiUrl}/search?${queryParams.toString()}`);
    const properties = await response.json();

    displayProperties(properties);
});

function displayProperties(properties) {
    const tableBody = document.getElementById("propertyList");
    tableBody.innerHTML = "";

    properties.forEach(property => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${property.address}</td>
        <td>$${property.price}</td>
        <td>${property.size} m²</td>
        <td>${property.description}</td>
        <td>
            <button class="edit" onclick="editProperty(${property.id}, '${property.address}', ${property.price}, ${property.size}, '${property.description}')">Edit</button>
            <button class="delete" onclick="deleteProperty(${property.id})">Delete</button>
        </td>
    `;
        tableBody.appendChild(row);
    });
}

async function deleteProperty(id) {
    if (confirm("Are you sure you want to delete this property?")) {
        await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
        fetchProperties();
    }
}

function editProperty(id, address, price, size, description) {
    document.getElementById("propertyId").value = id;
    document.getElementById("address").value = address;
    document.getElementById("price").value = price;
    document.getElementById("size").value = size;
    document.getElementById("description").value = description;
}

function resetForm() {
    document.getElementById("propertyId").value = "";
    document.getElementById("propertyForm").reset();
}