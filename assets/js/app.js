const loadPhone = async(searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data, dataLimit);
}

const displayPhone = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = '';
    // Display 10 phone
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 12){
        phones = phones.slice(0, 12);
        showAll.classList.remove('d-none');
    }else{
        showAll.classList.add('d-none');
    }

    // Not Found Message
    const noPhone = document.getElementById('not-found-message');
    if(phones.length === 0){
        noPhone.classList.remove('d-none');
    }else{
        noPhone.classList.add('d-none');
    }

    // Display All Phone
    phones.forEach(phone => {
        const {brand, phone_name, image, slug} = phone;
        const phoneDiv = document.createElement('col');
        phoneDiv.innerHTML = `
            <div class="card p-3">
                <div class="text-center">
                    <img src="${image}" style="width: 150px; margin: 0 auto;" class="card-img-top" alt="...">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${phone_name ? phone_name : ''}</h5>
                    <p class="card-text">${brand ? brand : ''}</p>
                    <button type="button" onclick="loadPhoneDetails('${slug}')" class="btn btn-warning text-white" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Details</button>
                </div>
            </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    });
    // Stop Loader
    toggleLoader(false);
}

const processSearch = dataLimit => {
    // Start Loader
    toggleLoader(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, dataLimit);
}

// Search Phone by Name
document.getElementById('search-phone').addEventListener('click', function(){
    processSearch(12);
})

// search input field enter key handler
document.getElementById('search-field').addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
        processSearch(12);
    }
})

// Loading Spinner Function
const toggleLoader = isLoading => {
    const loader = document.getElementById('loader');
    if(isLoading){
        loader.classList.remove('d-none');
    }else{
        loader.classList.add('d-none');
    }
}

// Not The Best Way to Load Show All Phone
document.getElementById('phone-show-all').addEventListener('click', function(){
    processSearch();
})

// Load Phone Details
const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

// Display Phone Details with Bootstrap Modal
const displayPhoneDetails = phone => {
    const {releaseDate, name, mainFeatures, others, brand, image} = phone;
    const modalTitle = document.getElementById('phoneDetailsLabel');
    modalTitle.innerText = name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
        <tr class="text-center">
            <td colspan="2"><img src="${image}" alt=""></td>
        </tr>
        <tr class="text-center">
            <td colspan="2"><h4>${name ? name : ''} Full Specifications</h4></td>
        </tr>
        <tr>
            <td>Release Date</td>
            <td>${releaseDate ? releaseDate : ''}</td>
        </tr>
        <tr>
            <td><strong>Connectivity</strong></td>
            <td></td>
        </tr>
        <tr>
            <td>WLAN</td>
            <td>${others.WLAN ? others.WLAN : ''}</td>
        </tr>
        <tr>
            <td>Bluetooth</td>
            <td>${others.Bluetooth ? others.Bluetooth : ''}</td>
        </tr>
        <tr>
            <td>GPS</td>
            <td>${others.GPS ? others.GPS : ''}</td>
        </tr>
        <tr>
            <td>NFC</td>
            <td>${others.NFC ? others.NFC : ''}</td>
        </tr>
        <tr>
            <td>Radio</td>
            <td>${others.Radio ? releaseDate : ''}</td>
        </tr>
        <tr>
            <td>USB</td>
            <td>${others.USB ? others.USB : ''}</td>
        </tr>
        <tr>
            <td><strong>Display</strong></td>
            <td></td>
        </tr>
        <tr>
            <td>Size</td>
            <td>${mainFeatures.displaySize ? mainFeatures.displaySize : ''}</td>
        </tr>
        <tr>
            <td><strong>Performance</strong></td>
            <td></td>
        </tr>
        <tr>
            <td>Chipset</td>
            <td>${mainFeatures.chipSet ? mainFeatures.chipSet : ''}</td>
        </tr>
        <tr>
            <td>RAM</td>
            <td>${mainFeatures.memory ? mainFeatures.memory : ''}</td>
        </tr>
        <tr>
            <td><strong>Storage</strong></td>
            <td></td>
        </tr>
        <tr>
            <td>ROM</td>
            <td>${mainFeatures.storage ? mainFeatures.storage : ''}</td>
        </tr>
        <tr>
            <td><strong>Others</strong></td>
            <td></td>
        </tr>
        <tr>
            <td>Sensors</td>
            <td>${mainFeatures.sensors.join(', ') ? mainFeatures.sensors.join(', ') : ''}</td>
        </tr>
        <tr>
            <td>Manufactured by</td>
            <td>${brand ? brand : ''}</td>
        </tr>
    `;
}


// Default Apple All Phone Show
loadPhone(12, "Phone");
