const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userDao = require("../dao/user.dao");


const createError = (message, statusCode = 500) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

// ----------------------------------------------------------------
// LECTURE
// ----------------------------------------------------------------

// retour tous les users de la db
exports.getAll = async (req, res, next) => { 
    try {
        const users = await userDao.getAllUsers();
        res.json(users);
    } catch (err) {
        console.error("Erreur getAll:", err);
        next(err); // Passer l'erreur au middleware
    }
};

// retour le userid du http
exports.getuserById = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await userDao.getUserById(userId);
        
        if (!user || user.length === 0) {
            
            return next(createError("Utilisateur non trouvé", 404));
        }
        // [0] si le DAO renvoie un tableau
        res.status(200).json(user[0]); 
        
    } catch (err) {
        console.error("Error userId:", err);
        next(err); //  Passer l'erreur au middleware
    }
};

// ----------------------------------------------------------------
// INSCRIPTION
// ----------------------------------------------------------------

exports.postInscription = async (req, res, next) => { 
    
    const user = req.body; 
    
    try {
        //  Vérification de l'email si elle existe déjà
        const existingUser = await userDao.getUserByEmail(user.email);
        
        if (existingUser) {
       
            return next(createError("Email déjà utilisé", 409)); // 409 Conflict
        }

        // mots de passe hashed 
        const hashed = await bcrypt.hash(user.password, 10);

        // creation de ton user pour le dao
        await userDao.createUser({
            name: user.firstname, // 
            lastname: user.lastname,
            email: user.email,
            hashed,
        });

        res.status(201).json({ message: "Utilisateur créé avec succès 🎉" });
    } catch (err) {
        console.error("Erreur dans postInscription:", err);
        next(err); // Passer l'erreur au middleware
    }
};

// ----------------------------------------------------------------
// CONNEXION
// ----------------------------------------------------------------

exports.postConnexion = async (req, res, next) => { // 💡 Ajout de 'next'
    try {
        // Grâce à verifConnexion, req.user est déjà défini (utilisateur trouvé et MDP vérifié)
        const user = req.user; 

        // 💡 Assurez-vous d'avoir process.env.JWT_SECRET configuré
        const token = jwt.sign(
            { id: user.id,  role: user.role_id },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.status(200).json({
            message: "Connexion réussie 🎉",
            token,
            userId: user.id 
        });
    } catch (err) {
        console.error("Erreur dans postConnexion:", err);
        next(err); //  Passer l'erreur au middleware
    }
};

// ----------------------------------------------------------------
// SUPPRESSION (Logique de Masquage/Soft Delete)
// ----------------------------------------------------------------

/**
 * Supprime logiquement (désactive) un utilisateur en attendant une suppression physique.
 */
exports.deleteUser = async (req, res, next) => { 
    try {
        const userIdToDelete = req.params.id;
        
    
        // Mettre à jour l'utilisateur pour le désactiver / soft delete (ex: is_active = 0)
        const result = await userDao.softDeleteUser(userIdToDelete);

        if (result.affectedRows === 0) {
            
            return next(createError("Utilisateur non trouvé pour la suppression", 404));
        }
        
        // V2 : pour supprimer physiquement après 30 jours.
        
        res.status(200).json({ 
            message: "Utilisateur désactivé avec succès. La suppression définitive aura lieu sous 30 jours." 
        });
        
    } catch (err) {
        console.error("Erreur dans deleteUser:", err);
        next(err); // Passer l'erreur au middleware
    }
};