document.addEventListener('DOMContentLoaded',leerApi);
const urlApi="http://localhost:3000/aprendices/";

function leerApi()
{
    let tabla=document.querySelector('#cuerpoTablaEstudiantes');
    fetch(urlApi)
    .then((res)=>res.json())
    .then((res)=>
        {
            res.forEach(estudiantes => {
                //Creación de los botones editar y eliminar para cada fila(estudiante)
                let btnEditar=document.createElement('button');
                btnEditar.style.background="#ffc107";
                btnEditar.setAttribute("data-id",`${estudiantes.id}`);
                btnEditar.setAttribute("data-nombre",`${estudiantes.nombre}`);
                btnEditar.setAttribute("data-apellido",`${estudiantes.apellido}`);
                btnEditar.setAttribute("data-matricula",`${estudiantes.matricula}`);
                btnEditar.setAttribute("data-correo",`${estudiantes.email}`);
                btnEditar.setAttribute('class',"btn");
                btnEditar.appendChild(document.createTextNode("Editar"));

                let btnEliminar=document.createElement('button');
                btnEliminar.style.background="#dc3545";
                btnEliminar.style.color="white";
                btnEliminar.setAttribute("data-id",`${estudiantes.id}`);
                btnEliminar.setAttribute('class',"btn btnEliminar");
                btnEliminar.appendChild(document.createTextNode("Eliminar"));


                //filas y columnas para la tabla
                let rowTable=document.createElement('tr');
                let cell1=document.createElement('td');
                let cell2=document.createElement('td');
                let cell3=document.createElement('td');
                let cell4=document.createElement('td');
                let cell5=document.createElement('td');
                //creación del texto a insertar en cada celda (datos del estudiante)
                let idEstudiante=document.createTextNode(estudiantes.id);
                let nombreEstudiante=document.createTextNode(estudiantes.nombre);
                let apellidoEstudiante=document.createTextNode(estudiantes.apellido);
                let matricula;
                if(estudiantes.matricula==="true")
                    {
                         matricula=document.createTextNode("Activa");
                    }
                    else
                    {
                        matricula=document.createTextNode("Inactiva");
                    }
                
                let correoEstudiante=document.createTextNode(estudiantes.email);
                //Se agregan los nodos de texto a las celdas

                cell1.appendChild(idEstudiante);
                cell2.appendChild(nombreEstudiante);
                cell3.appendChild(apellidoEstudiante);
                cell4.appendChild(matricula);
                cell5.appendChild(correoEstudiante);

                rowTable.appendChild(cell1);
                rowTable.appendChild(cell2);
                rowTable.appendChild(cell3);
                rowTable.appendChild(cell4);
                rowTable.appendChild(cell5);
                rowTable.appendChild(btnEditar);
                rowTable.appendChild(btnEliminar);

                tabla.appendChild(rowTable);
                
                btnEditar.addEventListener('click',()=>formularioEdicionEstudiante(btnEditar.dataset.id,
                    btnEditar.dataset.nombre,btnEditar.dataset.apellido,
                    btnEditar.dataset.matricula,btnEditar.dataset.correo));

                btnEliminar.addEventListener('click',()=>eliminarEstudiante(btnEliminar.dataset.id))
                
            });

        })
}

let formulario=document.querySelector('#formularioCrud');

formulario.addEventListener('submit',agregarEstudiante)

function agregarEstudiante(e)
{

    e.preventDefault();
    let id=document.querySelector('#id').value;
    fetch(urlApi+`${id}`)
    .then((res)=>
        {
            console.log(res);
            if(res.ok===true)
                {
                    alert("Este usuario ya existe");
                    document.querySelector('#id').value="";
                    document.querySelector('#nombre').value="";
                    document.querySelector('#apellido').value="";
                    document.querySelector('#matricula').value="";
                    document.querySelector('#correo').value="";
                }
                else
                {
                    let nombre=document.querySelector('#nombre').value;
                    let apellido=document.querySelector('#apellido').value;
                    let matricula=document.querySelector('#matricula').value;
                    let correo=document.querySelector('#correo').value;
    
                    let estudiante=
                    {
                        id:`${id}`,
                        nombre:`${nombre}`,
                        apellido:`${apellido}`,
                        matricula:`${matricula}`,
                        email:`${correo}`,
                    };
                    let datos=JSON.stringify(estudiante);
                    fetch(urlApi,
                        {
                            method:"POST",
                            headers:
                            {
                                "Content-Type":"application/json"
                            },
                            body:datos
                        })
                        .then((res) => res.json())
                        .then((res) => {
    
                            leerApi
                        window.location.reload();  
                        })
                        document.querySelector('#id').value="";
                        document.querySelector('#nombre').value="";
                        document.querySelector('#apellido').value="";
                        document.querySelector('#matricula').value="";
                        document.querySelector('#correo').value="";
        
                }
        })
    
    
}

let btnCancelar=document.querySelector('#btnCancelar');
btnCancelar.addEventListener('click',cancelar);

function cancelar()
{
    document.querySelector('#id').value="";
    document.querySelector('#nombre').value="";
    document.querySelector('#apellido').value="";
    document.querySelector('#matricula').value="";
    document.querySelector('#correo').value="";

}

const options = {
    keyboard: false,
    backdrop: 'static'
  };

const modalEditar = new bootstrap.Modal(document.querySelector('#modalEditar'),options)
 function formularioEdicionEstudiante(id,nombre,apellido,matricula,correo)
{
    modalEditar.show();
    document.querySelector('#editarId').value=id;
    document.querySelector('#editarNombre').value=nombre;
    document.querySelector('#editarApellido').value=apellido;
    document.querySelector('#editarMatricula').value=matricula;
    document.querySelector('#editarCorreo').value=correo;

    document.querySelector('#formularioEditar').addEventListener('submit',(e)=>{
        e.preventDefault();
        enviarEdicion(id);
        
    })
} 

function enviarEdicion(id)
{
    let idActualizado=document.querySelector('#editarId').value;
    let nombreActualizado=document.querySelector('#editarNombre').value;
    let apellidoActualizado=document.querySelector('#editarApellido').value;
    let matriculaActualizada=document.querySelector('#editarMatricula').value;
    let correoActualizado=document.querySelector('#editarCorreo').value;
    let estudianteActualizado={
        id: `${idActualizado}`,
        nombre: `${nombreActualizado}`,
        apellido: `${apellidoActualizado}`,
        matricula: `${matriculaActualizada}`,
        email: `${correoActualizado}`
    }
    fetch(urlApi + `${id}`,{
        method: 'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(estudianteActualizado)
    })
    .then(res=>res.json())
    .then(res=>{
        alert("Actualizado con éxito")
        modalEditar.hide();
        window.location.reload()
    })
    
}

let btnCancelar2=document.querySelector('#btnCancelar2');

function eliminarEstudiante(id)
{
    fetch(urlApi + `${id}`,{
        method: 'DELETE',
    })
    .then(res=>{
        if(!res.ok){
            alert("No se pudo eliminar");
        }
        else
        {
            alert("Eliminado con éxito");
            window.location.reload();
        }
    })
    
}