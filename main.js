const contactlist = document.querySelector('.tbody');
const addContactForm  = document.querySelector('.add-contact-form');

const nombreValue = document.getElementById('nombre_value');
const telefonoValue = document.getElementById('telefono_value');
const emailValue = document.getElementById('email_value');
let btnSubmit = document.querySelector('.btn');

let output = ``;

const renderContacts = (contacts) => {
    let idx = 1;
    contacts.forEach(contact => {
        output += `
        <tr data-id="${contact.id}">
            <th class="tr-num">${idx}</th>
            <td class="tr-nombre">${contact.nombre}</td>
            <td class="tr-telefono">${contact.telefono}</td>
            <td class="tr-email">${contact.email}</td>
            <td > <a href="#" class="card-link" id="edit_contact">Editar</a></td>
            <td><a href="#" class="card-link" id="delete_contact">Eliminar</a></td>
        </tr>
        `;
        idx = idx + 1;
    });
    contactlist.innerHTML = output;
}
const vaciarControles = () => {
    nombreValue.value = "";
    telefonoValue.value = "";
    emailValue.value = "";

}

const url = "http://localhost:5000/contacto";

// Get - Leer los contactos
fetch(url)
    .then(res => res.json())
    .then(data => renderContacts(data))
    .then(() => vaciarControles())

contactlist.addEventListener('click', (e) => {
    let delButtonIsPressed = e.target.id == 'delete_contact';
    let editButtonIsPressed = e.target.id == 'edit_contact';

    let id = e.target.parentElement.parentElement.dataset.id;

    //DELETE
    if(delButtonIsPressed){
        fetch(`${url}/${id}`, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(() => alert('Un Contacto se ha eliminado'))
        .then(() => location.reload())
        .then(() => console.log('Contacto Eliminado'))
    }
    //     editar...
    if(editButtonIsPressed){
        const parent = e.target.parentElement.parentElement;
        let nombreContent = parent.querySelector('.tr-nombre').textContent;
        let telefonoContent = parent.querySelector('.tr-telefono').textContent;
        let emailContent = parent.querySelector('.tr-email').textContent;

        nombreValue.value = nombreContent;
        telefonoValue.value = telefonoContent;
        emailValue.value = emailContent;

        btnSubmit.innerText = "Editar Contacto";
       
    }  
    // UPDATE   // PUT
    btnSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        fetch(`${url}/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                nombre: nombreValue.value,
                telefono: telefonoValue.value,
                email: emailValue.value
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(res => res.json())
        .then(() => alert('Contacto Modificado'))
        .then(() => location.reload())
        .then(() => console.log('Contacto Modificado'))
    })  
})


// Crear - Insertar nuevo contacto   POST
addContactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if(nombreValue.value == "" || telefonoValue.value == "" || emailValue.value == "")
    {
        alert('Por favor llenar todos los datos');
    }else{
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                nombre: nombreValue.value,
                telefono: telefonoValue.value,
                email: emailValue.value
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(res => res.json())
        .then(() => alert('Agrego un nuevo Contacto'))
        .then(() => location.reload())
        .then(() => console.log('Un Contacto Agregado'))
    }
})

