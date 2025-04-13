const readlineSync = require('readline-sync')
const fs = require('fs')

let catalogo = []
function guardarCatalogo() {
        fs.writeFileSync('catalogo.json', JSON.stringify(catalogo, null, 2))
    }
function mostrarMenu() {
    console.log(`
    --- Menú Principal ---
    1. Agregar libro
    2. Mostrar catálogo
    3. Buscar libro por título
    4. Eliminar libro
    5. Ver estadísticas
    6. Ordenar libros
    7. Editar libro
    8. Salir
    `)

    const opcion = readlineSync.question('Elija una opcion: ')

    switch (opcion) {
        case '1':
            agregarLibro()
            break;
        case '2':
            mostrarCatalogo()
            break;
        case '3':
            buscarLibro()
            break;
        case '4':
            eliminarLibro()
            break;
        case '5':
            verEstadisticas()
            break;
        case '6':
            ordenarLibros()
            break;
        case '7':
            editarLibro()
            break;
        case '8':
            console.log('Saliendo...')
            break;
        default:
            console.log('Opción no válida, por favor intente de nuevo.')
            mostrarMenu()
            break
    }

    
}

///1. Agregar libro
function agregarLibro(){
    const titulo = readlineSync.question('Ingrese el titulo del libro: ')
    const autor = readlineSync.question('Ingrese el autor del libro: ')
    let precio = parseFloat(readlineSync.question('Ingrese el precio del libro: '))
    if(precio <= 0){
        console.log('Precio inválido. Verifique el precio nuevamente.')
        return agregarLibro();
    }
    const anio = parseInt(readlineSync.question('Ingrese el anio de publicacion: '))

    catalogo.push({ titulo, autor, precio, anio })
    console.log('¡Libro agregado con éxito 📕!')
    guardarCatalogo();
    mostrarMenu();
}

///2. Mostrar catálogo
function mostrarCatalogo() {
    if (catalogo.length === 0) {
        console.log('No hay libros en el catalogo.')
    } else {
        for (let i = 0; i < catalogo.length; i++) {
            const libro = catalogo[i]
            console.log(`${i + 1}. Título: ${libro.titulo}, Autor: ${libro.autor}, Precio: $${libro.precio}, Año: ${libro.anio}`)
        }
    }
    mostrarMenu()
}

///3. Buscar libro por título
function buscarLibro() {
    const titulo = readlineSync.question('Ingrese el titulo del libro que desea buscar: ')
    const libro = catalogo.find(libro => libro.titulo.toLowerCase() === titulo.toLowerCase())
    if (libro) {
        console.log(`Título: ${libro.titulo}, Autor: ${libro.autor}, Precio: $${libro.precio}, Año: ${libro.anio}`)
    } else {
        console.log('Libro no encontrado.')
    }
    mostrarMenu()
}

///4. Eliminar libro
function eliminarLibro() {
    const titulo = readlineSync.question('Ingrese el titulo del libro que desea eliminar: ')
    const index = catalogo.find(libro => libro.titulo.toLowerCase() === titulo.toLowerCase())
    if (index !== -1) {
        catalogo.splice(index, 1)
        console.log('Libro eliminado correctamente.')
    } else {
        console.log('Libro no encontrado.')
    }
    mostrarMenu()
}

///5. Ver estadísticas
function verEstadisticas() {
    if (catalogo.length === 0) {
        console.log('No hay libros en el catálogo.')
    } else {
        const totalLibros = catalogo.length
        const precioPromedio = catalogo.reduce((total, libro) => total + libro.precio, 0) / totalLibros
        const libroMasAntiguo = catalogo.reduce((a, b) => a.anio < b.anio ? a : b)
        const libroMasCaro = catalogo.reduce((a, b) => a.precio > b.precio ? a : b)

        console.log(`Total de libros: ${totalLibros}`)
        console.log(`Precio promedio: $${precioPromedio.toFixed(2)}`)
        console.log(`Libro más antiguo: ${libroMasAntiguo.titulo} (${libroMasAntiguo.anio})`)
        console.log(`Libro más caro: ${libroMasCaro.titulo} ($${libroMasCaro.precio})`)
    }
    mostrarMenu();
}

///6. Ordenar libros
function ordenarLibros() {
    let decision = readlineSync.question('¿Como desea ordenar los libros? 1. Por precio 2. Por anio: ')

    if (decision === '1') {
        let orden = readlineSync.question('Ordenar por precio: 1. Ascendente 2. Descendente: ')
        if (orden === '1') {
            catalogo.sort((a, b) => a.precio - b.precio)
        } else if (orden === '2') {
            catalogo.sort((a, b) => b.precio - a.precio)
        }
    } else if (decision === '2') {
        let ordenanio = readlineSync.question('Ordenar por anio: 1. Ascendente 2. Descendente: ')
        if (ordenanio === '1') {
            catalogo.sort((a, b) => a.anio - b.anio)
        } else if (ordenanio === '2') {
            catalogo.sort((a, b) => b.anio - a.anio)
        }
    } else {
        console.log("Ingrese una opción valida.")
    }

    guardarCatalogo()
    mostrarCatalogo()
}

///7. Editar libro
function editarLibro() {
    const titulo = readlineSync.question('Ingrese el titulo del libro que desea editar: ')
    const libro = catalogo.find(libro => libro.titulo.toLowerCase() === titulo.toLowerCase())

    if (libro) {
        const nuevoTitulo = readlineSync.question('Ingrese el nuevo título: ')
        const nuevoAutor = readlineSync.question('Ingrese el nuevo autor: ')
        let nuevoPrecio = parseFloat(readlineSync.question('Ingrese el nuevo precio: '))
        let nuevoAnio = parseInt(readlineSync.question('Ingrese el nuevo año de publicación: '))
        
        libro.titulo = nuevoTitulo
        libro.autor = nuevoAutor
        libro.precio = nuevoPrecio
        libro.anio = nuevoAnio
        
        console.log("¡Libro editado correctamente!")
        guardarCatalogo()
    } else {
        console.log("Libro no encontrado.")
    }

    mostrarMenu()
}

function iniciar() {
    mostrarMenu()
}

iniciar()
