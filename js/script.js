window.onload = main;

let canvas;
let ctx;
let pts = 0;
let niveau = 1;
let etatJeu = "MenuPrincipal";
let niveauChanger = false;
let vie = 3;
let init_balle = 5;//au dessus de 3 obligatoirement 
// ici on va stocker les objets graphiques du jeu, ennemis, etc.
let tableauDesBalles = [];
let c=0;
let chercheuse;
// programme principal
function main() {
  console.log(
    "Page chargée ! DOM ready ! Toutes les resources de la page sont utilisables (videos, images, polices etc."
  );
  // On récupère grace à la "selector API" un pointeur sur le canvas
  canvas = document.querySelector("#myCanvas");

  // on ajoute des écouteurs souris/clavier sur le canvas
  canvas.onmousedown = traiteMouseDown;
  canvas.onmouseup = traiteMouseUp;
  canvas.onmousemove = traiteMouseMove;

  //canvas.addEventListener("mousedown", traiteMouseDown);
  //canvas.addEventListener("mousedown", traiteMouseDown2);

  // le canvas ne peut détecter les touches que si il a le focus (voir mooc)
  // c'est plus simple de mettre l'écouteur sur le document (la page)
  document.onkeydown = traiteKeyDown;
  document.onkeyup = traiteKeyUp;
  

  // pour dessiner, on a besoin de son "contexte graphique", un objet qui
  // va permettre de dessiner, ou de changer les propriétés du canvas
  // (largeur du trait, couleur, repère, etc.)

  ctx = canvas.getContext("2d");

  console.log(monstre.donneTonNom());

  creerDesBalles(init_balle);

  requestAnimationFrame(animationLoop);
}

function creerDesBalles(nb) {
  let tabCouleurs = ["red", "green"];
  let c=0;
  
  for (let i = 0; i < nb; i++) {
    positionMouseX = getMousePosition.x;
    positionMouseY = getMousePosition.y;
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    console.log(i)
    console.log(monstre.x);
    console.log(x);
    console.log(y);
    while (x < monstre.x + 100 && x > monstre.x - 150) {
      x = Math.random() * canvas.width;
      console.log("x while:" + x);
    }
    while (y < monstre.y + 100 && y > monstre.y - 150) {
      y = Math.random() * canvas.height;
      console.log("y while:" + y);
    }

    let vx = -5 + Math.random() * 10 * niveau / 50;
    let vy = -5 + Math.random() * 10 * niveau / 50;
    let r = Math.random() * 10 + 20;
    let indexCouleur = Math.floor(Math.random() * tabCouleurs.length);
    let couleur = tabCouleurs[indexCouleur];
    if (i < Math.trunc(nb / 3) * 2) {
      couleur = tabCouleurs[1];
     
    }
    if (i < Math.trunc(nb / 3)) {
      couleur = tabCouleurs[0];
    }
    if (couleur==tabCouleurs[0]){
      url="../asset/images/apple.png";
    }
    if (couleur==tabCouleurs[1]){
      url="../asset/images/eagle.png";
    }
    
    console.log(x);
    console.log(y);
    
     let b = new Balle(x, y, r, couleur, vx, vy,url);
     // on ajoute la balle au tableau
    tableauDesBalles.push(b);
    

    
  }
}


// animation à 60 images/s
function animationLoop() {

  // 1 on efface le canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 2 On dessine les objets
  afficheInfoJeu();
  switch (etatJeu) {
    case "MenuPrincipal":
      afficheMenuPrincipal();
      break;
    case "JeuEnCours":
      updateJeu();
      break;
    case "EcranChangementNiveau":
      monstre.draw(ctx);
      afficheEcranChangementNiveau();
      break;
    case "GameOver":
      afficheEcranGameOver();
  }
  // 5 On demande au navigateur de rappeler la fonction
  // animationLoop dans 1/60ème de seconde
  requestAnimationFrame(animationLoop);
}

function afficheMenuPrincipal() {
  ctx.save();
  ctx.translate(0, 100);
  ctx.fillStyle = "red";
  ctx.font = "30pt Calibri";
  ctx.fillText("MENU PRINCIPAL", 350, 100);

  ctx.fillText("Cliquez pour démarrer", 325, 150);

  ctx.restore();
}

function afficheEcranChangementNiveau() {
  ctx.save();
  ctx.translate(0, 100);
  ctx.fillStyle = "red";
  ctx.font = "30pt Calibri";
  ctx.fillText("Changement niveau", 350, 100);

  ctx.fillText("Cliquez pour niveau suivant", 325, 150);

  ctx.restore();
}

function afficheEcranGameOver() {
  ctx.save();
  ctx.translate(0, 100);
  ctx.fillStyle = "red";
  ctx.font = "30pt Calibri";
  ctx.fillText("Game Over ", 350, 100);

  ctx.fillText("Cliquez pour rejouer", 325, 150);
  ctx.restore();
}

function niveauSuivant() {
  console.log("NIVEAU SUIVANT");
  niveau += 1;
  
  c=0;
  tableauDesBalles = [];
  creerDesBalles(init_balle + niveau / 3);
  etatJeu = "EcranChangementNiveau";
}

function rejouer() {
  console.log("Nouvelle partie");
  niveau = 1;
  vie = 3;
  pts = 0;
  c=0;
  tableauDesBalles = [];
  creerDesBalles(init_balle + niveau / 10);
  etatJeu = "JeuEnCours";
}

function updateJeu() {
  monstre.draw(ctx);

  updateBalles();
  // 3 on déplace les objets
  monstre.move();
  //deplacerLesBalles();

  // 4 on peut faire autre chose (par ex: detecter des collisions,
  // ou prendre en compte le clavier, la souris, la manette de jeu)
  traiteCollisionsJoueurAvecBords();
  if (vie == 0) {
    etatJeu = "GameOver"
  }
  if (niveauChanger) {
    etatJeu = "EcranChangementNiveau";
    niveauChanger = false;
  }
}

function traiteCollisionBalleAvecMonstre(b) {
  if (
    circRectsOverlap(
      monstre.x,
      monstre.y,
      monstre.l,
      monstre.h,
      b.x,
      b.y,
      b.rayon
    )
  ) {

    // on cherche l'index de la balle dans le tableau des balles
    let index = tableauDesBalles.indexOf(b);
    //On regarde la couleur de la colision
    if (
      b.couleur == "red"
    ) {
      pts += 10;

    }
    if (
      b.couleur == "green"
    ) {
      vie -= 1;
    }
    // pour supprimer un élément : on utilise la méthode splice(index, nbElementsASupprimer) sur le tableau
    tableauDesBalles.splice(index, 1);

  }
}

function afficheInfoJeu() {
  ctx.save();
  ctx.fillStyle = "red";
  ctx.font = "15pt Calibri";
  ctx.fillText("Niveau : " + niveau, 40, 60);

  ctx.lineWidth = 2;
  ctx.strokeStyle = "red";
  ctx.strokeText("Niveau : " + niveau, 40, 60);

  ctx.fillStyle = "red";
  ctx.font = "15pt Calibri";
  ctx.fillText("Score : " + pts, 40, 40);

  ctx.lineWidth = 2;
  ctx.strokeStyle = "red";
  ctx.strokeText("Score : " + pts, 40, 40);

  ctx.fillStyle = "red";
  ctx.font = "15pt Calibri";
  ctx.fillText("Vie : " + vie, 40, 80);

  ctx.lineWidth = 2;
  ctx.strokeStyle = "red";
  ctx.strokeText("Vie : " + vie, 40, 80);

  ctx.restore();
}

function updateBalles() {
  // utilisation d'un itérateur sur le tableau
  let compteur_red = 0;
  tableauDesBalles.forEach((b) => {
    b.draw(ctx);
    traiteCollisionsBalleAvecBords(b);
    traiteCollisionBalleAvecMonstre(b);
    b.move();
    if (
      b.couleur == "red"
    ) {
      compteur_red += 1;
    }
  })
  if (compteur_red == 0) {
    niveauSuivant();
  }
}





