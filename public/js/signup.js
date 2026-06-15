const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();
      console.log("Response:", data);

      if (res.ok) {
        alert(data.message);
        window.location.href = "/login.html";
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Error: " + error.message);
    }
  });
}
