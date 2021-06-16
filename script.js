let formValidation = function(form, els) {
    form = document.querySelector(form);

    form.addEventListener ("submit", function(event) {
        event.preventDefault();
        els.forEach(el => {
            el = document.querySelector(el);
            const parent = el.parentElement;
            const message = `<span class="error">Please enter ${el.name}.</span>`;

            if (!el.value) {
                if (!parent.innerHTML.includes(message)) {
                    parent.innerHTML += message;
                }
            }else {
                if (parent.innerHTML.includes(message)) {
                    parent.removeChild(parent.lastChild);
                }
            }
        })
    })
}

let validate = new formValidation("#form", ["#name", "#email", "#password"])

let validate1 = new formValidation("#form1", ["#name1", "#email1"])