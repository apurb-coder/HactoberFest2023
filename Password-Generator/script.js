const input_range = document.body.querySelector(".pass-len input")
const pass_len_no = document.body.querySelector("#pass-len-no")
const generateBtn = document.body.querySelector(".button button")
const inputs = document.body.querySelectorAll(".option input")
const textBoxField= document.body.querySelector(".input-b input")
const copyClipboardBtn=document.body.querySelector(".input-b span")

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "~!@#$%^&*(){}[]|_-+=;:,<>./?`"
}

let duplicatesExclude = false;//exclude duplicate values from password?

const generateButton = () => {
    let staticPassword = "";
    Array.from(inputs).forEach((input) => {
        if (input.checked == true) {
            if (input.id !== "spaces" && input.id !== "duplicates") {
                staticPassword += characters[input.id]
            }
            else if (input.id === "spaces") {
                staticPassword = `      ${staticPassword}      `//adding spaces to password
            }
            else {
                duplicatesExclude=true;//exclude duplicate values from password?
            }

        }
        
    })
    let randomPassword = ""; // a password made with randomChar
    let randomChar="";// a random character
    for (let i = 0; i < input_range.value; i++) {
        randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)]
        if(duplicatesExclude){
            (!(randomPassword.includes(randomChar))) ? randomPassword+=randomChar : i--;
            /* !(randomPassword.includes(randomChar)) --> randomPassword ke andar randomChar nahi hai  */
        }
        else{
            randomPassword+=randomChar
        }
    }
    textBoxField.value=randomPassword;
    
}
input_range.addEventListener("input", () => {
    // console.log(input_range.value);
    pass_len_no.innerText = input_range.value;
})

generateBtn.addEventListener("click", generateButton)

copyClipboardBtn.addEventListener("click",()=>{
    navigator.clipboard.writeText(textBoxField.value);
    copyClipboardBtn.innerText="done"
    setTimeout(()=>{
        copyClipboardBtn.innerText="content_copy"
    },1000)
})
