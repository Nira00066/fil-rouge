# getAllEvents

| **Nom du test** | **Entrée (Header Authorization)**   | **Sortie attendue**     |
| getAllEvents    | _(aucun header)_                    | **201** recu all events |
| getAllEvents    | _(aucun header)_                    | **401** – ` vide tous supp
'|
---
# getEventById

| **Nom du test** | **Entrée (Header Authorization)**   | **Sortie attendue**     |
| getEventById    | { id:1 }                    | **200** recois body event id: 1 |
| getEventById    | { id:-0}                    | **500** – `n'as pas d'id negatif'|
| getEventById    | { id:2}                    | **400** – `event non trouver '|

# getEventbyCategory

| **Nom du test** | **Entrée (Header Authorization)**   | **Sortie attendue**     |
| getEventbyCategory    | { slug : compéte } dans le parametre                     | **200** recois body event id: 1 |
| getEventbyCategory    | { slug : }                    | **500** – `n'as pas de slug'|
| getEventbyCategory    | { slug :voiture }                    | **400** – `n'as pas de slug corrspondant dans la table category'|

# getRecent

| **Nom du test** | **Entrée (Header Authorization)**   | **Sortie attendue**     |
| getRecent    | { limit: req.parmas.userId}=3 | **200** recois  donc recjet []|
| getRecent    | { limit: req.parmas.userId}=3 | **500** – `pas de reception du dao'|
| getRecent    | { limit: req.parmas.userId} = 3 | **400** – `err '|







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


