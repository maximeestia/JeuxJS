// exemple d'objet litteral
let image ;
let monstre = {
  x: 0,
  y: 0,
  l: 50,
  h: 50,
  url:"../asset/images/cartoon-forest-background-nature-park-landscape_107791-2040.jpg",
  scale: 1,
  incScale: 0,
  xOeil: 450,
  yOeil: 60,
  angle: 0,
  incAngle: 0,
  vitesseX: 0,
  vitesseY: 0,
  donneTonNom: function () {
    return "Je m'appelle Paul, je suis en x= " + this.x + " y=" + this.y;
  },
  draw: function (ctx) {
    // bonne pratique : sauver le contexte courant
    // couleur courante, taille du trait, etc. avant
    // de dessiner ou de modifier qq chose dans le contexte
    ctx.save();
    ctx.translate(this.x, this.y);
   // ctx.translate(this.l / 2, this.h / 2);
    ctx.scale(this.scale, this.scale);
   // ctx.translate(-this.l / 2, -this.h / 2);
    image= new Image();
    image.src="../asset/images/frame-1.png"
    //ctx.fillRect(0, 0, this.l, this.h);
    ctx.drawImage(image,0,0);
    // On restaure le contexte
    ctx.restore();
  },

  setPos: function (x, y) {
    this.x = x ;
    this.y = y ;
  },
  move: function () {
    this.x += this.vitesseX;
    this.y += this.vitesseY;
    this.angle += this.incAngle;
    this.scale += this.incScale;
    if (this.scale > 2) this.incScale = -this.incScale;
    if (this.scale < 1) this.incScale = -this.incScale;
  },
  
};

