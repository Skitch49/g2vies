# G2vies - API

G2vies est un projet MERN stack (MongoDB, Express, React, Node.js) visant à gérer des produits pour un site e-commerce.

> ⚠️ Pour l'instant, seule la partie **API** est développée. L'API permet de gérer les produits (CRUD) et est documentée via **Swagger**.

---

## Table des matières

- [Installation](#installation)
- [Configuration](#configuration)
- [Démarrage du serveur](#démarrage-du-serveur)
- [Routes API](#routes-api)
- [Swagger Documentation](#swagger-documentation)
- [Modèle Produit](#modèle-produit)
- [Fonctionnalités](#fonctionnalités)
- [Librairies utilisées](#librairies-utilis%C3%A9es)

---

## Installation

Clonez le projet et installez les dépendances :

```bash
git clone <URL_DU_REPO>
cd api
npm install
```

---

## Configuration

Créez un fichier `.env` à la racine du dossier `api` et ajoutez les variables suivantes :

```env
MONGO_URI=<VOTRE_URI_MONGODB>
PORT=3001
```

- `MONGO_URI` : URI de connexion à votre base de données MongoDB.
- `PORT` : port sur lequel l'API va écouter (par défaut `3001`).

> ⚠️ Ne partagez jamais votre fichier `.env` publiquement.

---

## Démarrage du serveur

Pour lancer le serveur en mode développement avec **nodemon** :

```bash
npm run server
```

Le serveur sera accessible à l'adresse :

```
http://localhost:3001/
```

---

## Routes API

### Racine

- `GET /` : Page d'accueil de l'API. Message de bienvenue.
- `GET /api` : Liste des routes disponibles.

### Produits (`/api/products`)

| Méthode | Route  | Description                                                        |
| ------- | ------ | ------------------------------------------------------------------ |
| GET     | `/`    | Récupère tous les produits (supporte `skip`, `limit`, `sortOrder`) |
| GET     | `/:id` | Récupère un produit par son ID                                     |
| POST    | `/`    | Crée un nouveau produit                                            |
| PUT     | `/:id` | Modifie un produit existant                                        |
| DELETE  | `/:id` | Supprime un produit par son ID                                     |

Exemple pour récupérer tous les produits avec tri décroissant et pagination :

```
GET /api/products?skip=0&limit=10&sortOrder=desc
```

---

## Swagger Documentation

L’API est documentée avec **Swagger** :

- URL : `http://localhost:3001/api-docs`
- Vous pouvez visualiser les routes, tester les endpoints et consulter les modèles.

---

## Modèle Produit

Le modèle `Product` contient les champs suivants :

- `name` (String, obligatoire)
- `description` (String)
- `price` (Number, obligatoire)
- `originalPrice` (Number, obligatoire)
- `quantity` (Number, obligatoire)
- `category` (String, obligatoire)
- `brand` (String, obligatoire)
- `condition` (String, obligatoire) : `Neuf`, `Comme neuf`, `Très bon état`, `Bon état`, `Usagé`, `Reconditionné`
- `images` (Array de String)
- `model`, `cpu`, `gpu`, `ram`, `color`, `weight`
- `storage` : `capacity` (Number), `unit` (Go ou To), `type` (SSD ou HDD)
- `screenSize`, `operatingSystem`
- `wifi`, `webcam`, `numpad`, `microphone`, `bluetooth` (Boolean)
- `connectors` : tableau d'objets `{ name, quantity }`

> Les timestamps (`createdAt`, `updatedAt`) sont générés automatiquement.

---

## Fonctionnalités

- CRUD complet pour les produits.
- Support de la pagination et du tri (`skip`, `limit`, `sortOrder`).
- Validation des champs obligatoires lors de la création d’un produit.
- Documentation Swagger pour tester facilement l’API.

---

## Librairies utilisées

- `express` : framework web pour Node.js
- `nodemon` : rechargement automatique du serveur en développement
- `cookie-parser` : gestion des cookies
- `jsonwebtoken` : création et vérification des tokens JWT
- `mongoose` : ODM pour MongoDB
- `bcrypt` : hash des mots de passe
- `dotenv` : gestion des variables d'environnement
- `swagger-ui-express` : documentation interactive Swagger
- `yamljs` : lecture de fichiers YAML pour Swagger

---

## Remarques

- Cette API est en cours de développement et constitue la base du projet G2vies.
- Les futures évolutions incluront l’authentification, la gestion des utilisateurs et l’intégration frontend avec React.
