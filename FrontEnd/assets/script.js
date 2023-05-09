fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    // Récupérer l'élément gallery où je veux ajouter les images
    const gallery = document.querySelector('.gallery');
    // Création d'un nouveau Set pour les catégories
    const categoriesSet = new Set(); 
    // Utilisation de fetch pour récupérer les catégories
    fetch('http://localhost:5678/api/categories')
      .then(response => response.json())
      .then(categories => {
        // Parcourir les données pour créer les images
        data.forEach(image => {
          // Création de nouvelles balises figure et img
          const figure = document.createElement('figure');
          const img = document.createElement('img');
          img.src = image.imageUrl;
          img.alt = image.title;
          // Définition de l'attribut title avec le titre de l'image
          img.title = image.title;
          // Création d'une balise figcaption
          const figcaption = document.createElement('figcaption');
          figcaption.innerHTML = image.title;

          // Ajout des balises img et figcaption à la balise figure
          figure.appendChild(img);
          figure.appendChild(figcaption);
          // Ajout de la balise figure à l'élément gallery
          gallery.appendChild(figure);

          const category = {
            id: image.category.id,
            name: image.category.name
          };
          // Ajout de l'objet catégorie au Set
          categoriesSet.add(category); 
        });
        console.log(categoriesSet);

        const buttonTous = document.querySelector('.tous');
        buttonTous.addEventListener('click', () => {
          filterImagesByCategory('');
        });

        const buttonObjets = document.querySelector('.objets');
        buttonObjets.addEventListener('click', () => {
          filterImagesByCategory('Objets');
        });

        const buttonAppartements = document.querySelector('.appartements');
        buttonAppartements.addEventListener('click', () => {
          filterImagesByCategory('Appartements');
        });

        const buttonHotelsRestaurants = document.querySelector('.hotels_restaurants');
        buttonHotelsRestaurants.addEventListener('click', () => {
          filterImagesByCategory('Hotels & restaurants');
        });

        function filterImagesByCategory(categoryName) {
          // Réinitialiser la galerie
          gallery.innerHTML = '';
          let filteredData = []
          if(!categoryName) {
            filteredData = data;
          } else {
            filteredData = data.filter(image => image.category.name === categoryName);
          }
          // Afficher les images filtrées dans la galerie
          filteredData.forEach(image => {
            const figure = document.createElement('figure');
            const img = document.createElement('img');
            img.src = image.imageUrl;
            img.alt = image.title;
            img.title = image.title;

            const figcaption = document.createElement('figcaption');
            figcaption.innerHTML = image.title;

            figure.appendChild(img);
            figure.appendChild(figcaption);
            gallery.appendChild(figure);
          });
        }
      });
  });