const resetPasswordForm = document.getElementById("resetPasswordForm");
const messageBox = document.getElementById("messageBox");
const emailInput = document.getElementById("emailInput");

function setMessage(text, type) {
  messageBox.textContent = text;
  messageBox.className = `message-box ${type}`;
}

function getCookie(name) {
  const cookies = document.cookie ? document.cookie.split("; ") : [];

  for (const cookie of cookies) {
    if (cookie.startsWith(`${name}=`)) {
      return decodeURIComponent(cookie.split("=")[1]);
    }
  }

  return "";
}

function clearCookie(name) {
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Strict`;
}

emailInput.value = getCookie("verifiedResetEmail") || getCookie("resetEmail");

if (!getCookie("verifiedResetEmail")) {
  setMessage("Pehle OTP verify kar lijiye.", "error");
}

resetPasswordForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  messageBox.className = "message-box hidden";

  const formData = new FormData(resetPasswordForm);
  const email = formData.get("email")?.trim();
  const newPassword = formData.get("newPassword");
  const confirmPassword = formData.get("confirmPassword");

  if (newPassword !== confirmPassword) {
    setMessage("Passwords do not match", "error");
    return;
  }

  try {
    const response = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPassword })
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.message || "Password reset failed", "error");
      return;
    }

    clearCookie("resetEmail");
    clearCookie("verifiedResetEmail");
    setMessage(data.message || "Password reset successful", "success");
    resetPasswordForm.reset();
    setTimeout(() => {
      window.location.href = "/login.html";
    }, 800);
  } catch (error) {
    setMessage("Something went wrong", "error");
  }
});
