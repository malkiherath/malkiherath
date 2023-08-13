

    /////////////////
    const form = document.getElementById('form');
    const card = document.getElementById('card');
    const edate = document.getElementById('edate');
    const cvc = document.getElementById('cvc');
    const cardname = document.getElementById('cardname');
    const btnSub=document.getElementById("btn");
            
            var response=[];
            //adding an onclick listener to the submit button
            btnSub.addEventListener("click",addtoStorage);
            //addtoStorage implementation
            function addtoStorage(){
                //building a JSON object to store name and nickname
                const jsonData={"card":card.value, "edate":edate.value, "cvc":email2.value, "cardname":cardname.value};
                //adding the JSON object to response array
                response.push(jsonData);
                //adding response array to local Storage
                localStorage.setItem('details',JSON.stringify(response));
                localStorage.setItem('card',JSON.stringify(card.value));
                localStorage.setItem('edate',JSON.stringify(edate.value));
                localStorage.setItem('cvc',JSON.stringify(cvc.value));
                localStorage.setItem('cardname',JSON.stringify(cardname.value));
            
                console.log(localStorage);
            }
            function errors(){
    form.addEventListener('submit', e => {
        e.preventDefault();
    
        validateInputs();
    });
    
    
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
    
    
    
    const validateInputs = () => {
        const cardValue = card.value.trim();
        const edateValue = edate.value.trim();
        const cvcValue = cvc.value.trim();
        const cardnameValue = cardname.value.trim();
        
        
    
        if(cardValue === '') {
            setError(card, 'Please enter card number');
        }
        else if (cardValue.length < 16 ) {
            setError(card, 'invalid card number') ;
        }else {
            setSuccess(card);
        }
    
        if(edateValue === '') {
            setError(edate, 'Please enter expiry date');
        } else {
            setSuccess(edate);
        }
    
        if(cvcValue === '') {
            setError(cvc, 'Please enter CVV/CVC');
        }
        else if (cvcValue.length != 3 ) {
            setError(cvc, 'invalid CVV/CVC') ;
        }else {
            setSuccess(cvc);
        }
    
        if(cardnameValue === '') {
            setError(cardname, 'Please enter cardholder name');
        }
        else {
            setSuccess(cardname);
        }
    
        
    
    };
    }
    
  
    var userData = JSON.parse(localStorage.getItem("form"));
        if (userData) {
            var profileDataElement = document.getElementById("profileData");
            
            profileDataElement.innerHTML+=
                `<tr>
                    <td rowspan="6">${userData.date}</td>
                    <td rowspan="6">${userData.selectedOptions}</td>
                    <td rowspan="6">${userData.duration}</td>
                    <td>${userData.ticketData[0][0]}</td>
                    <td>${userData.ticketData[0][1]}</td>
                    <td rowspan="6">(${userData.total})</td>
                </tr>
                <tr>
                    
                    <td>${userData.ticketData[1][0]}</td>
                    <td>${userData.ticketData[1][1]}</td>
                </tr>
                <tr>
                    
                    <td>${userData.ticketData[2][0]}</td>
                    <td>${userData.ticketData[2][1]}</td>
                    
                </tr>
                <tr>
                    
                    <td>${userData.ticketData[3][0]}</td>
                    <td>${userData.ticketData[3][1]}</td>
                    
                </tr>
                <tr>
                
                    <td>${userData.ticketData[4][0]}</td>
                    <td>${userData.ticketData[4][1]}</td>
                    
                </tr>
                `;
    
        } else {
            profileDataElement.innerHTML = "No user data found.";
        }


    
    
    