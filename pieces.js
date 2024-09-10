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
// Récupération des pièces depuis le fichier JSON
function genererPieces(pieces){
  for (let i = 0; i < pieces.length; i++) {

    const article = pieces[i];
    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionFiches = document.querySelector(".fiches");
    // Création d’une balise dédiée à une pièce automobile
    const pieceElement = document.createElement("article");
    // Création des balises
    const imageElement = document.createElement("img");
    imageElement.src = article.image;
    const nomElement = document.createElement("h2");
    nomElement.innerText = article.nom;
    const prixElement = document.createElement("p");
    prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
    const categorieElement = document.createElement("p");
    categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = article.description ?? "Aucune description pour le moment.";
    const stockElement = document.createElement("p");
    stockElement.innerText = article.disponibilite ? "En stock" : "Piece indisponible";

    // On rattache la balise article a la section Fiches
    sectionFiches.appendChild(pieceElement);
    // On rattache l’image à pieceElement (la balise article)
    pieceElement.appendChild(imageElement);
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);
    //Ajout des éléments au DOM pour l'exercice
    pieceElement.appendChild(descriptionElement);
    pieceElement.appendChild(stockElement);

  }
}

genererPieces(pieces);

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

const boutonDecroissant = document.querySelector(".btn-decroissant")
boutonDecroissant.addEventListener("click", function() {
  // On créer un nouveau tableau pour les pieces triées à partir de la liste de pieces.
  // On trie la liste pieces en fonction de la disponibilité.
  const piecesDecroissant = Array.from(pieces);
  // La fonction sort s’attend à recevoir un nombre de la part de la fonction anonym
  piecesDecroissant.sort(function (a, b) {
    return b.prix - a.prix;
  });
  console.log(piecesDecroissant);
});

const boutonNoDescription = document.querySelector(".btn-nodesc")
boutonNoDescription.addEventListener("click", function() {
  const piecesFiltrees = pieces.filter(function(piece) {
    return piece.description
  });
  console.log(piecesFiltrees);
});


// Recupération des nom de pieces dans une nouvelle liste (tableau): 2 écritures possibles
// // Fonction normale:
// const noms = pieces.map(function (piece) {
//   return piece.nom;
// })

// // Fonction lambda:
// affichage en console de ce nouveau tableau
// La nouvelle liste noms ne contient que les noms des pieces auto de la liste pieces
// EX: Si on veu tpar exemple effectuer une remise sur les pieces on peut aussi utiliser map:
// // const prix_remise = pieces.map(piece => piece.prix / 2); => permet d'effectuer une remise de -5°% sur le prix de chaque piece
// for(let i = pieces.length -1 ; i >= 0; i--){
  //   if(pieces[i].prix > 35){
    //       noms.splice(i,1)
    //   }
    // }

const noms = pieces.map(piece => piece.nom);
for(let i = pieces.length -1  ; i >= 0; i--){
  if(pieces[i].prix > 35){
      noms.splice(i,1)
  }
}
console.log(noms);

//Création de la liste
const abordablesElements = document.createElement('ul');
//Ajout de chaque nom à la liste
for(let i=0; i < noms.length ; i++) {
    const nomElement = document.createElement('li');
    nomElement.innerText = noms[i];
    abordablesElements.appendChild(nomElement)
}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector('.abordables').appendChild(abordablesElements)


//Afficher les pieces disponibles et leurs prix
// Creation des nouvelles liste noms et prix
const nomsDisponibles = pieces.map(piece => piece.nom);
const prixDisponibles = pieces.map(piece => piece.prix);
//iteration sur chaque elements de la liste pieces, si pas disponible, on retire le nom et le prix de la nouvelle liste)
for(let i = pieces.length -1  ; i >= 0; i--){
  if(pieces[i].disponibilite === false){
    nomsDisponibles.splice(i,1)
    prixDisponibles.splice(i,1)
  }
}
//Création de la liste dans le DOM
const disponibleElement = document.createElement('ul');
//Ajout de chaque nom à la liste
for(let i=0; i < nomsDisponibles.length ; i++) {
  const nomElement = document.createElement('li');
  nomElement.innerText = `${nomsDisponibles[i]} - ${prixDisponibles[i]}`;
  disponibleElement.appendChild(nomElement)
}
// On rattache la liste au DOM
document.querySelector('.disponibles').appendChild(disponibleElement)

// Efface le contenu de la balise body et donc l’écran:
// document.querySelector(".fiches").innerHTML = '';

const inputPrixMax = document.querySelector('#prix-max')
inputPrixMax.addEventListener('input',  function() {
  const piecesFiltrees = pieces.filter(function(piece) {
    return piece.prix <= inputPrixMax.value;
  })
  document.querySelector(".fiches").innerHTML = '';
  genererPieces(piecesFiltrees);
})
