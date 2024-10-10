const emailId = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@northeastern.edu$/;
const phoneNumber = /\d{3}?\d{3}\d{4}$/;
const zipcode = /^[0-9]{5}(?:-[0-9]{4})?$/;

const inputRegExs = {emailId, phoneNumber, zipcode};
const submitBtn = document.getElementById('submit');
const resetBtn = document.getElementById('reset');

const formElement = document.getElementsByTagName('form')[0];

const isValidForm = {
    'firstName': false, 'lastName': false,'emailId': false, 'phoneNumber': false,
    'streetAddress1': false,'city': false, 'state': false,
    'zipcode': false,'source': false,'drinks': false, 'comments': false,
}

const firstNameElement = document.getElementById('firstName');
const lastNameElement = document.getElementById('lastName');
const emailIdElement = document.getElementById('emailId');
const phoneNumberElement = document.getElementById('phoneNumber');
const streetAddress1Element = document.getElementById('streetAddress1');
const streetAddress2Element = document.getElementById('streetAddress2');

const cityElement = document.getElementById('city');
const stateElement = document.getElementById('state');
const zipcodeElement = document.getElementById('zipcode');
const commentsElement = document.getElementById('comments');
const sourceElements = document.getElementsByName('source');

const drinkSelectElement = document.getElementById('drinks');
const drinksError = document.getElementById('drinks_error');
const drinkNameLabel = document.getElementById('drink_name_label');
const drinkCheckbox = document.getElementById('drink_name_checkbox');
const drinkCustomLabel = document.getElementById('drink_custom_label');
const drinkCustomText = document.getElementById('drink_custom_text');
const drinkCustomError = document.getElementById('drink_custom_error');

const disableSubmit = () => {
    let disableButton = true;
    for (const isValid in isValidForm) {
        disableButton = disableButton && isValidForm[isValid];
    }
    submitBtn.disabled = !disableButton;
}

const validateInput = (event) => {
    const input = event.target;
    const inputValue = input.value;
    const inputName = input.name;
    let isValid = inputValue.trim().length > 0;
    if (inputRegExs[inputName]) {
        isValid = inputValue.trim().match(inputRegExs[inputName]);
    }
    isValidForm[inputName] = isValid;
    const errorDivision = document.getElementById(`${inputName}_error`);
    if (errorDivision) {
        errorDivision.style.display = isValid ? 'none' : 'block';
    }
    disableSubmit();
};

const validateCheckbox = (event) => {
    const inputName = event.target.name;
    for (let i = 0; i < sourceElements.length; i++) {
        if(sourceElements[i].checked){
            isValidForm['source'] = true;
            break;
        }
        isValidForm['source'] = false;
    }

    const errorDivision = document.getElementById(`${inputName}_error`);
    if (errorDivision) {
        errorDivision.style.display = isValidForm[inputName] ? 'none' : 'block';
    }
    disableSubmit();
}

firstNameElement.addEventListener('focus', validateInput);
lastNameElement.addEventListener('focus', validateInput);
emailIdElement.addEventListener('focus', validateInput);
phoneNumberElement.addEventListener('focus', validateInput);
streetAddress1Element.addEventListener('focus', validateInput);
cityElement.addEventListener('focus', validateInput);
stateElement.addEventListener('focus', validateInput);
zipcodeElement.addEventListener('focus', validateInput);
commentsElement.addEventListener('focus', validateInput);

firstNameElement.addEventListener('blur', validateInput);
lastNameElement.addEventListener('blur', validateInput);
emailIdElement.addEventListener('blur', validateInput);
phoneNumberElement.addEventListener('blur', validateInput);
streetAddress1Element.addEventListener('blur', validateInput);
cityElement.addEventListener('blur', validateInput);
stateElement.addEventListener('blur', validateInput);
zipcodeElement.addEventListener('blur', validateInput);
commentsElement.addEventListener('blur', validateInput);

const handleDrinks = (event) => {
    const selectedValue = event.target.value;

    drinksError.style.display = selectedValue.length ? 'none' : 'block';
    drinkCheckbox.style.display = selectedValue.length ? 'block' : 'none';
    drinkNameLabel.style.display = selectedValue.length ? 'block' : 'none';
    drinkNameLabel.innerHTML = `${selectedValue} Large ($2.5 Extra)`;
    isValidForm[event.target.name] = selectedValue.length > 0;
    disableSubmit();
}

const handleDrinkSelection = (event) => {
    const checked = event.target.checked;
    drinkCustomLabel.style.display = checked ? 'block' : 'none';
    drinkCustomText.style.display = checked ? 'block' : 'none';

    if(checked && drinkCustomText.value.trim().length === 0) {
        drinkCustomError.style.display = 'block';
        submitBtn.disabled = true;
    } else {
        drinkCustomError.style.display = 'none';
        disableSubmit();
    }
}

const validateCustomization = (event) => {
    const selectedValue = event.target.value.trim();
    if(selectedValue.length === 0) {
        drinkCustomError.style.display = 'block';
        submitBtn.disabled = true;
    } else {
        drinkCustomError.style.display = 'none';
        disableSubmit();
    }
}
drinkSelectElement.addEventListener('change', handleDrinks);
drinkCheckbox.addEventListener('change', handleDrinkSelection);
drinkCustomText.addEventListener('focus', validateCustomization);
drinkCustomText.addEventListener('blur', validateCustomization);

sourceElements.forEach(sourceElement => {
    sourceElement.addEventListener('click', validateCheckbox);
});

function refreshForm() {
    window.location.reload();
}

const submitTable = () => {
    const titleElement = document.querySelector('input[name="title"]:checked');
    const table = document.createElement('table');
    let checkboxInitialString = '';
    sourceElements.forEach(sourceElement => {
         if(sourceElement.checked) {
             checkboxInitialString = checkboxInitialString + sourceElement.value + " ";
         }
    })
    table.innerHTML = `
        <caption>Submitted Form Result</caption>  
        <tbody>
            <tr>
                <td>Title</td>
                <td>${titleElement.value}</td>
            </tr>
            <tr>
                <td>First Name</td>
                <td>${firstNameElement.value}</td>
            </tr>
            <tr>
                <td>Last Name</td>
                <td>${lastNameElement.value}</td>
            </tr>
            <tr>
                <td>Email Id</td>
                <td>${emailIdElement.value}</td>
            </tr>
            <tr>
                <td>Phone Number</td>
                <td>${phoneNumberElement.value}</td>
            </tr>
            <tr>
                <td>Street Address 1</td>
                <td>${streetAddress1Element.value}</td>
            </tr>
            <tr>
                <td>Street Address 2</td>
                <td>${streetAddress2Element.value}</td>
            </tr>
            <tr>
                <td>City</td>
                <td>${cityElement.value}</td>
            </tr>
            <tr>
                <td>State</td>
                <td>${stateElement.value}</td>
            </tr>
            <tr>
                <td>ZipCode</td>
                <td>${zipcodeElement.value}</td>
            </tr>
            <tr>
                <td>How did you hear</td>
                <td>
                ${checkboxInitialString}</td>
            </tr>   
            <tr>
                <td>Drink</td>   
                <td>${drinkSelectElement.value}</td> 
            </tr>
            <tr>
                <td>${drinkNameLabel.textContent}</td>
                <td>${drinkCheckbox.checked ? 'Added' : 'Not Added'}</td> 
            </tr>
            <tr>
                <td>Any Additional Customization</td>
                <td>${drinkCheckbox.checked ? drinkCustomText.value: ""}</td> 
            </tr>
            <tr>
                <td>Comments</td>
                <td>${commentsElement.value}</td> 
            </tr>      
            
        </tbody>
    `;
    document.getElementById('container').remove();
    document.body.append(table);

};

formElement.addEventListener('submit', submitTable);
resetBtn.addEventListener('click', refreshForm);
