const ORDER_ASC = "asc";
const ORDER_DESC = "desc";
var listaProductos = [];
var listaProductosFiltrados = [];


// ordeno los prodcutos ascendiente o descendiente
function sortProductos(criterio, productosFiltrados){
    let resultado = [];
    if (criterio === ORDER_ASC){
        resultado = productosFiltrados.sort(function(a, b) {
            let aPrecio = parseInt(a.cost);
            let bPrecio = parseInt(b.cost);

            if ( aPrecio < bPrecio ){ return -1; }
            if ( aPrecio > bPrecio ){ return 1; }
            return 0;
        });
    }else if (criterio === ORDER_DESC){
        resultado = productosFiltrados.sort(function(a, b) {
            let aPrecio = parseInt(a.cost);
            let bPrecio = parseInt(b.cost);
            if ( aPrecio > bPrecio ){ return -1; }
            if ( aPrecio < bPrecio ){ return 1; }
            return 0;
        });

   
}
return resultado;
}


// Devuelvo una lista de productos entre un rango de precios
function filtrarProductosPrecio(precioMinimo, precioMaximo,listaProductos){
    let resultado = [];
    let producto = "";
    if (precioMinimo > 0 && precioMaximo > 0)
    {
       for(let i = 0; i < listaProductos.length; i++){
           if(listaProductos[i].cost >= precioMinimo && listaProductos[i].cost <= precioMaximo){
               producto = listaProductos[i];
               resultado.push(producto);
           }
       }
    }

    return resultado;
}


// mustra la lista de productos
function showProductsList(listaProd){
   
  
    let htmlContentToAppend = "";
    for(let i = 0; i < listaProd.length; i++){
        let product = listaProd[i];

        htmlContentToAppend += `
        <a href="product-info.html?id=${i}" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name +`</h4>
                          </div>
                    <p class="mb-1">` + product.description + `</p>
                    <br>
                    <p class="mb-1">` + product.cost + `</p>
                </div>
            </div>
        </a>
        `

   document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
  
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            
            showProductsList(resultObj.data);
            listaProductos = resultObj.data;
        }
    });

    document.getElementById("btnFiltrar").addEventListener("click", function(){
        
        precioMin = document.getElementById("rangoMin").value;
        precioMax = document.getElementById("rangoMax").value;
        

        listaProductosFiltrados = filtrarProductosPrecio(parseInt(precioMin),parseInt(precioMax),listaProductos);
        showProductsList(listaProductosFiltrados);
    });

    document.getElementById("btnLimpiar").addEventListener("click", function(){
        document.getElementById("rangoMin").value = "";
        document.getElementById("rangoMax").value = "";

    
        showProductsList(listaProductos);
    });

    document.getElementById("btnAsc").addEventListener("click", function(){
        // boton para ordenar ascendiente
        showProductsList(sortProductos(ORDER_ASC,listaProductosFiltrados));
    });

    document.getElementById("btnDesc").addEventListener("click", function(){
        // boton para ordenar descendiente
        showProductsList(sortProductos(ORDER_DESC,listaProductosFiltrados));
    });

});

