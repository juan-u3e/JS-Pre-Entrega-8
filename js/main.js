const miembrosIniciales = [
  { nombre: "Carlos", edad: 34, disciplina: "Musculacion", entrenamiento: "Dos dias a la semana", categoria: "Mayor de edad" },
  { nombre: "Jorge", edad: 28, disciplina: "Crossfit", entrenamiento: "Tres dias a la semana", categoria: "Mayor de edad" },
  { nombre: "Jimena", edad: 31, disciplina: "Crossfit", entrenamiento: "Cinco dias a la semana", categoria: "Mayor de edad" },
  { nombre: "Yamila", edad: 25, disciplina: "Boxeo", entrenamiento: "Tres dias a la semana", categoria: "Mayor de edad" },
  { nombre: "Roman", edad: 21, disciplina: "Musculacion", entrenamiento: "Cinco dias a la semana", categoria: "Mayor de edad" },
  { nombre: "Mateo", edad: 45, disciplina: "Boxeo", entrenamiento: "Dos dias a la semana", categoria: "Mayor de edad"  }
];

const miembrosGuardados = JSON.parse(localStorage.getItem("miembros"));

let miembros = miembrosGuardados || miembrosIniciales;
if (!miembrosGuardados) {
  localStorage.setItem("miembros", JSON.stringify(miembros));
}

const container = document.getElementById("container");
const formulario = document.getElementById("form");

function crearCard(miembro) {
        const {nombre, edad, disciplina, entrenamiento, categoria} = miembro
        const card = document.createElement("div");
        card.className = "card";
        

       card.innerHTML =
                        `<p>Nombre: ${nombre}</p>
                         <p>Edad: ${edad}</p>
                         <p>Disciplina: ${disciplina}</p>
                         <p>Entrenamiento: ${entrenamiento}</p>
                         <p>Categoria: ${categoria}</p>`;
    

        const boton = document.createElement("button")
        boton.className = "boton"
        boton.innerText = `Eliminar`;
        boton.addEventListener("click", () =>{ 
             card.remove()
             miembros = miembros.filter((m) => m.nombre !== miembro.nombre);
             localStorage.setItem("miembros", JSON.stringify(miembros));
             alert("Eliminaste un miembro")
        })
        card.appendChild(boton)
        container.appendChild(card);  
}

miembros.forEach(m => crearCard(m));

class NuevoMiembro {
  constructor( nombre, edad, disciplina, entrenamiento, categoria ) {
    this.nombre = nombre;
    this.edad = edad;
    this.disciplina = disciplina;
    this.entrenamiento = entrenamiento
    this.categoria = edad >= 18 ? "Mayor de edad" : "Menor de edad";
  }
}

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = e.target.nombre.value;
    const edad = e.target.edad.value;
    const disciplina = e.target.disciplinas.value;
    const entrenamiento = e.target.dias.value;
    const miembroNuevo = new NuevoMiembro(nombre, edad, disciplina, entrenamiento);


    miembros = [...miembros, miembroNuevo];
    localStorage.setItem("miembros", JSON.stringify(miembros));
    crearCard(miembroNuevo);
    alert("Creaste un nuevo miembro")
});

formfiltracion.addEventListener("submit", (e) => {
    e.preventDefault();
    const valorElegido = e.target.disciplina.value;
    const filtro = miembros.filter((miembro)=>miembro.disciplina===valorElegido)
    container.innerHTML = "";
    filtro.forEach((miembro) => crearCard(miembro));
}    
)

