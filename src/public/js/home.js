const socket = io();

console.log(socket);

socket.on("productsList",data=>{
    const p = document.getElementById("products");
    console.log(data);
    let messages = "";
    data.forEach(logItem=>{
        messages += `nombre :  ${logItem.title} - codigo :  ${logItem.code} - precio : ${logItem.price}$ - descripcion :  ${logItem.description} <br/>`
    })
    p.innerHTML = messages;
})


