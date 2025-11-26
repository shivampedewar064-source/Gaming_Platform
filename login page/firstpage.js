const form = document.querySelector('.form');
const logine1 = document.querySelector('.logine1');
const register = document.querySelector('.register');
const logine = document.querySelector('.logine');
const close_icon = document.querySelector('.close_icon');

register.addEventListener('click', ()=> {
    form.classList.add('active');
});


logine1.addEventListener('click', ()=> {
    form.classList.remove('active');
});

logine.addEventListener('click', ()=> {
    form.classList.add('active_logine');
});

close_icon .addEventListener('click', ()=> {
    form.classList.remove('active_logine');
});

// Import the functions you need from the SDKs you need
//   import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
//   import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";
//   // TODO: Add SDKs for Firebase products that you want to use
//   // https://firebase.google.com/docs/web/setup#available-libraries

//   // Your web app's Firebase configuration
//   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//   const firebaseConfig = {
//     apiKey: "AIzaSyAhwGm-pXpE6BQwIov2A36gCLzr9IL490Q",
//     authDomain: "gameplay-website.firebaseapp.com",
//     projectId: "gameplay-website",
//     storageBucket: "gameplay-website.firebasestorage.app",
//     messagingSenderId: "55160091818",
//     appId: "1:55160091818:web:cadea0237a86ffbc1fccd3",
//     measurementId: "G-PBHDE9FM95"
//   };

//   // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);

//   //inputs
//     const email1 = document.getElementById('email1').value;
//     const password1 = document.getElementById('password1').value;

//   //submit button
//     const submit1 = document.getElementById('submit1');
//     submit1.addEventListener("click", function(event) {
//         event.preventDefault();
//         alert(5);
//     })



// import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";
// import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

// // ...existing code
// const firebaseConfig = {
//   apiKey: "AIzaSyAhwGm-pXpE6BQwIov2A36gCLzr9IL490Q",
//   authDomain: "gameplay-website.firebaseapp.com",
//   projectId: "gameplay-website",
//   storageBucket: "gameplay-website.firebasestorage.app",
//   messagingSenderId: "55160091818",
//   appId: "1:55160091818:web:cadea0237a86ffbc1fccd3",
//   measurementId: "G-PBHDE9FM95"
// };

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// document.addEventListener('DOMContentLoaded', () => {
//   const form = document.querySelector('.form');
//   const logine1 = document.querySelector('.logine1');
//   const register = document.querySelector('.register');
//   const logine = document.querySelector('.logine');
//   const close_icon = document.querySelector('.close_icon');

//   if (register) register.addEventListener('click', ()=> form && form.classList.add('active'));
//   if (logine1)  logine1.addEventListener('click', ()=> form && form.classList.remove('active'));
//   if (logine)   logine.addEventListener('click', ()=> form && form.classList.add('active_logine'));
//   if (close_icon) close_icon.addEventListener('click', ()=> form && form.classList.remove('active_logine'));

//   // submit button (HTML uses id="submit" and inputs id="email" and id="password")
//   const submit = document.getElementById('submit');
//   if (submit) {
//     submit.addEventListener('click', function(event) {
//       event.preventDefault();
//       const email = document.getElementById('email')?.value || '';
//       const password = document.getElementById('password')?.value || '';
//       // validate
//       if (!email || !password) {
//         alert('Please enter email and password');
//         return;

//         createUserWithEmailAndPassword(auth, email, password)
//             .then((userCredential) => {
//             // Signed up 
//             const user = userCredential.user;
//             alert('User registered: ' + user.email);
//            // ...
//         })  
//             .catch((error) => {
//                 const errorCode = error.code;
//                 const errorMessage = error.message;
//     // ..
//   });

//       }
//       // handle login/register (placeholder)
//       alert('email: ' + email);
//     });
//   }
// });
// // ...existing code...



// import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";
// import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

// const firebaseConfig = {
//   apiKey: "AIzaSyAhwGm-pXpE6BQwIov2A36gCLzr9IL490Q",
//   authDomain: "gameplay-website.firebaseapp.com",
//   projectId: "gameplay-website",
//   storageBucket: "gameplay-website.firebasestorage.app",
//   messagingSenderId: "55160091818",
//   appId: "1:55160091818:web:cadea0237a86ffbc1fccd3",
//   measurementId: "G-PBHDE9FM95"
// };

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth(app);

// document.addEventListener('DOMContentLoaded', () => {
//   const form = document.querySelector('.form');
//   const logine1 = document.querySelector('.logine1');
//   const register = document.querySelector('.register');
//   const logine = document.querySelector('.logine');
//   const close_icon = document.querySelector('.close_icon');

//   // toggle forms
//   if (register) register.addEventListener('click', ()=> form && form.classList.add('active'));
//   if (logine1)  logine1.addEventListener('click', ()=> form && form.classList.remove('active'));
//   if (logine)   logine.addEventListener('click', ()=> form && form.classList.add('active_logine'));
//   if (close_icon) close_icon.addEventListener('click', ()=> form && form.classList.remove('active_logine'));

//   // LOGIN button
//   const submit = document.getElementById('submit');
//   if (submit) {
//     submit.addEventListener('click', function(event) {
//       event.preventDefault();
//       const email = document.getElementById('email')?.value || '';
//       const password = document.getElementById('password')?.value || '';
      
//       if (!email || !password) {
//         alert('Please enter email and password');
//         return;
//       }

//       // Firebase login
//       signInWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//           const user = userCredential.user;
//           alert('Login successful: ' + user.email);
//           // redirect to homepage after login
//           window.location.href = '../forall/homepage.html';
//         })
//         .catch((error) => {
//           alert('Login error: ' + error.message);
//         });
//     });
//   }

//   // REGISTER button
//   const registerBtn = document.querySelector('.regist .btn');
//   if (registerBtn) {
//     registerBtn.addEventListener('click', function(event) {
//       event.preventDefault();
//       // get register form inputs (fix selectors if ids are different)
//       const regUsername = document.querySelector('.regist input[type="text"]')?.value || '';
//       const regEmail = document.querySelector('.regist input[type="email"]')?.value || '';
//       const regPassword = document.querySelector('.regist input[type="password"]')?.value || '';

//       if (!regUsername || !regEmail || !regPassword) {
//         alert('Please fill all fields');
//         return;
//       }

//       // Firebase register
//       createUserWithEmailAndPassword(auth, regEmail, regPassword)
//         .then((userCredential) => {
//           const user = userCredential.user;
//           alert('Registration successful: ' + user.email);
//           // clear fields and switch to login
//           document.querySelector('.regist input[type="text"]').value = '';
//           document.querySelector('.regist input[type="email"]').value = '';
//           document.querySelector('.regist input[type="password"]').value = '';
//           form.classList.remove('active');
//         })
//         .catch((error) => {
//           alert('Registration error: ' + error.message);
//         });
//     });
//   }
// });

// firstpage.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAhwGm-pXpE6BQwIov2A36gCLzr9IL490Q",
  authDomain: "gameplay-website.firebaseapp.com",
  projectId: "gameplay-website",
  storageBucket: "gameplay-website.firebasestorage.app",
  messagingSenderId: "55160091818",
  appId: "1:55160091818:web:cadea0237a86ffbc1fccd3",
  measurementId: "G-PBHDE9FM95"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // Keep analytics if you need it
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => {
  const formWrapper = document.querySelector('.form'); // Renamed to avoid conflict
  const loginLink = document.querySelector('.logine'); // Button to open login form
  const closeIcon = document.querySelector('.close_icon');
  const registerSwitchLink = document.querySelector('.register'); // Link to switch to register form
  const loginSwitchLink = document.querySelector('.logine1'); // Link to switch back to login form

  // --- UI Toggle Logic ---
  if (registerSwitchLink) {
    registerSwitchLink.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default link behavior
      formWrapper && formWrapper.classList.add('active'); // Shows registration form
    });
  }

  if (loginSwitchLink) {
    loginSwitchLink.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default link behavior
      formWrapper && formWrapper.classList.remove('active'); // Shows login form
    });
  }

  if (loginLink) {
    loginLink.addEventListener('click', () => {
      formWrapper && formWrapper.classList.add('active_logine'); // Opens the main login/register modal
    });
  }

  if (closeIcon) {
    closeIcon.addEventListener('click', () => {
      formWrapper && formWrapper.classList.remove('active_logine'); // Closes the modal
      formWrapper && formWrapper.classList.remove('active'); // Also ensure it defaults to login view
    });
  }

  // --- Firebase Login Logic ---
  const submitLoginBtn = document.getElementById('submitLogin');
  if (submitLoginBtn) {
    submitLoginBtn.addEventListener('click', async (event) => {
      event.preventDefault(); // Prevent default form submission

      const emailInput = document.getElementById('loginEmail');
      const passwordInput = document.getElementById('loginPassword');

      const email = emailInput?.value.trim();
      const password = passwordInput?.value;

      if (!email || !password) {
        alert('Please enter both email and password for login.');
        return;
      }

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        alert('Login successful! Welcome, ' + (user.displayName || user.email));
        // Clear inputs after successful login
        emailInput.value = '';
        passwordInput.value = '';
        // Redirect to homepage
        window.location.href = '../home-page-2/firstpage.html';//to give address of next page
      } catch (error) {
        let errorMessage = 'Login failed. Please check your credentials.';
        // Provide more specific feedback based on Firebase error codes
        switch (error.code) {
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            errorMessage = 'Incorrect email or password.';
            break;
            
          case 'auth/invalid-email':
            errorMessage = 'The email address is not valid.';
            break;
          case 'auth/too-many-requests':
            errorMessage = 'Too many failed login attempts. Please try again later.';
            break;
          default:
            console.error("Login error:", error.code, error.message);
            break;
        }
        alert(errorMessage);
      }
    });
  }

  // --- Firebase Registration Logic ---
  const submitRegisterBtn = document.getElementById('submitRegister');
  if (submitRegisterBtn) {
    submitRegisterBtn.addEventListener('click', async (event) => {
      event.preventDefault(); // Prevent default form submission

      const usernameInput = document.getElementById('registerUsername');
      const emailInput = document.getElementById('registerEmail');
      const passwordInput = document.getElementById('registerPassword');

      const username = usernameInput?.value.trim();
      const email = emailInput?.value.trim();
      const password = passwordInput?.value;

      if (!username || !email || !password) {
        alert('Please fill in all registration fields: Username, Email, and Password.');
        return;
      }

      if (password.length < 6) { // Firebase requires at least 6 characters for password
        alert('Password should be at least 6 characters long.');
        return;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // After creating the user, update their profile with the provided username
        await updateProfile(user, {
          displayName: username,
        });

        alert('Registration successful! Welcome, ' + username + '. You can now log in.');
        // Clear registration fields
        usernameInput.value = '';
        emailInput.value = '';
        passwordInput.value = '';
        // Switch back to login form after successful registration
        formWrapper && formWrapper.classList.remove('active');

      } catch (error) {
        let errorMessage = 'Registration failed.';
        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'This email address is already registered.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'The email address is not valid.';
            break;
          case 'auth/weak-password':
            errorMessage = 'The password is too weak (should be at least 6 characters).';
            break;
          default:
            console.error("Registration error:", error.code, error.message);
            break;
        }
        alert(errorMessage);
      }
    });
  }
});
