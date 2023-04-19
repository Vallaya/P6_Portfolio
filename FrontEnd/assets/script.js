fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    // Récupérer l'élément HTML où je veux ajouter les images
    const gallery = document.querySelector('.gallery');
    data.forEach(image => {
      // Créer des nouvelles balises
      const figure = document.createElement('figure');
      const img = document.createElement('img');
      img.src = image.imageUrl;
      img.alt = image.title;
      // Définir l'attribut title avec le titre de l'image
      img.title = image.title;
      // Créer une balise figcaption
      const figcaption = document.createElement('figcaption');
      figcaption.innerHTML = image.title;

      // Ajouter les balises image et figcaption à la balise figure
      figure.appendChild(img);
      figure.appendChild(figcaption);
      // Ajouter la balise figure à l'élément HTML
      gallery.appendChild(figure);
    });
  });