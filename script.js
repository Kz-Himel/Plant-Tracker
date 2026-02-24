// Arrays for tracking
let thrivingList = [];
let struggleList = [];
let currentStatus = "all";

// Count elements
let totalCount = document.getElementById("total");
let thriveCount = document.getElementById("thrive");
let struggleCount = document.getElementById("struggle");

// Containers
const cardContainer = document.getElementById("card-container"); // All cards
const filterContainer = document.getElementById("filter-section"); // Filter view
const mainContainer = document.getElementById("main-container");

// Filter buttons
const allFilterBtn = document.getElementById('all-filter-btn');
const allThrivingBtn = document.getElementById('thrive-filter-btn');
const allRejectBtn = document.getElementById('struggle-filter-btn');

calculateCount();

// Function to calculate counts
function calculateCount() {
    totalCount.innerText = cardContainer.children.length; // total always
    thriveCount.innerText = thrivingList.length;
    struggleCount.innerText = struggleList.length;
}

// Toggle filter button styles and render view
function toggleStyle(id) {
    [allFilterBtn, allThrivingBtn, allRejectBtn].forEach(btn => {
        btn.classList.remove('bg-black','text-white');
        btn.classList.add('bg-gray-300','text-black');
    });

    const selected = document.getElementById(id);
    selected.classList.remove('bg-gray-300','text-black');
    selected.classList.add('bg-black','text-white');

    currentStatus = id;

    if(id === 'all-filter-btn') {
        cardContainer.classList.remove('hidden');
        filterContainer.classList.add('hidden');
    } else {
        cardContainer.classList.add('hidden');
        filterContainer.classList.remove('hidden');
        if(id === 'thrive-filter-btn') renderThriving();
        if(id === 'struggle-filter-btn') renderStruggling();
    }
}

// Find card in All tab by plant name
function findCardByName(name) {
    for(const c of cardContainer.children){
        if(c.querySelector('.plant-name').innerText === name) return c;
    }
    return null;
}

// Render functions
function renderThriving() {
    filterContainer.innerHTML = '';
    thrivingList.forEach(item => {
        const cardClone = findCardByName(item.plantName).cloneNode(true);
        cardClone.querySelector('.status').innerText = 'Thrive';
        filterContainer.appendChild(cardClone);
    });
}

function renderStruggling() {
    filterContainer.innerHTML = '';
    struggleList.forEach(item => {
        const cardClone = findCardByName(item.plantName).cloneNode(true);
        cardClone.querySelector('.status').innerText = 'Struggle';
        filterContainer.appendChild(cardClone);
    });
}

// Event listener for buttons
mainContainer.addEventListener('click', (event) => {
    const target = event.target;
    const card = target.closest('.card');
    if(!card) return;

    const plantName = card.querySelector('.plant-name').innerText;

    // Thrive button clicked
    if(target.classList.contains('thriving-btn')){
        card.querySelector('.status').innerText = 'Thrive';
        if(!thrivingList.find(item => item.plantName === plantName)){
            thrivingList.push({plantName});
        }
        struggleList = struggleList.filter(item => item.plantName !== plantName);

        if(currentStatus === 'struggle-filter-btn') renderStruggling();
        if(currentStatus === 'thrive-filter-btn') renderThriving();
    }

    // Struggling button clicked
    if(target.classList.contains('struggling-btn')){
        card.querySelector('.status').innerText = 'Struggle';
        if(!struggleList.find(item => item.plantName === plantName)){
            struggleList.push({plantName});
        }
        thrivingList = thrivingList.filter(item => item.plantName !== plantName);

        if(currentStatus === 'thrive-filter-btn') renderThriving();
        if(currentStatus === 'struggle-filter-btn') renderStruggling();
    }

    // Delete button clicked
    if(target.classList.contains('delete-btn')){
        thrivingList = thrivingList.filter(item => item.plantName !== plantName);
        struggleList = struggleList.filter(item => item.plantName !== plantName);
        card.remove();
    }

    calculateCount();
});