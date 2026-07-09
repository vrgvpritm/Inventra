const searchInput=document.querySelector(".search input");
const rows=document.querySelectorAll("tbody tr");
const filter=document.querySelector("select");
const addButton=document.getElementById("addProduct");

searchInput.addEventListener("keyup",()=>{

    const value=searchInput.value.toLowerCase();

    rows.forEach(row=>{

        const text=row.innerText.toLowerCase();

        row.style.display=text.includes(value)?"table-row":"none";

    });

});

filter.addEventListener("change",()=>{

    const category=filter.value;

    rows.forEach(row=>{

        const productCategory=row.children[3].innerText;

        if(category==="All Categories"){
            row.style.display="table-row";
        }

        else if(productCategory===category){
            row.style.display="table-row";
        }

        else{
            row.style.display="none";
        }

    });

});

addButton.addEventListener("click",()=>{

    alert("Add Product Module Coming Soon");

});

document.querySelectorAll("tbody button:first-child").forEach(button=>{

    button.addEventListener("click",()=>{

        alert("Edit Product");

    });

});

document.querySelectorAll("tbody button:last-child").forEach(button=>{

    button.addEventListener("click",()=>{

        if(confirm("Delete this product?")){

            button.closest("tr").remove();

        }

    });

});

rows.forEach(row=>{

    row.addEventListener("mouseenter",()=>{

        row.style.transform="scale(1.01)";

    });

    row.addEventListener("mouseleave",()=>{

        row.style.transform="scale(1)";

    });

});