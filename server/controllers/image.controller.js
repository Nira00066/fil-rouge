const ImageDAO = require("../dao/image.dao");


const createError = (message, statusCode = 500) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

exports.uploadImage = async (req, res, next) => {
    try {
        if (!req.file) {
          
            return next(createError("Aucune image envoyée. Veuillez sélectionner un fichier.", 400));
        }

        const main_url = `images/events/${req.file.filename}`;
        
        const result = await ImageDAO.addImage(main_url); 

        res.status(201).json({
            message: " Image uploadée avec succès",
            imageId: result.insertId,
            imageUrl: main_url,
        });
        
    } catch (err) {
        console.error(" Erreur uploadImage :", err);
       
        next(err); 
    }
};

exports.updateImage = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        if (!req.file) {
        
            return next(createError("Aucune nouvelle image envoyée pour la mise à jour", 400));
        }

        const main_url = `images/events/${req.file.filename}`;
        
       
        await ImageDAO.updateImage(id, main_url); 

        res.status(200).json({ message: " Image mise à jour avec succès", imageUrl: main_url });
        
    } catch (err) {
        console.error(" Erreur updateImage :", err);
        //  Remplacé par next(err) pour le traitement 500
        next(err); 
    }
};