const loginForm = document.getElementById("loginForm");
const messageBox = document.getElementById("messageBox");

function setMessage(message, type) {
  if (!messageBox) {
    return;
  }

  if (!message) {
    messageBox.textContent = "";
    messageBox.className = "message-box hidden";
    return;
  }

  messageBox.textContent = message;
  messageBox.className = `message-box ${type}`;
}

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    setMessage("", "error");

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      console.log("Login response:", data);

      if (res.ok) {
        const profileRes = await fetch("/api/profile", {
          method: "GET"
        });

        const profileData = await profileRes.json();

        if (!profileRes.ok) {
          throw new Error(profileData.message || "Token verification failed");
        }

        window.location.href = "/profile.html";
      } else {
        setMessage(data.message || "Login failed", "error");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Error: " + error.message, "error");
    }
  });
}
