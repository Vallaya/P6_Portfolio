document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.querySelector(".loginButton");
  
    loginButton.addEventListener("click", async (e) => {
      let user = {
        email: 'sophie.bluel@test.tld',
        password: 'S0phie'
      };
  
      /* On envoie les données au serveur */
      const response = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
      });
  
      /* On récupère la réponse en JSON */
      const { accessToken, tokenType } = await response.json();
  
      /* On stocke le token dans le localStorage */
      localStorage.setItem('tokens', JSON.stringify({ accessToken, tokenType }));
  
      /* On peut maintenant utiliser le token pour les futures requêtes */
  
      /* Par exemple, on peut récupérer les informations de l'utilisateur */
      const tokens = JSON.parse(localStorage.getItem('tokens'));
  
      const headers = new Headers();
      headers.append('Authorization', `${tokens.tokenType} ${tokens.accessToken}`);
  
      const options = {
        method: 'GET',
        mode: 'cors',
        headers
      };
  
      const userResponse = await fetch('http://localhost:5678/api/users/me', options);
      const userData = await userResponse.json();
      console.log(userData);
    });
  });
  