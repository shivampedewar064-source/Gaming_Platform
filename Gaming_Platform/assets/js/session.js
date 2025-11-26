// Basic session guard for Gaming_Platform

firebase.auth().onAuthStateChanged((user) => {
  const path = window.location.pathname;

  const isPublic =
    path.endsWith('/index.html') ||
    path.endsWith('/login.html') ||
    path.endsWith('/register.html') ||
    path === '/' ||
    path.endsWith('/Gaming_Platform/') ||
    path.endsWith('/Gaming_Platform');

  if (!user && !isPublic) {
    window.location.href = 'index.html';
  }
});

// Logout
document.getElementById('logoutBtn')?.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    await firebase.auth().signOut();
  } finally {
    window.location.href = 'index.html';
  }
});


