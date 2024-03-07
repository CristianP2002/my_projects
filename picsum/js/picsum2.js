(function(){
    document.getElementById("aceptar").addEventListener("click", cargardatos);

    function cargardatos(){
        const escalaGrises = document.getElementById("escalaGrises").checked; //checkbox
        const blur = document.getElementById("blur").value; //select
        const pagina = document.getElementById("pagina").value;  //select
        const cantidad = document.getElementById("cantidad").value; // text


        let urlFinal = `https://picsum.photos/v2/list?`;
        if(pagina > 0 && cantidad > 0 && cantidad < 100){
            urlFinal += `page=${pagina}&limit=${cantidad}`;
            renderFotos(urlFinal);
        }else{
            alert("Seleccione correctamente la página y la cantidad")
        }
    }

    function renderFotos(url){
        fetch(`${url}`)
        .then(resp => {
            if(resp.ok && resp.status==200){
                return resp.json();
            }
        })
        .then(data => {
            let contenidoDiv = document.getElementById("contenido");
            contenidoDiv.innerHTML = "";

            const escalaGrises = document.getElementById("escalaGrises").checked; 
            const blur = document.getElementById("blur").value; 
            let urlFoto = "";
            if (escalaGrises) {
                urlFoto += `grayscale`;
            }
            if (blur > 0) {
                urlFoto += `&blur=${blur}`;
            }

            for(let item of data){
                contenidoDiv.innerHTML += `<div class="card" style="width: 18rem;">
                <div class="card-body" text-align="center">
                    <img src="${item.download_url}?${urlFoto}" width="250px"><br><br>
                    <h5 class="card-subtitle mb-2 text-muted">ID: ${item.id}</h5>
                    <h6>Autor: ${item.author}</h6>
                    <a href="${item.url}" class="card-link" target="_blank">URL:<br>${item.url}</a>
                </div>
            </div>`;
            }
        })
        .catch(error => {
            console.log(`error en API ${error}`)
        })
    }


    const url = "https://picsum.photos/v2/list";
    
})()