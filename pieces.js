// // Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();

  // // création des éléments du DOM représentant les fiches produits
  // const article = pieces[0];
  // const imageElement = document.createElement("img");
  // imageElement.src = article.image;
  // const nomElement = document.createElement("h2");
  // nomElement.innerText = article.nom;
  // const prixElement = document.createElement("p");
  // // si le prix est inferieur à 35€, on ajout 1 seul symbol € sinon superieur à 35€) on ajoute 3 symbols €
  // prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
  // const categorieElement = document.createElement("p");
  // categorieElement.innerText = article.categorie ?? "(aucune catégorie)";

  // // Intégration de ces éléments dans le DOM
  // const sectionFiches = document.querySelector(".fiches");
  // sectionFiches.appendChild(imageElement);
  // sectionFiches.appendChild(prixElement);
  // sectionFiches.appendChild(categorieElement);

  for (let i = 0; i < pieces.length; i++) {

    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionFiches = document.querySelector(".fiches");

    // Création d’une balise dédiée à une pièce automobile
    const pieceElement = document.createElement("article");

    // On crée l’élément img.
    const imageElement = document.createElement("img");
    // On accède à l’indice i de la liste pieces pour configurer la source de l’image.
    imageElement.src = pieces[i].image;

    // On crée l’élément h2 pour le nom.
    const nomElement = document.createElement("h2");
    // On accède à l’indice i de la liste pieces pour configurer le nom.
    nomElement.innerText = pieces[i].nom;

    // On crée l’élément p pour le prix.
    const prixElement = document.createElement("p");
    // On accède à l’indice i de la liste pieces pour configurer le prix
    prixElement.innerText = `Prix: ${pieces[i].prix} € (${pieces[i].prix < 35 ? "€" : "€€€"})`;

    // On crée l’élément p pour la catégorie.
    const categorieElement = document.createElement("p");
    // On accède à l’indice i de la liste pieces pour configurer la catégorie
    categorieElement.innerText = pieces[i].categorie ?? "(aucune catégorie)";

    // On crée l’élément p pour la description.
    const descriptionElement = document.createElement("p");
    // On accède à l’indice i de la liste pieces pour configurer la description
    descriptionElement.innerText = pieces[i].description ?? "(aucune description pour le moment)";

    // On crée l’élément p pour la disponibilité.
    const disponibiliteElement = document.createElement("p");
    disponibiliteElement.innerText = pieces[i].disponibilite;

    // On ajoute les éléments créés à l’élément article.
    pieceElement.appendChild(imageElement);
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);
    pieceElement.appendChild(descriptionElement);
    pieceElement.appendChild(disponibiliteElement);

    // On ajoute l’élément article à la section des fiches.
    sectionFiches.appendChild(pieceElement);
}

const boutonTrier = document.querySelector(".btn-trier");

boutonTrier.addEventListener("click", function () {
  // On créer un nouveau tableau pour les pieces triées à partir de la liste de pieces.
  // On trie la liste pieces en fonction de la disponibilité.
  const piecesOrdonees = Array.from(pieces);
  // La fonction sort s’attend à recevoir un nombre de la part de la fonction anonyme. Le signe de ce nombre (positif, négatif ou nul) sert à indiquer dans quel ordre ranger les deux éléments :
    // si le nombre est positif, alors B sera rangé avant A ;
    // si le nombre est négatif, alors A sera rangé avant B ;
    //si le nombre est zéro (0), alors l’ordre sera inchangé.

  piecesOrdonees.sort(function (a, b) {
      return a.prix - b.prix;
  });
  console.log(piecesOrdonees);

});

const boutonFiltrer = document.querySelector(".btn-filtrer");

boutonFiltrer.addEventListener("click", function () {
  // Utilisation de la fonction filter sur la liste de pieces (permet de filtrer les pieces en fonction d'une condition)
  // La fonction filter prend une fonction anonyme avec en argument un element de la liste qui sera retourné s'il remplis la condition ( ici, prix inferieur à 35€)
  const piecesFiltrees = pieces.filter(function (piece) {
      return piece.prix <= 35;
  });
  console.log(piecesFiltrees);
});

