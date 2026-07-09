const searchInput=document.querySelector(".search input");
const rows=document.querySelectorAll("tbody tr");
const newSale=document.getElementById("newSale");

searchInput.addEventListener("keyup",()=>{

    const value=searchInput.value.toLowerCase();

    rows.forEach(row=>{

        const text=row.innerText.toLowerCase();

        row.style.display=text.includes(value)?"table-row":"none";

    });

});

newSale.addEventListener("click",()=>{

    alert("New Sale Module Coming Soon");

});

rows.forEach(row=>{

    row.addEventListener("mouseenter",()=>{

        row.style.transform="scale(1.01)";

    });

    row.addEventListener("mouseleave",()=>{

        row.style.transform="scale(1)";

    });

});

document.querySelectorAll("tbody tr").forEach(row=>{

    row.addEventListener("click",()=>{

        const invoice=row.children[0].innerText;

        alert("Invoice : "+invoice);

    });

});