function setMessage(message, type) {
  const profileMessage = document.getElementById("messageBox");

  if (!profileMessage) {
    return;
  }

  if (!message) {
    profileMessage.textContent = "";
    profileMessage.className = "message-box hidden";
    return;
  }

  profileMessage.textContent = message;
  profileMessage.className = `message-box ${type}`;
}

async function loadProfile() {
  const profileStatus = document.getElementById("profileStatus");
  const profileCard = document.getElementById("profileCard");
  const profileName = document.getElementById("profileName");
  const profileEmail = document.getElementById("profileEmail");
  const profileId = document.getElementById("profileId");

  try {
    const res = await fetch("/api/profile");

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Unable to load profile");
    }

    if (!data.user) {
      throw new Error("Profile data missing");
    }

    if (profileStatus) {
      profileStatus.textContent = "Aap ki authenticated profile load ho gayi.";
    }

    if (profileName) {
      profileName.textContent = data.user.name || "-";
    }

    if (profileEmail) {
      profileEmail.textContent = data.user.email || "-";
    }

    if (profileId) {
      profileId.textContent = data.user._id || data.user.id || "-";
    }

    if (profileCard) {
      profileCard.classList.remove("hidden");
    }

    setMessage("", "success");
  } catch (error) {
    console.error("Profile load error:", error);
    setMessage("Session invalid ya expire ho gayi hai. Dobara login kijiye.", "error");

    if (profileStatus) {
      profileStatus.textContent = "Profile verify nahi ho saki.";
    }

    setTimeout(() => {
      window.location.href = "/login.html";
    }, 1200);
  }
}

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST"
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Logout failed");
      }

      window.location.href = "/login.html";
    } catch (error) {
      console.error("Logout error:", error);
      setMessage("Logout complete nahi hua. Dobara try kijiye.", "error");
    }
  });
}

loadProfile();
