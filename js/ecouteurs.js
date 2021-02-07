let mousePos = {};

function traiteMouseDown(event) {
  //console.log("Souris clickée dans le canvas bouton " + event.button);
  //console.log("Clickée en x = " + mousePos.x + " y = " + mousePos.y);
  switch (etatJeu) {
    case "MenuPrincipal":
      etatJeu = "JeuEnCours";
      break;
    case "EcranChangementNiveau":
      //passeNiveauSuivant();
      etatJeu = "JeuEnCours";
      break;
    case "GameOver":
      etatJeu = "JeuEnCours";
      rejouer();
      break;
  }
}

function traiteMouseUp(event) {
  //console.log("Souris relâchée dans le canvas bouton " + event.button);

}

function traiteMouseMove(event) {
  //console.log("Souris déplacée dans le canvas");
  // pour prendre en compte les marges, le css, etc.
  var rect = canvas.getBoundingClientRect();

  mousePos.x = event.clientX - rect.left-8;
  mousePos.y = event.clientY - rect.top-8;

  //console.log("Souris en x = " + mousePos.x + " y = " + mousePos.y);

  monstre.setPos(mousePos.x, mousePos.y);
  
}
function getMousePosition(event) {
  //console.log("Souris déplacée dans le canvas");
  // pour prendre en compte les marges, le css, etc.
  var rect = canvas.getBoundingClientRect();

  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}
function traiteKeyDown(event) {
  switch (event.key) {
    case "ArrowLeft":
      monstre.vitesseX = -10;
      break;
    case "ArrowRight":
      monstre.vitesseX = 10;
      break;
    case "ArrowUp":
      monstre.vitesseY = -10;
      break;
    case "ArrowDown":
      monstre.vitesseY = 10;
      break;
  }
  if ( event.keyCode == 32) {
   
    switch (etatJeu) {
      case "MenuPrincipal":
        etatJeu = "JeuEnCours";
        break;
      case "EcranChangementNiveau":
        //passeNiveauSuivant();
        etatJeu = "JeuEnCours";
        break;
      case "GameOver":
        etatJeu = "JeuEnCours";
        rejouer();
        break;
    }
  }
}

function traiteKeyUp(event) {
  switch (event.key) {
    case "ArrowLeft":
    case "ArrowRight":
      monstre.vitesseX = 0;
      break;
    case "ArrowUp":
    case "ArrowDown":
      monstre.vitesseY = 0;
      break;
  }
}

