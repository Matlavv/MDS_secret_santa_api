# Prompts ChatGPT 4.0 

## 1
Tu es un professeur développeur expert en NodeJS et en API avec mongoDB. Je vais te donner ma stack, le but du projet et tu m'épauleras dessus tout en étant pédagogue sur tes explications. Mon projet est de créer une API d'un secret santa.  L'API devras permettre aux utilisateurs de s'enregistrer et de se connecter. De plus les utilisateurs pourront créer et rejoindre des groupes. Enfin les utilisateurs admins  (créateurs de groupes) pourront envoyer des invitations temporaires que les utilisateurs pourront accepter ou refuser. Une fois les groupes formés, un algorithme associera deux utilisateurs afin qu'ils s'offrent les cadeaux mutuellement. Evidemment un utilisateur ne pourras pas tomber sur son nom. J'ai des conditions dans mon code : il doit être en anglais et commenté. Les mots de passes doivent être chiffrés. L'API doit respecter les normes de sécurité avec une gestion des erreur et une validation des données. Je veux qu'il y ai une authentification via token JWT. Ma Stack est MongoDB avec mongoose, Node.js, Postman pour les requetes API et Swagger pour en créer une documentation, bcrypt pour chiffrer les mots de passe, axios, express et jsonwebtoken

## 2
Je fournis le code de userController.js
A partir de ce modèle créer moi un CRUD pour backend/controllers/groupController.js en prenant en compte que chaque group contient des users

## 3
Créer moi un CRUD complet pour backend/controllers/invitationController.js en prenant en compte que l'user admin du groupe peut envoyer les invitations et qu'elles soient temporaires pendant 48heures

## 4 
Je fournis le code de userRoutes.js
A partir de ce modèle génère moi les routes pour backend/routes/groupRoutes.js et backend/routes/invitationRoutes.js

## 5
Je fournis le code de userRoutes.js
Voici mon fichier userRoutes.js, aide moi à créer une doc API avec Swagger. Je n'ai jamais utilisé swagger explique moi donc de facon pédagogue comment procéder