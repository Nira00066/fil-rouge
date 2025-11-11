// userValidator.js
import Joi from "joi";

const userValidator = Joi.object({
  name: Joi.string().min(2).max(255).allow(null, "").messages({
    "string.min": "Le prénom doit contenir au moins 2 caractères",
    "string.max": "Le prénom ne peut pas dépasser 255 caractères",
  }),

  lastname: Joi.string().min(2).max(255).allow(null, "").messages({
    "string.min": "Le nom doit contenir au moins 2 caractères",
    "string.max": "Le nom ne peut pas dépasser 255 caractères",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "L’email doit être valide",
    "any.required": "L’email est obligatoire",
  }),

  hashed_password: Joi.string().min(6).required().messages({
    "string.min": "Le mot de passe doit contenir au moins 6 caractères",
    "any.required": "Le mot de passe est obligatoire",
  }),

  profile_picture_url: Joi.string()
    .uri()
    .allow("", null)
    .default("./assets/images/nissan.webp")
    .messages({
      "string.uri": "L’URL de la photo de profil doit être valide",
    }),

  role_id: Joi.number().integer().default(2).messages({
    "number.base": "L’ID du rôle doit être un nombre",
  }),

  location_id: Joi.number().integer().allow(null).messages({
    "number.base": "L’ID de localisation doit être un nombre",
  }),

  created_at: Joi.date().allow(null),
  updated_at: Joi.date().allow(null),
});

export default userValidator;
