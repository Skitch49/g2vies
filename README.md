# G2vies - API

![G2vies](./picture_readme.png)

G2vies est un projet **MERN stack** (MongoDB, Express, React, Node.js) orienté **e-commerce**.

> ⚠️ Pour l’instant, seule la **partie API** est développée.  
> Cette API gère l’authentification, les utilisateurs et les produits, avec une sécurité basée sur **JWT (RS256)** et des rôles administrateur.

---

## Table des matières

- [Installation](#installation)
- [Configuration](#configuration)
- [Génération des clés JWT](#génération-des-clés-jwt)
- [Démarrage du serveur](#démarrage-du-serveur)
- [Authentification & Sécurité](#authentification--sécurité)
- [Routes API](#routes-api)
- [Swagger Documentation](#swagger-documentation)
- [Modèles](#modèles)
- [Fonctionnalités](#fonctionnalités)
- [Librairies utilisées](#librairies-utilisées)

---

## Installation

Clonez le projet et installez les dépendances :

```bash
git clone https://github.com/Skitch49/g2vies.git
cd api
npm install
```

---

## Configuration

Créez un fichier `.env` à la racine du dossier `api` :

```env
MONGO_URI=<VOTRE_URI_MONGODB>
PORT=3001
ADMIN_ID=<ID_UTILISATEUR_ADMIN>
```

### Variables d’environnement

- `MONGO_URI` : URI de connexion MongoDB
- `PORT` : port du serveur (par défaut `3001`)
- `ADMIN_ID` : identifiant MongoDB de l’utilisateur administrateur

> ⚠️ Ne partagez jamais votre fichier `.env` publiquement.

---

## Génération des clés JWT

L’API utilise des **tokens JWT signés en RS256**.

Avant de lancer le serveur, générez les clés RSA dans le dossier keys :

```bash
node generateKeys.js
```

Cela va créer :

- `jwtRS256.key` → clé privée
- `jwtRS256.key.pub` → clé publique

Ces clés sont utilisées pour signer et vérifier les tokens JWT.

---

## Démarrage du serveur

Mode développement avec **nodemon** :

```bash
npm run server
```

API disponible sur :

```
http://localhost:3001/
```

---

## Authentification & Sécurité

- Authentification via **JWT stocké dans un cookie**
- Middleware `verifyToken` pour protéger les routes utilisateurs
- Middleware `verifyAdmin` pour restreindre certaines routes à l’administrateur

### Middleware `verifyToken`

- Vérifie la validité du token JWT
- Injecte `req.user.id` avec l’ID de l’utilisateur connecté

### Middleware `verifyAdmin`

- Vérifie le token JWT
- Compare l’ID utilisateur avec `ADMIN_ID`
- Refuse l’accès si l’utilisateur n’est pas administrateur

---

## Routes API

### Authentification (`/api/auth`)

| Méthode | Route      | Description                     |
| ------: | ---------- | ------------------------------- |
|    POST | `/`        | Connexion utilisateur           |
|  DELETE | `/`        | Déconnexion utilisateur         |
|     GET | `/current` | Récupère l’utilisateur connecté |

---

### Utilisateurs (`/api/users`)

| Méthode | Route           | Accès       | Description                          |
| ------: | --------------- | ----------- | ------------------------------------ |
|    POST | `/`             | Public      | Création d’un utilisateur            |
|     GET | `/`             | Admin       | Récupère tous les utilisateurs       |
|     GET | `/:id`          | Authentifié | Récupère un utilisateur par ID       |
|   PATCH | `/:id`          | Authentifié | Modification des données utilisateur |
|   PATCH | `/:id/password` | Authentifié | Modification du mot de passe         |

---

### Produits (`/api/products`)

| Méthode | Route  | Accès  | Description                           |
| ------: | ------ | ------ | ------------------------------------- |
|     GET | `/`    | Public | Liste des produits (pagination & tri) |
|     GET | `/:id` | Public | Récupère un produit par ID            |
|    POST | `/`    | Admin  | Création d’un produit                 |
|     PUT | `/:id` | Admin  | Modification d’un produit             |
|  DELETE | `/:id` | Admin  | Suppression d’un produit              |

Paramètres disponibles :

```
/api/products?skip=0&limit=10&sortOrder=desc
```

---

## Swagger Documentation

Documentation interactive disponible à l’adresse :

```
http://localhost:3001/api-docs
```

Permet de :

- Visualiser toutes les routes
- Tester les endpoints
- Consulter les schémas de données

---

## Modèles

### Product

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

- Authentification sécurisée JWT (RS256)
- Gestion des utilisateurs
- Gestion des produits (CRUD)
- Rôles administrateur
- Support de la pagination et du tri (`skip`, `limit`, `sortOrder`)
- Documentation Swagger pour tester facilement l’API

---

## Librairies utilisées

### Backend (API – Node.js / Express)

- `express` : framework web pour Node.js
- `nodemon` : rechargement automatique du serveur en développement
- `cookie-parser` : gestion des cookies
- `jsonwebtoken` : création et vérification des tokens JWT
- `mongoose` : ODM pour MongoDB
- `bcrypt` : hash des mots de passe
- `dotenv` : gestion des variables d'environnement
- `swagger-ui-express` : documentation interactive Swagger
- `yamljs` : lecture de fichiers YAML pour Swagger
- `cors` : gestion des requêtes cross-origin
- `sass-embedded` : lecture de fichiers scss pour le css

### Frontend (React)

- `react-hook-form` : gestion et validation des formulaires
- `@hookform/resolvers` : intégration des schémas de validation
- `yup` : validation des données côté client
- `react-router-dom` : gestion du routing
- `sass-embedded` : gestion des styles SCSS
- `react-icons` : bibliothèque d’icônes React
- `react-transition-group` : bibliothèque d'animations React
- `swiper` : bibliothèque de carousel

---

## Remarques

- L’API est en cours de développement
- Elle constitue la base backend du projet **G2vies**
- Les futures évolutions incluront l’extension des règles métiers et des fonctionnalités e-commerce
