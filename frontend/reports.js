const downloadButton=document.getElementById("downloadReport");
const cards=document.querySelectorAll(".card");
const rows=document.querySelectorAll("tbody tr");

downloadButton.addEventListener("click",()=>{

    alert("Report Export Feature Coming Soon");

});

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

rows.forEach(row=>{

    row.addEventListener("click",()=>{

        const month=row.children[0].innerText;

        alert("Viewing "+month+" Report");

    });

});