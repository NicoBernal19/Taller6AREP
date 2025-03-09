document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("https://localhost:8443/api/public/login", {
            method: "POST",
            headers: {
                "Authorization": "Basic " + btoa(username + ":" + password),
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            localStorage.setItem("isAuthenticated", "true");
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
