const socket = io();

//seccion agregar

let inputName = document.getElementById("inputName");
let inputDescription = document.getElementById("inputDescription");
let inputStock = document.getElementById("inputStock");
let inputPrice = document.getElementById("inputPrice");
let inputCategory = document.getElementById("inputCategory");
let buttonAdd = document.getElementById("buttonAdd");

//seccion eliminar

let inputIdToDelete = document.getElementById("inputIdToDelete");
let buttonDelete = document.getElementById("buttonDelete");


buttonAdd.onclick = () => {
    const newProduct = {id:0, title:inputName.value, description:inputDescription.value, code:0, price:inputPrice.value, status:true, stock:inputStock.value, category:inputCategory.value, thumbnail:""}
    socket.emit("newProductToAdd", newProduct);
};

buttonDelete.onclick = () =>{
    var idDelete = inputIdToDelete.value;
    if(isNaN(idDelete)){
        return ("invalid Id");
    };
    socket.emit("idToDelete", idDelete);
    
};

socket.on("productsList",data=>{
    const p = document.getElementById("products");
    let messages = "";
    data.forEach(logItem=>{
        messages += `id : ${logItem.id} - nombre :  ${logItem.title} - stock : ${logItem.stock} - category : ${logItem.category} - codigo :  ${logItem.code} - precio : ${logItem.price}$ - descripcion :  ${logItem.description} <br/>`
    })
    p.innerHTML = messages;
});



