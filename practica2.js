const BASE_URL = 'https://reqres.in/api/users/';
const POSTMAN_URL = 'https://httpbin.org/post';

//Código principal dentro del evento load
// para asegurar la carga de los componentes
window.addEventListener('load', (ev) => {
  let numsecs = document.getElementById('numsecs');
  let user = document.getElementById('user');
  let boton = document.querySelector('button');

  boton.addEventListener('click', (ev) => {
    ev.preventDefault();
    clearFields();
    procesarFetch(numsecs.value, user.value);
  });
});

function clearFields() {
  document.querySelectorAll('span').forEach((element) => {
    element.innerHTML = '';
    console.log(element);
  });
}

function procesarFetch(numsecs, user) {
    estado = document.getElementById('status');
    id = document.getElementById('id');
    email = document.getElementById('email');
    nombre = document.getElementById('name');

    fetch(BASE_URL + user)
    .then(res => {
        if(res.ok) {
            return res.json();
        } else {
            throw 404;
        }
    })
    .then(data => {
        setTimeout(() => {
            console.log(data);
            id.innerHTML = data.data.id;
            email.innerHTML = data.data.email;
            estado.innerHTML = 200;

            return fetch(POSTMAN_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(data => {
                nombre.innerHTML = data.json.data['first_name'];
            })
        }, numsecs*1000);
    })
    .catch(error => {
        setTimeout(() => {
            estado.innerHTML = error;
        }, numsecs*1000);
    })
}