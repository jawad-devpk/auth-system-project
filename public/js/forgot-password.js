const forgotPasswordForm = document.getElementById("forgotPasswordForm");
const messageBox = document.getElementById("messageBox");

function setMessage(text, type) {
  messageBox.textContent = text;
  messageBox.className = `message-box ${type}`;
}

forgotPasswordForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  messageBox.className = "message-box hidden";

  const formData = new FormData(forgotPasswordForm);
  const email = formData.get("email")?.trim();

  try {
    const response = await fetch("/api/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.message || "Request failed", "error");
      return;
    }

    document.cookie = `resetEmail=${encodeURIComponent(email)}; path=/; max-age=600; SameSite=Strict`;
    setMessage(data.message || "OTP sent to your email", "success");
    forgotPasswordForm.reset();
    setTimeout(() => {
      window.location.href = "/verify-otp.html";
    }, 800);
  } catch (error) {
    setMessage("Something went wrong", "error");
  }
});
