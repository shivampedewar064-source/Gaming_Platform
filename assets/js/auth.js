GPUtils.ready(() => {
  if (!window.firebase || !firebase.apps || !firebase.apps.length) {
    console.warn("Firebase has not been initialized. Check firebase-config.js.");
    return;
  }

  const auth = firebase.auth();
  const state = {
    user: null,
  };

  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const logoutButtons = GPUtils.qsa("[data-logout]");
  const statusNodes = GPUtils.qsa("[data-auth-status]");
  const signedInNodes = GPUtils.qsa('[data-show-when="signed-in"]');
  const signedOutNodes = GPUtils.qsa('[data-show-when="signed-out"]');
  const nameNodes = GPUtils.qsa("[data-user-name]");
  const emailNodes = GPUtils.qsa("[data-user-email]");
  const signedInSections = GPUtils.qsa("[data-section='signed-in']");
  const signedOutSections = GPUtils.qsa("[data-section='signed-out']");

  const messages = {
    login: document.querySelector("[data-auth-message='login']"),
    signup: document.querySelector("[data-auth-message='signup']"),
    global: document.querySelector("[data-auth-message='global']"),
  };

  const toggleFormDisabled = (form, disabled) => {
    if (!form) return;
    form.querySelectorAll("input, button").forEach((el) => {
      el.disabled = disabled;
    });
  };

  const getMessageForCode = (code) => {
    switch (code) {
      case "auth/invalid-email":
        return "The email address is invalid.";
      case "auth/user-disabled":
        return "This account has been disabled.";
      case "auth/user-not-found":
      case "auth/wrong-password":
        return "Incorrect email or password.";
      case "auth/email-already-in-use":
        return "That email is already registered.";
      case "auth/weak-password":
        return "Use a stronger password (at least 6 characters).";
      default:
        return "Something went wrong. Please try again.";
    }
  };

  const updateUI = (user) => {
    state.user = user;
    const isSignedIn = Boolean(user);

    statusNodes.forEach((node) => {
      if (!node) return;
      node.textContent = isSignedIn
        ? `Signed in as ${user.displayName || user.email}`
        : "You are currently signed out";
    });

    signedInNodes.forEach((node) => (node.hidden = !isSignedIn));
    signedOutNodes.forEach((node) => (node.hidden = isSignedIn));
    signedInSections.forEach((node) => (node.hidden = !isSignedIn));
    signedOutSections.forEach((node) => (node.hidden = isSignedIn));

    nameNodes.forEach((node) => {
      if (node) node.textContent = user?.displayName || "Anonymous gamer";
    });

    emailNodes.forEach((node) => {
      if (node) node.textContent = user?.email || "Not available";
    });
  };

  const handleAuthAction = async (actionFn, { form, messageNode, successText }) => {
    if (!actionFn) return;
    toggleFormDisabled(form, true);
    try {
      await actionFn();
      if (messageNode) {
        GPUtils.flash(messageNode, successText || "Success!", "info");
      }
    } catch (error) {
      const text = getMessageForCode(error.code);
      if (messageNode) {
        GPUtils.flash(messageNode, text, "error");
      } else if (messages.global) {
        GPUtils.flash(messages.global, text, "error");
      } else {
        alert(text);
      }
    } finally {
      toggleFormDisabled(form, false);
    }
  };

  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(loginForm);
      const email = formData.get("email")?.toString().trim();
      const password = formData.get("password")?.toString();
      if (!email || !password) {
        GPUtils.flash(messages.login, "Enter both email and password.", "error");
        return;
      }
      handleAuthAction(
        () => auth.signInWithEmailAndPassword(email, password),
        {
          form: loginForm,
          messageNode: messages.login,
          successText: "Welcome back!",
        }
      );
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(signupForm);
      const displayName = formData.get("displayName")?.toString().trim();
      const email = formData.get("email")?.toString().trim();
      const password = formData.get("password")?.toString();
      if (!displayName || !email || !password) {
        GPUtils.flash(messages.signup, "All fields are required.", "error");
        return;
      }
      handleAuthAction(
        async () => {
          const { user } = await auth.createUserWithEmailAndPassword(email, password);
          if (displayName) {
            await user.updateProfile({ displayName });
          }
        },
        {
          form: signupForm,
          messageNode: messages.signup,
          successText: "Account created! You can log in now.",
        }
      );
    });
  }

  logoutButtons.forEach((button) =>
    button.addEventListener("click", () => {
      auth.signOut();
    })
  );

  auth.onAuthStateChanged(updateUI);
});

