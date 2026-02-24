// [Create a array for storing the values]
const thrivingList = [];
const struggleList = [];

// [Get the first 3 cards]
let totalCount = document.getElementById("total");
let thriveCount = document.getElementById("thrive");
let struggleCount = document.getElementById("struggle");

// [Get the conatiners]
const CardConatiner = document.getElementById("card-container");
const mainConatiner = document.getElementById("main-container");

// [Get the first 3 buttons]
const allFilterBtn = document.getElementById('all-filter-btn');
const allThrivingBtn = document.getElementById('thrive-filter-btn');
const allRejectBtn = document.getElementById('struggle-filter-btn');

function calculateCount() {
    totalCount.innerText = CardConatiner.children.length;
    thriveCount.innerText = thrivingList.length;
    struggleCount.innerText = struggleList.length;
}

calculateCount();

function toggleStyle(id) {
    // remove black bg and white text when one is selected
    allFilterBtn.classList.remove('bg-black', 'text-white');
    allThrivingBtn.classList.remove('bg-black', 'text-white');
    allRejectBtn.classList.remove('bg-black', 'text-white');

    // add gray bg and black text when one is selected
    allFilterBtn.classList.add('bg-gray-300', 'text-black');
    allThrivingBtn.classList.add('bg-gray-300', 'text-black');
    allRejectBtn.classList.add('bg-gray-300', 'text-black');

    const selected = document.getElementById(id);
}