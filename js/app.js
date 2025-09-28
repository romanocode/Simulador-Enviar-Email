document.addEventListener('DOMContentLoaded', function(){

    const email = {
        email: '',
        asunto: '',
        mensaje:'',
    }
    
    //seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = formulario.querySelector('button[type="submit"]');
    const btnReset  = formulario.querySelector('button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    //Asignar eventos
    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);

    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function(e){
        e.preventDefault();


        //reiniciar el objeto
        email.email = '',
        email.asunto= '',
        email.mensaje = '',

        formulario.reset();
        comprobarEmail();
    })

    function enviarEmail(e){
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        //reiniciar el objeto
        email.email = '',
        email.asunto= '',
        email.mensaje = '',

        formulario.reset();
        comprobarEmail();

        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

                //crear una alerta
                const alertaExito = document.createElement('P');
                alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase' );
                alertaExito.textContent = 'Mensaje enviado correctamente';

                formulario.appendChild(alertaExito);

                setTimeout(() => {
                    alertaExito.remove();
                }, 3000);

        }, 3000);
    }

    function validar(e) {
        if(e.target.value.trim() === '') {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();

            return;
        }

        
        if(e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es valido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        };

        limpiarAlerta(e.target.parentElement);

        //Aasignar los valores
        email[e.target.name] = e.target.value.trim().toLowerCase();

        // Comprobar el objeto de email
        comprobarEmail();
    }

    function mostrarAlerta(mensaje, referencia){
        limpiarAlerta(referencia);

        //Comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta){
            alerta.remove();
        }


        //Generar alerta en HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');

        //inyectar el error al formulario
        referencia.appendChild(error);
        
    }

    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta){
            alerta.remove();
        }
    }

    function validarEmail(email){
        const regex =   /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        const resultado =regex.test(email);
        return resultado;
    }

    function comprobarEmail(){
        if(Object.values(email).includes('')){
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;

        }else{
            btnSubmit.classList.remove('opacity-50');
            btnSubmit.disabled = false;
        }

    }

});