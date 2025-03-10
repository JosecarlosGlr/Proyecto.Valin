document.addEventListener("DOMContentLoaded", () => {
    const contenedorAgentes = document.getElementById("contenedor-agentes");
    const modalAgente = document.getElementById("modalAgente");
    const nombreAgente = document.getElementById("nombreAgente");
    const imagenAgente = document.getElementById("imagenAgente");
    const descripcionAgente = document.getElementById("descripcionAgente");
    const listaHabilidades = document.getElementById("listaHabilidades");
    const botonCerrar = document.querySelector(".cerrar-btn");
    const barraBusqueda = document.getElementById("barraBusqueda");
    const selectorRol = document.getElementById("selectorRol");


    let datosAgentes = [];


    // Obtener los agentes desde la API
    fetch("https://valorant-api.com/v1/agents?isPlayableCharacter=true")
        .then(response => response.json())
        .then(data => {
            datosAgentes = data.data; 
            mostrarAgentes(datosAgentes); 
        })
        .catch(error => console.error("Error al obtener los agentes:", error));


    // Función para mostrar los agentes en la página
    function mostrarAgentes(agentes) {
        contenedorAgentes.innerHTML = ""; 
        agentes.forEach(agente => {
            const tarjetaAgente = document.createElement("div");
            tarjetaAgente.classList.add("tarjeta-agente");


            tarjetaAgente.innerHTML = `
                <img src="${agente.displayIcon}" alt="${agente.displayName}">
                <h3>${agente.displayName}</h3>
            `;


            // Agregar el evento click para abrir el modal
            tarjetaAgente.addEventListener("click", () => abrirModal(agente));


            contenedorAgentes.appendChild(tarjetaAgente);
        });
    }


    // Función para abrir el modal con la información del agente
    function abrirModal(agente) {
        nombreAgente.textContent = agente.displayName;
        imagenAgente.src = agente.fullPortrait;
        descripcionAgente.textContent = agente.description;


        // Mostrar las habilidades del agente
        listaHabilidades.innerHTML = "";
        agente.abilities.forEach(habilidad => {
            const itemHabilidad = document.createElement("li");
            itemHabilidad.textContent = `${habilidad.displayName}: ${habilidad.description}`;
            listaHabilidades.appendChild(itemHabilidad);
        });


        // Mostrar el modal
        modalAgente.style.display = "block";
    }


    // Cerrar el modal cuando se hace clic en la 'X'
    botonCerrar.addEventListener("click", () => {
        modalAgente.style.display = "none";
    });


    // Cerrar el modal si se hace clic fuera del contenido del modal
    window.addEventListener("click", (event) => {
        if (event.target === modalAgente) {
            modalAgente.style.display = "none";
        }
    });


    // Función para filtrar agentes
    function filtrarAgentes() {
        const terminoBusqueda = barraBusqueda.value.toLowerCase();

        const rolSeleccionado = selectorRol.value;


        const agentesFiltrados = datosAgentes.filter(agente => {
            const coincideNombre = agente.displayName.toLowerCase().includes(terminoBusqueda);
            const coincideRol = rolSeleccionado ? agente.role.displayName === rolSeleccionado : true;
            return coincideNombre && coincideRol;
        });


        mostrarAgentes(agentesFiltrados); 
    }


    // Filtrar cuando el usuario escribe en la barra de búsqueda
    barraBusqueda.addEventListener("input", filtrarAgentes);


    // Filtrar cuando el usuario selecciona un rol
    selectorRol.addEventListener("change", filtrarAgentes);
});
