// Login functionality
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    window.location.href = 'home.html';
  } catch (error) {
    alert('Login failed: ' + error.message);
  }
});

// Register functionality
document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const username = document.getElementById('username').value;

  try {
    const cred = await firebase.auth().createUserWithEmailAndPassword(email, password);
    if (cred.user) {
      await cred.user.updateProfile({ displayName: username });
    }
    window.location.href = 'home.html';
  } catch (error) {
    alert('Registration failed: ' + error.message);
  }
});


