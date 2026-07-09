const password=document.getElementById("password");
const togglePassword=document.getElementById("togglePassword");
const loginBtn=document.getElementById("loginBtn");
const form=document.querySelector("form");
const email=document.querySelector('input[type="email"]');

togglePassword.addEventListener("click",()=>{

    if(password.type==="password"){
        password.type="text";
        togglePassword.innerHTML='<i class="fa-solid fa-eye-slash"></i>';
    }

    else{
        password.type="password";
        togglePassword.innerHTML='<i class="fa-solid fa-eye"></i>';
    }

});

form.addEventListener("submit",(e)=>{

    e.preventDefault();

    if(email.value.trim()===""){
        email.focus();
        return;
    }

    if(password.value.trim()===""){
        password.focus();
        return;
    }

    loginBtn.disabled=true;

    loginBtn.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Signing In';

    setTimeout(()=>{

        window.location.href="dashboard.html";

    },1500);

});

document.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        form.requestSubmit();

    }

});