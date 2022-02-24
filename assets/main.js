/**
 * @fileoverview Interactividad Selector de imágenes
 * @version 0.1
 * @author Juanjo Alonso Sánchez <jj.alonso@esla.com>
 * @copyright cgb@esla.com
 */
/**
  * Crea el nodo de la imagen seleccionada
  * @param {Response} imageResponse Imagen seleccionada
  * @param {string} fileName Nombre de la imagen seleccionada
  * @returns {void}
  */
 function crearImagen(imageResponse, fileName) {                
    //Creamos el nodo de la imagen
    let div = document.createElement('div');
    div.classList.add('selector__imagen-container'); 
    let img = document.createElement('img');
    img.classList.add('selector__imagen');
    img.setAttribute('src', imageResponse.url);
    img.setAttribute('alt', fileName);
    img.setAttribute('title', fileName);
    div.append(img);
    //Pintamos la imagen
    contenedorImagenes.appendChild(div);
}
const imageUpload = document.querySelector("#selector__input");
const contenedorImagenes = document.querySelector(".selector__galeria");
//Subir imagenes
imageUpload.addEventListener("change", async (event) =>{
    let images = event.target.files;
    let type = '';
    let fileName = '';
    try {
        for (let image of images){
            type = image.type.split("/")[1];
            fileName = image.name.split("/")[0];
            //Solamente mostramos los archivos que sean imágenes
            if (type ==='jpeg' || type ==='png' || type ==='gif'){
                const imageURL = await fetch(URL.createObjectURL(image));
                crearImagen(imageURL, fileName);
            }
        }
    } catch (error) {
        console.log(error);
    }
});
//Desaturar imágenes
contenedorImagenes.addEventListener("mouseover", (event) =>{      
    if(event.target.classList.contains('selector__imagen')){
        for (let imagen of contenedorImagenes.children) {
            imagen.classList.add("selector__imagen-container--desaturar");
        }
    }
});
contenedorImagenes.addEventListener("mouseout", (event) =>{
    if(event.target.classList.contains('selector__imagen')){
        for (let imagen of contenedorImagenes.children) {
            imagen.classList.remove("selector__imagen-container--desaturar");
        }
    }
});