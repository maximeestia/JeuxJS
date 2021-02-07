// Exemple de classe
let image2;
class Balle {
  x;
  y;
  couleur = "black";
  vitesseX = 0;
  vitesseY = 0;
  url;

  constructor(x, y, rayon, couleur, vitesseX, vitesseY,url) {
    this.x = x;
    this.y = y;
    this.rayon = rayon;
    if (couleur) this.couleur = couleur;
    if (vitesseX) this.vitesseX = vitesseX;
    if (vitesseY) this.vitesseY = vitesseY;
    this.url=url;
    
  }

  draw(ctx) {
    ctx.save();

    ctx.translate(this.x, this.y);

    // dessin d'un cercle, on utilise le mode "chemin"
    ctx.beginPath();
    image2= new Image();
    image2.src=this.url;
    // cx, cy, rayon, angle départ, angle arrivée en radians
   // ctx.arc(0, 0, this.rayon, 0, 2 * Math.PI);

    // on donne l'ordre d'afficher le chemin
    //ctx.fillStyle = this.couleur;
    //ctx.fill(); // en formes pleines

    ctx.lineWidth = 0;
    ctx.strokeStyle = this.couleur;
    ctx.stroke(); // en fil de fer
    ctx.scale(this.rayon/150, this.rayon/150);
    ctx.drawImage(image2,0,0);
    ctx.restore();
  }

  move() {
    this.x += this.vitesseX;
    this.y += this.vitesseY;
  }
}
