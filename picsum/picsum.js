(function(){
    const url = 'https://picsum.photos/v2';
    fetch(`${url}/list`) //llamado al API externo
    .then(resp => { //obtengo la respuesta en el primer then
        if(resp.ok && resp.status ==200){
            return resp.json(); // se convierte los datos en formato json
        }
    })
    .then(data => {
        console.log(data);
        for(let item of data){ // ciclo para recorrer los datos;
            document.getElementById("contenido").innerHTML += 
            `<div class="card" style="width: 18rem;">
                <div class="card-body" text-align="center">
                    <img src="${item.download_url}" width="250px"><br><br>
                    <h5 class="card-subtitle mb-2 text-muted">ID: ${item.id}</h5>
                    <h6>Autor: ${item.author}</h6>
                    <a href="${item.url}" class="card-link" target="_blank">URL:<br>${item.url}</a>
                </div>
            </div>`
        }
    })

    .catch(resp => console.log("Error en el llamado del API"))
})()
