const login = document.getElementById('inicio');//traigo los campos que voy a utilizar
const email = document.getElementById('campo-email');
const password = document.getElementById('campo-password');
const contenedor = document.getElementsByTagName('label');
let usuariosEnLocal = JSON.parse(localStorage.getItem('usuarios'))
let todosLosUsuarios=[];

var validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

login.addEventListener('click', () => {
	console.log('hola')
	if (password.value == "" ||  email.value == ""	|| !validEmail.test(email.value)){//Creo un condicional donde se va a cumplir tanto si el campo del email o la contraseña estan vacios
	
		let emailAlert = document.createElement('p');//creo una etiqueta p y la almaceno en una variable para el email
		emailAlert.innerText = "Ingresa un e-mail valido";//le doy el conenido a esa etiqueta
		emailAlert.style.color = 'red';//le doy un color

		let passAlert = document.createElement('p');//creo una etiqueta p y la almaceno en una variable para la contraseña
		passAlert.innerText = "Ingresa tu contraseña";//repito el mismo procedimiento
		passAlert.style.color = 'red';

		if (contenedor[0].getElementsByTagName('p').length == "" && email.value == "") {//si en la primera posicin del label no hay nada y ademas el valor del email esta vacio
			contenedor[0].appendChild(emailAlert);//entonces agregar la alerta de email
			email.style.border = "solid 1px red";
			moverCampoEmail()
		}
		if (contenedor[1].getElementsByTagName('p').length == "" && password.value == "") {
			contenedor[1].appendChild(passAlert);//lo mismo para la contraseña
			password.style.border = "solid 1px red";
			moverCampoPassword()
		}
		email.addEventListener("keypress", () => {//si presiono una tecla en ese contenedor se me va a remover la alerta
			contenedor[0].removeChild(emailAlert);
			email.style.border = "solid 1px #0088f7";
		})
		password.addEventListener("keypress", () => {//lo mismo par la contraseña
			contenedor[1].removeChild(passAlert);
			password.style.border = "solid 1px #0088f7";
		})
		

		if(email.value!=validEmail.test(email.value) && email.value != ""){
	
			contenedor[0].appendChild(emailAlert);//entonces agregar la alerta de email
			email.style.border = "solid 1px red";
			moverCampoEmail()
			
		}
	}

	else {// si la condicion no se cumple entonces envio el dato del email al almacenamiento local y redirijo a la pagina principal
		
		console.log('correcto')
		if(localStorage.getItem('usuarios')==null){
		   localStorage.setItem('usuarios','[]');
		}

		let usuariosEnLocal = JSON.parse(localStorage.getItem('usuarios'))

		let usuario = email.value

		 usuario = {
			"nombreUsuario": email.value,
			"infoPerfil": "",
            "enCarrito": "",
		}

          if(usuariosEnLocal.some(usuario=>usuario.nombreUsuario === email.value)){
			localStorage.setItem("usuarioActivo",JSON.stringify(email.value))
			window.location.href= "index.html";
		  }else{

			usuariosEnLocal.push(usuario)
			localStorage.setItem("usuarioActivo",JSON.stringify(email.value))
			localStorage.setItem("usuarios",JSON.stringify(usuariosEnLocal));
            window.location.href= "index.html";
		  }
		
	}
});


function moverCampoEmail() {
	document.getElementById('campo-email').id="moverEmailAlert"
}

function moverCampoPassword() {
	document.getElementById('campo-password').id="moverPasswordAlert"
}
