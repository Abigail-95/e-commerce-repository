
var producto = {};

var todaLaUrl = document.URL;

// funcion para obtener el id desde la url
function obtenerId(){
    let url = "";
    url = todaLaUrl.charAt(todaLaUrl.length-1);  
    return url;  
}

function showImagesGallery(listaImagenes){

    let htmlContentToAppend = "";

    for(let i = 0; i < listaImagenes.length; i++){
        let imageSrc = listaImagenes[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("imagenesProducto").innerHTML = htmlContentToAppend;
    }

}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            
            producto = resultObj.data;

           

            let nombreCategoria  = document.getElementById("nombreCategoria");
            let nombreProducto  = document.getElementById("nombreProducto");
            let descripcion = document.getElementById("descripcionProducto");
            let tipoMoneda = document.getElementById("tipoMoneda");
            let precio = document.getElementById("precioProducto");
            let cantVentas = document.getElementById("cantVentas");
        
            nombreCategoria.innerHTML = producto.category;
            nombreProducto.innerHTML = producto.name;
            descripcion.innerHTML = producto.description;
            tipoMoneda.innerHTML = producto.currency;
            precio.innerHTML = producto.cost;
            cantVentas.innerHTML = producto.soldCount;

            //Muestro las imagenes en forma de galería
            showImagesGallery(producto.images);
            
        }
    });
});