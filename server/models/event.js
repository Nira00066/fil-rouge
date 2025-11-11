import Joi from 'joi';

const eventValidator = Joi.object({
  title: Joi.string()
    .min(3)
    .max(255)
    .required()
    .messages({
      'string.empty': 'Le titre est obligatoire',
      'string.min': 'Le titre doit contenir au moins 3 caractères',
      'string.max': 'Le titre ne peut pas dépasser 255 caractères',
    }),

  category_id: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': 'L’ID de catégorie doit être un nombre',
      'any.required': 'La catégorie est obligatoire',
    }),

  location_id: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': 'L’ID de localisation doit être un nombre',
      'any.required': 'La localisation est obligatoire',
    }),

  user_id: Joi.number()
    .integer()
    .allow(null)
    .messages({
      'number.base': 'L’ID utilisateur doit être un nombre',
    }),

  event_image_id: Joi.number()
    .integer()
    .allow(null)
    .messages({
      'number.base': 'L’ID de l’image doit être un nombre',
    }),

  date_start: Joi.date()
    .required()
    .messages({
      'date.base': 'La date de début doit être une date valide',
      'any.required': 'La date de début est obligatoire',
    }),

  date_end: Joi.date()
    .min(Joi.ref('date_start'))
    .required()
    .messages({
      'date.base': 'La date de fin doit être une date valide',
      'date.min': 'La date de fin doit être après la date de début',
      'any.required': 'La date de fin est obligatoire',
    }),

  hour_start: Joi.string()
    .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:?[0-5]?[0-9]?$/)
    .required()
    .messages({
      'string.pattern.base': 'L’heure de début doit être au format HH:MM:SS',
      'string.empty': 'L’heure de début est obligatoire',
    }),

  hour_end: Joi.string()
    .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:?[0-5]?[0-9]?$/)
    .required()
    .custom((value, helpers) => {
      const [h1, m1, s1] = helpers.state.ancestors[0].hour_start.split(':').map(Number);
      const [h2, m2, s2] = value.split(':').map(Number);
      const start = h1 * 3600 + m1 * 60 + (s1 || 0);
      const end = h2 * 3600 + m2 * 60 + (s2 || 0);
      if (end <= start) {
        return helpers.error('any.invalid', { message: 'L’heure de fin doit être après l’heure de début' });
      }
      return value;
    })
    .messages({
      'any.invalid': 'L’heure de fin doit être après l’heure de début',
      'string.pattern.base': 'L’heure de fin doit être au format HH:MM:SS',
      'string.empty': 'L’heure de fin est obligatoire',
    }),

  price: Joi.number()
    .precision(2)
    .min(0)
    .allow(null)
    .messages({
      'number.base': 'Le prix doit être un nombre',
      'number.min': 'Le prix ne peut pas être négatif',
    }),

  address: Joi.string()
    .max(255)
    .required()
    .messages({
      'string.empty': 'L’adresse est obligatoire',
      'string.max': 'Adresse trop longue (max 255)',
    }),

  description: Joi.string().allow('', null),

  event_rules: Joi.string().max(255).allow('', null),
  available_services: Joi.string().max(255).allow('', null),

  phone: Joi.string()
    .pattern(/^\+?[0-9\s-]{6,20}$/)
    .allow('', null)
    .messages({
      'string.pattern.base': 'Le numéro de téléphone n’est pas valide',
    }),

  email: Joi.string().email().allow('', null).messages({
    'string.email': 'L’email doit être valide',
  }),

  website_url: Joi.string().uri().allow('', null).messages({
    'string.uri': 'Le site web doit être une URL valide',
  }),

  social_name: Joi.string().max(255).allow('', null),
  organization_name: Joi.string().max(255).allow('', null),
  organization_description: Joi.string().allow('', null),

  created_at: Joi.date().allow(null),
  updated_at: Joi.date().allow(null),
  deleted_at: Joi.date().allow(null)
});

export default eventValidator;
