//get elements by id and set selections
const durationSelect = document.getElementById("duration");
const selectedOptionsDiv = document.getElementById("selectedOptions");

durationSelect.addEventListener("change", function() {
const selectedOptions = Array.from(durationSelect.selectedOptions).map(option => option.text);
selectedOptionsDiv.textContent = selectedOptions.join("</br> ");

const selectedOptionsLength = selectedOptions.length;
const selectedOptionsCount = durationSelect.selectedOptions.length;

});
document.addEventListener("DOMContentLoaded", function() {
const selectedDateInput = document.getElementById("selected-date");
const ticketsTable = document.getElementById("tickets-table");
const totalPayable = document.getElementById("total-paypal");
const continueButton = document.getElementById("continue-button");

// ticket price data per one
const prices = {
  "Foreigner Adult": { normal: 10, peak: 13 },
  "Foreigner Child": { normal: 5, peak: 8 },
  "SL Adult": { normal: 4, peak: 6 },
  "SL Child": { normal: 2, peak: 3 },
  "Infant": { normal: 0, peak: 0 } 
};

//peak hours
const peakHours = [4, 5,6,9,10,11]; 

//updating data tothe summery table
function updateSummary() {
  const date = selectedDateInput.value;
  const duration = parseInt(document.getElementById("duration").value);

  const ticketData = [
    // Format: [Ticket guest category, Quantity]
    ["Foreigner Adult", parseInt(document.getElementById("foreigner-adult").value)],
    ["Foreigner Child", parseInt(document.getElementById("foreigner-child").value)],
    ["SL Adult", parseInt(document.getElementById("sl-adult").value)],
    ["SL Child", parseInt(document.getElementById("sl-child").value)],
    ["Infant", parseInt(document.getElementById("infant").value)]
    
  ];

  const tableBody = document.getElementById("tickets-table");
  tableBody.innerHTML = "";


  let total = 0;

  // calculate total and add datacell
  for (const [category, quantity] of ticketData) {
    if (quantity > 0) {
      const row = tableBody.insertRow();
      const cellCategory = row.insertCell();
      const cellDate = row.insertCell();
      const cellTime = row.insertCell();
      const cellDuration = row.insertCell();
      const cellQuantity = row.insertCell();
      const cellPrice = row.insertCell();

      const normalPrice = prices[category].normal * quantity * duration;
      const peakPrice = peakHours.includes(duration) ? prices[category].peak * quantity * duration : 0;
      const price = normalPrice + peakPrice;

      cellCategory.innerHTML = category;
      cellDate.innerHTML = date;
      cellTime.innerHTML = document.getElementById("duration").options[duration - 1].text;
      cellDuration.innerHTML = `${duration} hour(s)`;
      cellQuantity.innerHTML = quantity;
      cellPrice.innerHTML = `$${price}`;

      total += price;
    }
  }

  totalPayable.innerHTML = `$${total}`;
  continueButton.disabled = total === 0;
  
  const form={
    date: date,
    ticketData: ticketData,
    selectedOptions: selectedOptions,
    selectedOptionsCount: selectedOptionsCount,
    total: total
  };
  localStorage.setItem("form",JSON.stringify(form));
        localStorage.setItem('date',JSON.stringify(date));
        localStorage.setItem('selectedOptionsCount',JSON.stringify(selectedOptionsCount));
        localStorage.setItem('ticketData',JSON.stringify(ticketData));
        localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
        localStorage.setItem('total', JSON.stringify(total));
}



// Add event listeners
selectedDateInput.addEventListener("change", updateSummary);
document.getElementById("duration").addEventListener("change", updateSummary);
document.getElementById("foreigner-adult").addEventListener("change", updateSummary);
document.getElementById("foreigner-child").addEventListener("change", updateSummary);
document.getElementById("sl-adult").addEventListener("change", updateSummary);
document.getElementById("sl-child").addEventListener("change", updateSummary);
document.getElementById("infant").addEventListener("change", updateSummary);


continueButton.addEventListener("click", function() {
  window.location.href = "detailstest.html";
});

// Update summary initially
updateSummary();
});

 // Sample data as a JSON object
 const jsonData = [
        
        {
            "guest": "foreign adult",
            "date": "2023-08-11",
            "time": "07.00 AM - 08.00 AM",
            "duration": "1 hrs(normal)",
            "tickets": 1,
            "price": 10
        }
        // Add more data as needed
    ];
    
    // Function to populate the table with data
    function populateTable() {
        const tableBody = document.querySelector('#summary-table tbody');
        
        for (const item of jsonData) {
            const row = tableBody.insertRow();
            row.innerHTML = `
                <tr>
                  <td>${item.guest}</td>
                  <td>${item.date}</td>
                  <td>${item.time}</td>
                  <td>${item.duration}</td>
                  <td>${item.tickets}</td>
                  <td>$${item.price.toFixed(2)}</td>
                </tr>
                
            `;
        }
    }
    
window.onload = populateTable;
