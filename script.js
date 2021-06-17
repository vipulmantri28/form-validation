// let formValidation = function(form, els, strength) {
//     form = document.querySelector(form);

//     form.addEventListener ("submit", function(event) {
//         event.preventDefault();
//         els.forEach(el => {
//             el = document.querySelector(el);
//             const parent = el.parentElement;
//             const message = `<span class="error">Please enter ${el.name}.</span>`;

//             if (!el.value) {
//                 if (!parent.innerHTML.includes(message)) {
//                     parent.innerHTML += message;
//                 }
//             }else {
//                 if (parent.innerHTML.includes(message)) {
//                     parent.removeChild(parent.lastChild);
//                 }
//             }
//         })
//     })

//     function passwordCheck(strength) {
//         if (strength) {
//             const ele = document.querySelector(strength.shift());
//             const reg =  strength.join("");
//             console.log(ele, reg);
//         }
//     }

//     passwordCheck(strength);
// }

// let validate = new formValidation("#form", ["#name", "#email", "#password"], ["#password", "a-z", "A-Z"])

// let validate1 = new formValidation("#form1", ["#name1", "#email1"]);



const formValidate = (function(){
    const forms = [...document.forms];
    forms.forEach(form => {
        const inputDiv = [...form.querySelectorAll('div')];
        inputDiv.pop();
        const inputs = form.querySelectorAll('input');
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            requireCheck()
        })
        console.log(inputDiv, inputs);

        function requireCheck() {
            const requiredDiv = inputDiv.filter(div => div.dataset.required === "true");
            
            requiredDiv.forEach(div => {
                const input = div.querySelector('input');
                const message = `<span class="error">Please enter ${input.name}.</span>`;
                if (!input.value && !div.innerHTML.includes(message)) {
                    div.innerHTML += message
                }else if (input.value && div.innerHTML.includes(message)) {
                    div.removeChild(div.lastChild);
                }
            
            })
        }
    })
    console.log(forms);
})()