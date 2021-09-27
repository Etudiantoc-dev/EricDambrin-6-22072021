const multer = require('multer'); // Permet de charger des fichiers entrant sur l'application

const MIME_TYPES = { // Formats autorisés
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');// Remplace les espaces par des underscores
    const extension = MIME_TYPES[file.mimetype]; //générer l'extension du fichier evoyé pae le front-end
    callback(null, name + Date.now() + '.' + extension); //+timeStamp
  }
});

module.exports = multer({ storage }).single('image');
