// QUERY SELECTORS
const btnEncrypt = document.querySelector(".btn-encrypt");
const btnDecrypt = document.querySelector(".btn-decrypt");
const btnSha = document.querySelector(".btn-sha");

// EVENT LISTENERS
btnEncrypt.addEventListener("click", encrypt);
btnDecrypt.addEventListener("click", decrypt);

// ENCRYPTION FUNCTION
function encrypt(e){
    e.preventDefault();
    const message = document.querySelector("#msg-input").value;
    let password = document.querySelector("#pass-input").value;
  
    if(message != ""){
        if(password.length >= 3){
        
            let rev = [];
            for(i=password.length-1; i >= 0; i--){
                rev.push(password[i]);
            }
        
            var reverse = rev.join("");
        
            const hashPassword = CryptoJS.SHA256(reverse);
            const base = hashPassword.toString(CryptoJS.enc.Base64);
        
            
            document.querySelector("#pass-input").value = base;
            
            setTimeout(function(){
        
            const message = document.querySelector("#msg-input").value;
            let password = document.querySelector("#pass-input").value;
            
            const encrypted = CryptoJS.AES.encrypt(message, password);
            const encryptedTxt = encrypted.toString();
        
            const doubleEncrypted = CryptoJS.Rabbit.encrypt(encryptedTxt, password);
            document.querySelector("#msg-input").value = doubleEncrypted;
        
            document.querySelector("#pass-input").value = "";
            
        
            //FOR COPYING TEXT TO CLIPBOARD  
            var copyText = document.getElementById("msg-input");
          
            /* Select the text field */
            copyText.select();
            copyText.setSelectionRange(0, 99999); /* For mobile devices */
          
            /* Copy the text inside the text field */
            document.execCommand("copy");
            // setTimeout(function(){ alert("Hello"); }, 3000);
            if(copyText.value != ""){
                document.getElementById("msg-box").innerHTML = "<textarea id='msg-input' onselect = 'blur()';></textarea>";
                document.querySelector("#msg-input").value = copyText.value;
                document.getElementById("title").innerHTML = "<h1><b>Encrypted <br>Text Copied!<b></h1>";
                document.getElementById("msg-box").innerHTML = 
                "<textarea id='msg-input' type='text' placeholder='Enter your secret message or cipher text...'></textarea>";
                document.querySelector("#msg-input").value = copyText.value;
                btnDecrypt.disabled = true;
                setTimeout(function(){ 
                    document.getElementById("title").innerHTML = "Encrypt Plain Text <br>with AES";
                    btnDecrypt.disabled = false;
                     }, 3000);
            }
        
            
             }, 50)       
        
            }
            else{
                alert("Enter key >= 3 letters!!!");
            }
        
    }
    else{
        alert("Secret message can't be empty!!!");
    }

    
}

// DECRYPTION FUNCTION
function decrypt(e){
    e.preventDefault();
    const message = document.querySelector("#msg-input").value;
    let password = document.querySelector("#pass-input").value;
  
    if(message != "")  {
    
         if(password != ""){
             let rev = [];
    for(i=password.length-1; i >= 0; i--){
        rev.push(password[i]);
    }

    var reverse = rev.join("");

    const hashPassword = CryptoJS.SHA256(reverse);
    const base = hashPassword.toString(CryptoJS.enc.Base64);

    document.querySelector("#pass-input").value = base;
    password = document.querySelector("#pass-input").value;

    setTimeout(function(){ 
        const message = document.querySelector("#msg-input").value;
        let password = document.querySelector("#pass-input").value;
        
        try {
            const doubleDecrypted = CryptoJS.Rabbit.decrypt(message, password);
            var decryptedTxt = doubleDecrypted.toString(CryptoJS.enc.Utf8);
          } catch (e) {
            var decryptedTxt = "";
          }
        const decrypted = CryptoJS.AES.decrypt(decryptedTxt, password);
 
        
        document.querySelector("#msg-input").value = decrypted.toString(CryptoJS.enc.Utf8);
    
        let wrongPass = document.querySelector("#msg-input").value;
        if(wrongPass == ""){
            document.getElementById("title").innerHTML = "<span style='color: white;'>Wrong Key Entered!!! <br>Try Again</span>";
    
            if(document.querySelector("#title").innerHTML != "AES Encrypt with SHA256 Key"){
                document.querySelector("#msg-input").value = message;
                setTimeout(function(){ 
                    document.getElementById("title").innerHTML = "Encrypt Plain Text <br>with AES" }, 1500)
            }
        }
    
        document.querySelector("#pass-input").value = ""; }, 50)
    }
     else{
            alert("Key can't be empty");
        }  
         }
         else{
        alert("Secret message can't be empty!!!");
    }
              
    
}

