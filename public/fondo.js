
let ruta = 'http://localhost:3000/archivos/'
let imagenActual = ruta + 'casa_1.png'
let movimiento = 0

let dentroCasa = false;
let indiceCasa = 0;
let indiceEscenario = 0;
let casaSeleccionada = null;
let escenarioSeleccionado = null;
let objetoSeleccionado = null;

let cuerpoDocumento = document.body;
const text =document.getElementById("text")

let datos={}
let inventario = []
let ganancias = 0
const miBoton1 = document.getElementById('botonEntrar');
const miBoton2 = document.getElementById('botonSalir');
const descripcion = document.getElementById('descripcion');
const divDescripcion = document.getElementById('divDescripcion')
const contInventario = document.getElementById('contInventario')
const divInventario = document.getElementById('divInventario')
const dejarObjButton = document.getElementById('dejarObjButton')
const gananciasTxt = document.getElementById('ganancias')
init()

async function cambiarImagen(){
    await fetch('http://localhost:3000/info.json')
    .then(response => {
        return response.text();
      })
    .then(data =>{
        data = JSON.parse(data);
        let num_casas = data.length;
        if (!dentroCasa){
            indiceCasa = (indiceCasa+1 + movimiento*(num_casas-2)) % num_casas;
            casaSeleccionada = data[indiceCasa]
            imagenActual = ruta + casaSeleccionada.ruta_imagen
            text.innerHTML = casaSeleccionada.descripcion
        }
        else{
            indiceEscenario = (indiceEscenario+1+ movimiento*(casaSeleccionada.escenarios.length-2)) % casaSeleccionada.escenarios.length;
            escenarioSeleccionado = casaSeleccionada.escenarios[indiceEscenario]
            imagenActual = ruta + escenarioSeleccionado.ruta_imagen
            text.innerHTML = escenarioSeleccionado.descripcion
        } 
    })
    
    cuerpoDocumento.style.backgroundImage = "url('" + imagenActual + "')";
    }


async function init(){
    await fetch('http://localhost:3000/info.json')
    .then(response => {
        return response.text();
      })
    .then(data =>{
        data = JSON.parse(data);
        casaSeleccionada = data[0]
        for (let casa of data){
            for (let escenario of casa.escenarios){
                for (let objeto of escenario.objetos){
                    let image = document.createElement('img')
                    image.id = objeto.id
                    image.src =ruta + objeto.ruta_imagen
                    image.classList.add('myImage');
                    image.style.left = `${objeto.pos[0]}px`
                    image.style.top = `${objeto.pos[1]}px`
                    image.style.display = 'none'
                    image.addEventListener('mouseenter', ()=>{text.innerHTML=objeto.descripcion})
                    image.addEventListener('mouseleave', ()=>{
                        if (!dentroCasa){text.innerHTML=casaSeleccionada.descripcion}  
                        else{text.innerHTML=escenarioSeleccionado.descripcion}
                    })
                    image.addEventListener('click',() => {mostrar_descripcion(objeto)})
                    document.getElementById('body').appendChild(image)
                }
            }
        }
    })
}
async function entrar_casa(){
    miBoton2.style.display='inline-block'
    miBoton1.style.display='none'
    dentroCasa = true;
    movimiento = 0
    indiceEscenario = -1    
    await cambiarImagen()
    mostrar_objetos()
}

async function salir_casa(){
    miBoton1.style.display='inline-block'
    miBoton2.style.display='none'
    dentroCasa = false;
    movimiento = 0
    indiceEscenario = 0;
    indiceCasa -=1
    await cambiarImagen()
    ocultar_objetos()

}
async function mover_derecha(){
    ocultar_objetos()
    movimiento=0
    await cambiarImagen()
    mostrar_objetos()
}

async function mover_izquierda(){
    ocultar_objetos()
    movimiento=1
    await cambiarImagen()
    mostrar_objetos()
}

function mostrar_descripcion(obj){
    objetoSeleccionado = obj
    divDescripcion.style.display = 'inline-block'
    descripcion.innerHTML = `Descripcion
    <br><br>${obj.descripcion}
    <br><br>Nombre: ${obj.nombre}
    <br><br>Precio: $${obj.precio}
    `
}

function cerrar_descripcion(){
    divDescripcion.style.display = 'none'
}

function tomar_objeto(){
    cerrar_descripcion()
    inventario.push(objetoSeleccionado)
    ganancias += objetoSeleccionado.precio
    ganancias = Math.round(ganancias*10)/10
    gananciasTxt.innerHTML = "Ganancias: $" + ganancias 
    document.getElementById(objetoSeleccionado.id).style.display = 'none'
}

function clear_inventario(){
    divInventario.innerHTML=''
}

function mostrar_inventario(){
    clear_inventario()
    dejarObjButton.disabled = true
    contInventario.style.display = 'inline-block'
    for (let objeto of inventario){
        let image = document.createElement('img')
        image.src =ruta + objeto.ruta_imagen
        image.id = objeto.id+'inv'
        image.classList.add('myImage2');
        image.addEventListener('click', () =>{
            objetoSeleccionado = objeto
            dejarObjButton.disabled = false
            for (let obj of inventario){
                let image = document.getElementById(obj.id+'inv')
                if (image.id == objeto.id+'inv'){image.style.border='1px solid cyan'}
                else{image.style.border = 'none'}
            } 
        })
        divInventario.appendChild(image)
    }
}

function cerrar_inventario(){
    contInventario.style.display = 'none'
}

function dejar_obj(){
    ganancias -= objetoSeleccionado.precio
    ganancias = Math.round(ganancias*10)/10
    gananciasTxt.innerHTML = "Ganancias: $" + ganancias 
    let index = inventario.indexOf(objetoSeleccionado)
    inventario.splice(index,1)
    mostrar_inventario()
    if (objetoSeleccionado.escenario == escenarioSeleccionado.nombre && dentroCasa){
        document.getElementById(objetoSeleccionado.id).style.display = 'inline-block'
    }
}

function mostrar_objetos(){
    if (escenarioSeleccionado != null && dentroCasa){
        for (let objeto of escenarioSeleccionado.objetos){
            let image = document.getElementById(objeto.id)
            if (!inventario.some(function(obj){return obj.id == objeto.id})){image.style.display = 'inline-block'}  
        }   
    }
}

function ocultar_objetos(){
    if (escenarioSeleccionado != null || dentroCasa){
        for (let objeto of escenarioSeleccionado.objetos){
            let image = document.getElementById(objeto.id)
            image.style.display = 'none'
        }
    }
    
}

