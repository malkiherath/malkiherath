const form = document.getElementById('form');
const fullname = document.getElementById('fullname');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const email2 = document.getElementById('email2');
const btnSub=document.getElementById("purbtn");
        
       
// Update the submit button's disabled state
function updateButtonState() {
    const allInputsFilled = fullname.value.trim() !== '' &&
        email.value.trim() !== '' &&
        phone.value.trim() !== '' &&
        email2.value.trim() !== '';

    const validEmail = isValidEmail(email.value.trim());
    const matchingEmails = email2.value.trim() === email.value.trim();

    btnSub.disabled = !(allInputsFilled && validEmail && matchingEmails);
    
    if (allInputsFilled && validEmail && matchingEmails) {
        btnSub.classList.add('button-enabled'); // Add the enabled style class
    } else {
        btnSub.classList.remove('button-enabled'); // Remove the enabled style class
    }
}

// Listen for input changes on all fields
fullname.addEventListener("input", updateButtonState);
email.addEventListener("input", updateButtonState);
phone.addEventListener("input", updateButtonState);
email2.addEventListener("input", updateButtonState);

// Add an event listener to the form submission

form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
    const validInputs = document.querySelectorAll('.input-control.success').length;
    if (validInputs === 4) {
        addtoStorage();
    }
});
var response=[];
//adding an onclick listener to the submit button
btnSub.addEventListener("click",addtoStorage);
//addtoStorage implementation
function addtoStorage(){
    //building a JSON object to store name and nickname
    const jsonData={"name":fullname.value, "email":email.value, "email2":email2.value, "phone":phone.value};
    //adding the JSON object to response array
    response.push(jsonData);
    //adding response array to local Storage
    localStorage.setItem('details',JSON.stringify(response));
    localStorage.setItem('name',JSON.stringify(fullname.value));
    localStorage.setItem('email',JSON.stringify(email.value));
    localStorage.setItem('phone',JSON.stringify(phone.value));

    console.log(localStorage);
}

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const fullnameValue = fullname.value.trim();
    const emailValue = email.value.trim();
    const email2Value = email2.value.trim();
    const phoneValue = phone.value.trim();
    

    if(fullnameValue === '') {
        setError(fullname, 'fullname is required');
    } else {
        setSuccess(fullname);
    }

    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }

    if(email2Value === '') {
        setError(email2, 'Please confirm your email');
    } else if (email2Value !== emailValue) {
        setError(email2, "emails doesn't match");
    } else {
        setSuccess(email2);
    }

    if(phoneValue === '') {
        setError(phone, 'phone is required');
    } else if (phoneValue.length < 8 ) {
        setError(phone, 'phone must be at least 8 character.')
    } else {
        setSuccess(phone);
    }

    

};

var input = document.querySelector("#phone");
window.intlTelInput(input, {
separateDialCode: true
});


