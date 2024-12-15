# 🏃 Find Your Team (FYT) - Backend

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18.2-lightgrey)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.3.0-green)](https://www.mongodb.com/)
[![Jest](https://img.shields.io/badge/Jest-29.7.0-red)](https://jestjs.io/)

API Backend pour l'application Find Your Team, permettant aux sportifs de trouver des partenaires d'entraînement.

## 📑 Table des Matières

- [Fonctionnalités](#-fonctionnalités)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [API Reference](#-api-reference)
- [Infrastructure](#-infrastructure)
- [Tests](#-tests)

## 🎯 Fonctionnalités

- **👥 Gestion Utilisateurs**

  - Authentification sécurisée
  - Profils sportifs personnalisés
  - Préférences d'entraînement

- **📅 Gestion Événements**

  - Création/modification d'événements sportifs
  - Recherche géolocalisée
  - Filtrage par sport et niveau

- **🏷️ Catalogue Sports**
  - Catégorisation des sports
  - Niveaux de pratique
  - Informations détaillées

## 🏗️ Architecture

```
src/
├── app.ts                 # Point d'entrée
├── event/                 # Gestion des événements
│   ├── event.model.ts
│   └── eventsRoutes.ts
├── sport/                 # Catalogue des sports
│   ├── enum/
│   ├── sports.model.ts
│   └── sportsRoutes.ts
└── user/                  # Gestion utilisateurs
    ├── user.model.ts
    └── usersRoutes.ts

tests/
├── integration/           # Tests d'intégration
└── unit/                 # Tests unitaires
```

## 🚀 Installation

### Prérequis

- Node.js >= 20.11
- npm >= 10.x
- MongoDB >= 6.3
- TypeScript >= 5.3

### Méthode 1: Docker (Recommandée)

```bash
# Installation complète avec Docker
make install

# Ou étape par étape
make create-network
make run-mongodb
make run-backend
```

### Méthode 2: Installation Locale

```bash
# Cloner le projet
git clone git@github.com:DevPaulPOps/appFytBack.git
cd appFytBack

# Installer les dépendances
npm install

# Démarrer en développement
npm run dev
```

## 📘 API Reference

### Événements

```http
GET /api/events               # Liste des événements
POST /api/events              # Créer un événement
GET /api/events/:id           # Détails d'un événement
PUT /api/events/:id           # Modifier un événement
DELETE /api/events/:id        # Supprimer un événement
```

### Utilisateurs

```http
GET /api/users               # Liste des utilisateurs
POST /api/users              # Créer un utilisateur
GET /api/users/:id           # Profil utilisateur
PUT /api/users/:id           # Modifier un profil
```

## 🏗️ Infrastructure

### Docker

```bash
# Build de l'image
docker build -t fyt-backend .

# Lancer le conteneur
docker run -p 3000:3000 fyt-backend
```

### Kubernetes (k8s)

Les manifestes Kubernetes sont disponibles dans le dossier `k8s/`:

- Déploiements pour backend, frontend, et base de données
- Services correspondants
- Configuration Ingress

### CI/CD (Google Cloud)

Pipeline configuré dans `cloudbuild.yaml`:

1. Installation des dépendances
2. Build de l'application
3. Tests
4. Build et push Docker
5. Déploiement Terraform
6. Déploiement sur Cloud Run

## 🧪 Tests

```bash
# Lancer tous les tests
npm test

# Tests unitaires uniquement
npm run test:unit

# Tests d'intégration
npm run test:integration

# Couverture de code
npm run test:coverage
```

## 🔧 Variables d'Environnement

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/fyt
NODE_ENV=development
JWT_SECRET=your_jwt_secret
```

## 📦 Stack Technique

### Core

- Node.js avec TypeScript 5.3.3
- Express.js 4.18.2
- MongoDB 6.3.0
- Mongoose 8.1.1

### Développement

- Jest 29.7.0
- ts-node 10.9.2
- ts-jest 29.1.2
- TypeScript 5.3.3

### Utilitaires

- cors 2.8.5
- body-parser 1.20.2
- node-cron 3.0.3
- express-oauth2-jwt-bearer 1.6.0

### Testing

- Supertest 6.3.4
- Faker 5.5.3

### Scripts Disponibles

```bash
npm start        # Démarre avec ts-node
npm run build    # Compile TypeScript
npm run dev      # Développement avec hot-reload
npm test         # Lance les tests avec couverture
npm run test:watch # Tests en mode watch
```

---

_Développé avec ❤️ pour la communauté sportive_
