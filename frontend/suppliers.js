const searchInput=document.querySelector(".search input");
const rows=document.querySelectorAll("tbody tr");
const addSupplier=document.getElementById("addSupplier");

searchInput.addEventListener("keyup",()=>{

    const value=searchInput.value.toLowerCase();

    rows.forEach(row=>{

        const text=row.innerText.toLowerCase();

        row.style.display=text.includes(value)?"table-row":"none";

    });

});

document.querySelectorAll("tbody button:first-child").forEach(button=>{

    button.addEventListener("click",()=>{

        alert("Edit Supplier");

    });

});

document.querySelectorAll("tbody button:last-child").forEach(button=>{

    button.addEventListener("click",()=>{

        if(confirm("Delete this supplier?")){

            button.closest("tr").remove();

        }

    });

});

addSupplier.addEventListener("click",()=>{

    alert("Add Supplier Module Coming Soon");

});

rows.forEach(row=>{

    row.addEventListener("mouseenter",()=>{

        row.style.transform="scale(1.01)";

    });

    row.addEventListener("mouseleave",()=>{

        row.style.transform="scale(1)";

    });

});