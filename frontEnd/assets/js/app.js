document.addEventListener('DOMContentLoaded',leerApi);
const urlApi="http://localhost:3000/aprendices";
function leerApi()
{
    fetch(urlApi)
    .then(res=>res.json())
    .then(res=>
        {
            console.log(res);
        })
}