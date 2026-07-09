const rows=document.querySelectorAll("tbody tr");
const cards=document.querySelectorAll(".card");

cards.forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform="translateY(-6px)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="translateY(0)";

    });

});

rows.forEach(row=>{

    row.addEventListener("mouseenter",()=>{

        row.style.background="#f8fafc";

    });

    row.addEventListener("mouseleave",()=>{

        row.style.background="transparent";

    });

});

let totalStock=0;
let lowStock=0;
let outOfStock=0;

rows.forEach(row=>{

    const stock=parseInt(row.children[2].innerText);
    const minimum=parseInt(row.children[3].innerText);

    totalStock+=stock;

    if(stock===0){

        outOfStock++;

    }

    else if(stock<=minimum){

        lowStock++;

    }

});

cards[0].querySelector("h2").innerText=totalStock;
cards[1].querySelector("h2").innerText=lowStock;
cards[2].querySelector("h2").innerText=outOfStock;