document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("https://ec2-18-212-209-232.compute-1.amazonaws.com:8443/api/public/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            sessionStorage.setItem("isAuthenticated", "true");
            window.location.href = "index.html";
        } else {
            document.getElementById("message").textContent = "Usuario o contraseña incorrectos.";
            document.getElementById("message").style.color = "red";
        }
    } catch (error) {
        document.getElementById("message").textContent = "Error al conectar con el servidor.";
        document.getElementById("message").style.color = "red";
    }
});

document.getElementById("registerForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("regPassword").value;

    try {
        const response = await fetch("https://ec2-18-212-209-232.compute-1.amazonaws.com:8443/api/public/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            document.getElementById("message").textContent = "Registro exitoso. Por favor, inicia sesión.";
            document.getElementById("message").style.color = "green";
            toggleForm();
        } else {
            document.getElementById("message").textContent = "Error en el registro.";
            document.getElementById("message").style.color = "red";
        }
    } catch (error) {
        document.getElementById("message").textContent = "Error al conectar con el servidor.";
        document.getElementById("message").style.color = "red";
    }
});

document.getElementById("toggleLink").addEventListener("click", function(event) {
    event.preventDefault();
    toggleForm();
});

function toggleForm() {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const formTitle = document.getElementById("formTitle");
    const toggleLink = document.getElementById("toggleLink");

    if (loginForm.style.display === "none") {
        loginForm.style.display = "block";
        registerForm.style.display = "none";
        formTitle.textContent = "Iniciar Sesión";
        toggleLink.textContent = "¿No tienes una cuenta? Regístrate aquí";
    } else {
        loginForm.style.display = "none";
        registerForm.style.display = "block";
        formTitle.textContent = "Registro";
        toggleLink.textContent = "¿Ya tienes una cuenta? Inicia sesión aquí";
    }
}