import { loginAPI } from './api.js';

// on verifie s'il n'y a pas déjà de tokens
// const tokens = JSON.parse(localStorage.getItem('tokens'));

// si c'est le cas on redirige vers la page d'acceuil
// if (tokens.token) {
//   window.location.replace("../index.html");
// }

const loginButton = document.querySelector(".loginButton");

loginButton.addEventListener("click", async () => {
  try {
    // On récupère les données de notre formulaire
    const emailAddress = document.querySelector(".emailAddress").value;
    const password = document.querySelector(".password").value;
    const credentials = { email: emailAddress, password: password };
    
    // On initialise la requete login puis on attend d'avoir une reponse
    const response = await loginAPI(credentials);

    // On stocke le token dans le localStorage
    localStorage.setItem('tokens', JSON.stringify(response));

    // On redirige vers la page d'accueil
    window.location.replace("../index.html");
  } catch (error) {
    console.log("===> errors", response.errors);
    return;
  }
});
  