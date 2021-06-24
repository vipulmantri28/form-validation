function formValidation(para) {
    const {ele, allRequired, fields} = para || {};
    this.element = ele;
    this.allRequired = allRequired || false;
    this.fields = fields;
    this.isValid = true;
    
    if (!this.validateElement()) return;
    const allFields = Object.keys(this.fields).map(field => {
        const inputEle = document.querySelector(`${this.element} #${field}`);
        if (inputEle === null) {
            console.error(`Invalid field ${field} selctor provided.`)
        }

        this.validate(inputEle, field);
    })

}

formValidation.prototype = {
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
    validate: function(ele, field) {
        field = this.fields[field];
        const keys = Object.keys(field);
        const parent = ele.parentElement;

        if (ele.value === "") {
            if (field.errorMsg === undefined) {
                field.errorMsg = `<span class"error">${ele.name} is required.`
            }
            this.showError(field.errorMsg, parent)
        }else {
            if (keys.includes('onlyText')) {
                if (!/^[a-z ]+$/i.test(ele.value)) {
                    if (field.onlyTextError === undefined) {
                        field.onlyTextError = `The field should only contain letters.`
                    }

                    this.showError(field.onlyTextError, parent);
                }
            }
            if (keys.includes('charLimit')) {
                ele.value = ele.value.trim()
                if (ele.value.length > field.charLimit) {
                    if (field.charError === undefined) {
                        field.charError = `The field has character limit of ${field.charLimit}.`
                    }
        
                    this.showError(field.charError, parent);
                }

            }
        }
    },
    showError: function(errMsg, parent) {
        this.isValid = false;
        if (parent.lastChild.className === 'error') {
            parent.lastChild.innerHTML = errMsg;
        }else {
            parent.innerHTML += `<span class="error">${errMsg}</span>`;
        }
    }
}