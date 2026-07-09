const saveButton=document.getElementById("saveSettings");
const cards=document.querySelectorAll(".card");
const inputs=document.querySelectorAll("input,select");

saveButton.addEventListener("click",()=>{

    alert("Settings Saved Successfully");

});

cards.forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform="translateY(-6px)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="translateY(0)";

    });

});

inputs.forEach(input=>{

    input.addEventListener("focus",()=>{

        input.style.borderColor="#2563eb";

    });

    input.addEventListener("blur",()=>{

        input.style.borderColor="#dbe4f0";

    });

});