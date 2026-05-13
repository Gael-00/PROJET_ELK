# PROJET_ELK

# PROJET ELK - Groupe 41 (M1 Informatique UNIKIN)

Ce projet implémente une architecture de surveillance (SOC) pour détecter des attaques SQL Injection et XSS sur une application Django, avec un monitoring via la stack ELK et un Dashboard React.

## 🚀 Architecture du Projet
* **Django (Port 8000)** : Application web vulnérable pour les tests d'attaques.
* **Elasticsearch** : Moteur de stockage et d'indexation des logs.
* **Logstash** : Pipeline de traitement qui filtre les logs Django vers Elasticsearch.
* **Kibana (Port 5601)** : Interface de visualisation des données.
* **Dashboard React (Port 3000)** : Tableau de bord personnalisé conçu par Jordan.

## 🛠️ Installation et Lancement
1. **Cloner le dépôt**
2. **Lancer l'infrastructure (Docker Required)** :
   ```bash
   docker-compose up --build -d
3. Lancer le Dashboard : 
    cd Api-dashboard/dashboard-attacks && npm install && npm start

👥 Membres du Groupe
MPINDA KANULAMBI GAEL (Infrastructure Docker)

MVUEZOLO TSHITSHI JORDAN (Dashboard React & API)

ONGENDANGENDA ONAKUNDJI ALPHONSE (Vecteurs d'attaques)

AZIDAMA EGAO BELVINE (Déploiement)

MULANGA MUYA ASNATH (Rédaction & Présentation)

