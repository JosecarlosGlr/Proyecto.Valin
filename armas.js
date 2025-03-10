document.addEventListener("DOMContentLoaded", () => {
    const contenedorArmas = document.getElementById("contenedor-armas");
    const modalArma = document.getElementById("modalArma");
    const nombreArma = document.getElementById("nombreArma");
    const imagenArma = document.getElementById("imagenArma");
    const categoriaArma = document.getElementById("categoriaArma");
    const dañoArma = document.getElementById("dañoArma");
    const cerrarBtn = document.querySelector(".cerrar-btn");
    const barraBusqueda = document.getElementById("barraBusqueda");


    let datosArmas = [];


    // Obtener las armas desde la API
    fetch("https://valorant-api.com/v1/weapons")
        .then(respuesta => respuesta.json())
        .then(datos => {
            datosArmas = datos.data; 
            mostrarArmas(datosArmas); 
        })
        .catch(error => console.error("Error al obtener las armas:", error));


    // Función que muestra las armas en cajas
    function mostrarArmas(armas) {
        contenedorArmas.innerHTML = ""; 


        armas.forEach(arma => {
            const cajaArma = document.createElement("div");
            cajaArma.classList.add("caja-arma");


            cajaArma.innerHTML = `
                <img src="${arma.displayIcon}" alt="${arma.displayName}">
                <h3>${arma.displayName}</h3>
            `;


            // Evento click para abrir el modal con detalles
            cajaArma.addEventListener("click", () => abrirModal(arma));


            contenedorArmas.appendChild(cajaArma);
        });
    }


    // Función para abrir el modal con la información del arma seleccionada
    function abrirModal(arma) {
        nombreArma.textContent = arma.displayName;
        imagenArma.src = arma.displayIcon;
        categoriaArma.textContent = `Categoría: ${arma.shopData ? arma.shopData.category : "No disponible"}`;
       
        // Obtener el daño si está disponible
        if (arma.weaponStats && arma.weaponStats.damageRanges.length > 0) {
            let daño = arma.weaponStats.damageRanges[0];
            dañoArma.textContent = `Daño: ${daño.headDamage} (cabeza), ${daño.bodyDamage} (cuerpo), ${daño.legDamage} (piernas)`;
        } else {
            dañoArma.textContent = "No hay información de daño disponible.";
        }


        // Mostrar modal
        modalArma.style.display = "block";
    }


    // Cerrar modal cuando se haga clic en 'X'
    cerrarBtn.addEventListener("click", () => {
        modalArma.style.display = "none";
    });


    // Cerrar modal si se hace clic fuera de él
    window.addEventListener("click", (evento) => {
        if (evento.target === modalArma) {
            modalArma.style.display = "none";
        }
    });


    // Filtrar armas por nombre
    function filtrarArmas() {
        const terminoBusqueda = barraBusqueda.value.toLowerCase();
        const armasFiltradas = datosArmas.filter(arma =>
            arma.displayName.toLowerCase().includes(terminoBusqueda)
        );
        mostrarArmas(armasFiltradas);
    }


    // Evento de búsqueda en tiempo real
    barraBusqueda.addEventListener("input", filtrarArmas);
});
