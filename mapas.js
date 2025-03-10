document.addEventListener("DOMContentLoaded", () => {
    const contenedorMapas = document.getElementById("contenedorMapas");
    const modalMapa = document.getElementById("modalMapa");
    const nombreMapa = document.getElementById("nombreMapa");
    const imagenMapa = document.getElementById("imagenMapa");
    const descripcionMapa = document.getElementById("descripcionMapa");
    const cerrarBtn = document.querySelector(".cerrar-btn");
    const barraBusqueda = document.getElementById("barraBusqueda");


    let datosMapas = [];


    // Mapas a excluir
    const mapasExcluidos = ["The Range", "Basic Training"];


    // Obtener los mapas desde la API
    fetch("https://valorant-api.com/v1/maps")
        .then(response => response.json())
        .then(data => {
            datosMapas = data.data; // Guardar los datos de los mapas
            mostrarMapas(datosMapas); // Mostrar los mapas en la página
        })
        .catch(error => console.error("Error al obtener los mapas:", error));


    // Función para mostrar los mapas en la página
    function mostrarMapas(mapas) {
        contenedorMapas.innerHTML = ""; // Limpiar el contenedor


        // Filtrar mapas excluidos
        const mapasFiltrados = mapas.filter(mapa => !mapasExcluidos.includes(mapa.displayName));


        mapasFiltrados.forEach(mapa => {
            const tarjetaMapa = document.createElement("div");
            tarjetaMapa.classList.add("mapa");


            // Usamos la imagen splash por defecto en las tarjetas
            const imagen = mapa.splash || "default-image-url.jpg"; // Usa la imagen splash si está disponible


            tarjetaMapa.innerHTML = `
                <img src="${imagen}" alt="${mapa.displayName}" class="imagen-mapa">
                <h3>${mapa.displayName}</h3>
            `;


            // Agregar el evento click para abrir el modal
            tarjetaMapa.addEventListener("click", () => abrirModal(mapa));


            contenedorMapas.appendChild(tarjetaMapa);
        });
    }


    // Función para abrir el modal con la información del mapa
    function abrirModal(mapa) {
        nombreMapa.textContent = mapa.displayName;


        // Mostrar la imagen displayIcon en el modal
        imagenMapa.src = mapa.displayIcon; // Usamos displayIcon en el modal


        descripcionMapa.textContent = mapa.description;


        // Mostrar el modal
        modalMapa.style.display = "block";
    }


    // Cerrar el modal cuando se hace clic en la 'X'
    cerrarBtn.addEventListener("click", () => {
        modalMapa.style.display = "none";
    });


    // Cerrar el modal si se hace clic fuera del contenido del modal
    window.addEventListener("click", (event) => {
        if (event.target === modalMapa) {
            modalMapa.style.display = "none";
        }
    });


    // Función para filtrar mapas
    function filtrarMapas() {
        const terminoBusqueda = barraBusqueda.value.toLowerCase();


        const mapasFiltrados = datosMapas.filter(mapa => {
            return mapa.displayName.toLowerCase().includes(terminoBusqueda) && !mapasExcluidos.includes(mapa.displayName);
        });


        mostrarMapas(mapasFiltrados); // Mostrar los mapas filtrados
    }


    // Filtrar cuando el usuario escribe en la barra de búsqueda
    barraBusqueda.addEventListener("input", filtrarMapas);
});