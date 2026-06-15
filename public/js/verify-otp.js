const verifyOtpForm = document.getElementById("verifyOtpForm");
const emailInput = document.getElementById("emailInput");

function getCookie(name) {
  const cookies = document.cookie ? document.cookie.split("; ") : [];

  for (const cookie of cookies) {
    if (cookie.startsWith(`${name}=`)) {
      return decodeURIComponent(cookie.split("=")[1]);
    }
  }
  return "";
}

emailInput.value = getCookie("resetEmail");

if (verifyOtpForm) {
  verifyOtpForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("emailInput").value;
    const otp = document.getElementById("otp").value;

    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, otp })
      });

      const data = await res.json();
      console.log("Verify OTP response:", data);

      if (res.ok) {
        alert(data.message);
        document.cookie = `resetEmail=${encodeURIComponent(email)}; path=/; max-age=600; SameSite=Strict`;
        document.cookie = `verifiedResetEmail=${encodeURIComponent(email)}; path=/; max-age=600; SameSite=Strict`;
        window.location.href = "/reset-password.html";
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Verify OTP error:", error);
      alert("Error: " + error.message);
    }
  });
}
