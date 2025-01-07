let contenido = document.getElementById('contenido');

fetch("https://randomuser.me/api")
.then(res => {
    if(res.ok) {
        return res.json();
    } else {
        throw new Error(res.status);
    }
})
.then(data => {
    console.log(data.results[0]);
    /*
    foto, nombre, apellido, email, dirección, estado
    */
    contenido.innerHTML = `
        <img src="${data.results[0].picture.large}"/>
        <p>Nombre: ${data.results[0].name.first}</p>
        <p>Apellido: ${data.results[0].name.last}</p>
        <p>Email: ${data.results[0].email}</p>
        <p>Dirección: ${data.results[0].location.street.name} - ${data.results[0].location.street.number}</p>
        <p>Estado: ${data.results[0].location.state}</p>
    `;
})
.catch(error => {
    alert(error);
})