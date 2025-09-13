# Fontion authenticateToken

| **Nom du test**    | **Entrée (Header Authorization)**          | **Sortie attendue (Code + Body)**          |
| Aucun token fourni | _(aucun header)_                           | **401** – `{ "message": "Non connecté" }`  |
| Token invalide     | `Bearer mauvais_token`                     | **403** – `{ "message": "Token invalide" }`|
| Token valide       | `Bearer <token_valide>`<br> (signé avec `SECRET_KEY`, payload: `{ id: 1, name: "Nina" }`) |
 **200** – `{ "message": "Accès autorisé", "user": { "id": 1, "name": "Nina" } }` |

# Fonction toogleEndDate

| **Nom du test**           | **Entrée (état de la checkbox `#multiple-dates`)** | **Sortie attendue (style `#end-date-group`)** |
| ------------------------- | -------------------------------------------------- | --------------------------------------------- |
| Checkbox décochée (false) | `checked = false`                                  | `display: none`                               |
| Checkbox cochée (true)    | `checked = true`                                   | `display: flex`                               |

# initTabs

| **Nom du test**        | **Entrée (clic sur un bouton onglet)**        | **Sortie attendue**                                                                   |
| ---------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------- |
| Activation d’un onglet | Clic sur un bouton avec `data-tab="section1"` | Le bouton reçoit `.active`, les autres perdent `.active`                              |
| Changement de section  | Même clic                                     | La section avec `id="section1"` est affichée (`display: block`), les autres en `none` |
