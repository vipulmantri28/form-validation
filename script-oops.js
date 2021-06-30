let FormValidation = function(para) {
    const {ele, allRequired, fields} = para || {};
    this.element = ele;
    this.allRequired = allRequired || false;
    this.fields = fields;
    this.isValid = true;
    
    if (!this.validateElement()) return;
    // if (this.allRequired === true && this.checkAllFields() === false) return;
    const allFields = Object.keys(this.fields).map(field => {
        const inputEle = document.querySelector(`${this.element} #${field}`);
        if (inputEle === null) {
            console.error(`Invalid field ${field} selctor provided.`)
        }
        this.validate(inputEle, field);
        new InputValidation(inputEle, this.fields)
    })
}

FormValidation.prototype = {
    validateElement: function() {
        let validEle = true;
        if (!this.element) {
            console.error('Form selector is required.')
            validEle = false;
        }else if (this.element && document.querySelector(this.element) === null) {
            console.error('Form Selector provided is invalid.')
            validEle = false;
        }
        return validEle;
    },
    checkAllFields: function(){
        const inputFields = document.querySelectorAll(`${this.element} input`)
        let validInput = true

        inputFields.forEach(field => {
            if (field.type === "submit" || field.type === "Submit") {
                return
            }else {
                if (field.value === "") {
                    validInput = false;
                    const parent = field.parentElement;
                    const errorMsg = `${field.name} is required.`;
                    showError(errorMsg, parent)
                }
            }
        })
        return validInput;
    },
    validate: function(ele, field) {
        field = this.fields[field];
        const keys = Object.keys(field);
        const parent = ele.parentElement;
        if (keys.includes('onlyText')) {
            if (!/^[a-z ]+$/i.test(ele.value)) {
                if (field.onlyTextError === undefined) {
                    field.onlyTextError = `The field should only contain letters.`
                }

                showError(field.onlyTextError, parent);
            }
        }
        if (keys.includes('charLimit')) {
            ele.value = ele.value.trim()
            if (ele.value.length > field.charLimit) {
                if (field.charError === undefined) {
                    field.charError = `The field has character limit of ${field.charLimit}.`
                }
    
                showError(field.charError, parent);
            }

        }
    },

}

function showError(errMsg, parent) {
    if (parent.lastChild.className === 'error') {
        parent.lastChild.innerHTML = errMsg;
    }else {
        parent.innerHTML += `<span class="error">${errMsg}</span>`;
    }
}


InputValidation.prototype = Object.create(FormValidation.prototype)
function InputValidation(ele, fields) {
    this.element = ele;
    this.field = fields[ele.name]
    this.text = {
        onlyText: false
    }
    this.password = {
        charLimit: null,
        includeNum: false,
        includeSpecialChar: false,
        charError: `Password must be long.`
    }
    this.inputCheck(ele);

    console.log(this.element.name)
    
}


InputValidation.prototype = {
    conditionnUpdate: function() {
        Object.assign()
    },
    inputCheck: function(ele) {
        switch (ele.type) {
            case 'text': {
                textValidation();
                break;
            }
            case 'password': {
                passwordValidation();
                break;
            }
        }
    }
}



function textValidation() {
    console.log('textValidation')
}

function passwordValidation() {
    console.log('passwordValidation')
}