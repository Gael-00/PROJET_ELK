# ⏰ CHECKLIST EXÉCUTION - GAEL (5H RESTANTES)

---

## 🎯 TIMING RÉALISTE

```
🕐 09:00 - Tu lis ce message
🕐 09:00 - 09:30 (30 MIN) : Lire + mémoriser le script
🕐 09:30 - 09:45 (15 MIN) : Tester l'infrastructure + la démo
🕐 09:45 - 10:00 (15 MIN) : Personnaliser le script avec tes mots
🕐 10:00 - 10:30 (30 MIN) : Réunion de groupe + répartition des rôles
🕐 10:30 - 11:15 (45 MIN) : Test complet de la démo
🕐 11:15 - 11:45 (30 MIN) : Préparation personnelle + détente
🕐 11:45 - 12:00 (15 MIN) : Trajet + test final en salle
🕐 12:00 - 12:15 : C'EST PARTI ! 🎬
```

---

## PHASE 1️⃣ : LIRE ET MÉMORISER (09:00 - 09:30)

### Étape 1.1 : Ouvre le script
```
Fichier : f:\PROJET_ELK\SCRIPT_PRESENTATION_GAEL.md
Ouvre-le dans VS Code
```

### Étape 1.2 : Lis la phase d'introduction
- Temps : 2 min
- Adapte les phrases avec TES mots
- Crée une **version perso** du script

### Étape 1.3 : Lis la phase d'architecture
- Temps : 2 min
- Comprends le flux d'attaquant jusqu'à Kibana
- Mémorise : "Logstash = filtre, ES = indexe, Kibana = affiche"

### Étape 1.4 : Lis les questions/réponses
- Temps : 1 min
- Mémorise les 5 réponses principales
- Ouvre l'aide-mémoire pour référence

### ✅ FIN PHASE 1

---

## PHASE 2️⃣ : TEST INFRASTRUCTURE (09:30 - 09:45)

### Étape 2.1 : Vérifier que Docker tourne

Ouvre un terminal bash et fais :
```bash
cd f:\PROJET_ELK
docker-compose ps
```

**Tu dois voir :**
```
CONTAINER ID   NAMES              STATUS
...            elasticsearch      Up 10 minutes
...            logstash           Up 10 minutes
...            kibana             Up 10 minutes
```

✅ Si tout est "Up" → Continue
❌ Si quelque chose est "Down" → Fais `docker-compose up -d` et attends 30 sec

---

### Étape 2.2 : Tester Kibana

Dans ton navigateur :
```
URL : http://localhost:5601
```

✅ Tu dois voir l'interface Kibana
❌ Si c'est "loading" depuis longtemps → Attends 1-2 min de plus

---

### Étape 2.3 : Vérifier les logs existants

- Clique sur "Analytics" → "Discover" (ou "Logs")
- Sélectionne l'index `django-logs-main`
- Tu dois voir des logs existants

✅ Si tu vois des logs → Continue
❌ Si c'est vide → C'est normal, ça veut juste dire qu'il faut envoyer une attaque

---

### ✅ FIN PHASE 2

---

## PHASE 3️⃣ : TESTER LA DÉMO (09:45 - 10:00)

### Étape 3.1 : Envoyer une attaque XSS

Terminal :
```bash
# Remplace localhost:3000 par l'IP/port du serveur vulnérable
# Si server_direct.js tourne sur ta machine :
curl "http://localhost:3000/search?q=<script>alert('XSS')</script>"

# Si c'est sur une autre machine :
curl "http://192.168.1.100:3000/search?q=<script>alert('XSS')</script>"
```

**Après 1-2 secondes :**
- Retourne à Kibana
- Rafraîchis la page (F5)
- Tu dois voir un log avec le message contenant `<script>alert('XSS')</script>`

✅ Log apparaît dans Kibana → C'est bon !
❌ Rien n'apparaît → Cherche error dans la console Kibana

---

### Étape 3.2 : Envoyer une attaque SQLi

Terminal :
```bash
curl "http://localhost:3000/login?user=admin' OR '1'='1"
```

**Après 1-2 secondes :**
- Retourne à Kibana
- Rafraîchis
- Tu dois voir un log avec le message contenant `OR`

✅ Log apparaît dans Kibana → Excellent !
❌ Rien n'apparaît → Cherche error

---

### Étape 3.3 : Tester le dashboard React (optionnel)

Terminal :
```bash
curl http://localhost:4000/api/attacks
```

✅ Tu obtiens un JSON avec les attaques → C'est bon
❌ Erreur de connexion → C'est pas grave, la démo principale marche

---

### ✅ FIN PHASE 3

---

## PHASE 4️⃣ : RÉUNION DE GROUPE (10:00 - 10:30)

### Étape 4.1 : Message de groupe

Envoie à Alphonse, Jordan, Belvine, Asnath :

> "Yo groupe ! On se réunit maintenant (30 min). Lieu : [lieu].
> Avant de venir :
> 1. Vérifiez que votre partie tourne chez vous
> 2. Lisez le GUIDE_REUNION_DE_GROUPE.md dans le projet
> 3. Préparez votre partie (2-3 min de présentation)
> Merci ! 🚀"

---

### Étape 4.2 : Pendant la réunion

**Agenda (30 min) :**

```
0-5 min   │ GAEL : Présente le plan de la soutenance
5-10 min  │ ALPHONSE : Explique sa part (backend + détection)
10-15 min │ JORDAN : Explique sa part (dashboard React)
15-20 min │ BELVINE/ASNATH : Questions de support
20-30 min │ Tout le monde : Test complet de la démo
```

**Checklist à valider :**
```
☐ Qui parle en premier ? → Gael (introduction)
☐ Qui envoie les attaques ? → Gael (pour la démo)
☐ Qui explique Kibana ? → Gael
☐ Qui explique le dashboard React ? → Jordan
☐ Qui gère les Q&A techniques ? → Belvine
☐ Qui gère les questions du rapport ? → Asnath
```

---

### ✅ FIN PHASE 4

---

## PHASE 5️⃣ : TEST COMPLET DE LA DÉMO (10:30 - 11:15)

**Simulation complète comme à la soutenance :**

### Étape 5.1 : Nettoyage mental (2 min)
- Ferme tous les autres onglets
- Ouvre JUSTE : Terminal + Navigateur + VS Code
- Test que le projecteur marche (si applicable)

---

### Étape 5.2 : Intro complète (2 min)
- LIS LE SCRIPT D'INTRODUCTION
- Dis-le à voix HAUTE (simule la vraie présentation)
- Chronomètre toi pour que ce soit ~2 min

---

### Étape 5.3 : Architecture complète (2 min)
- Dessine ou montre la slide de l'architecture
- Explique le flux complet

---

### Étape 5.4 : Démo complète (6 min)
```
1. docker-compose ps (20 sec)
2. Ouvrir Kibana (30 sec)
3. Montrer logs existants (30 sec)
4. Envoyer attaque XSS (1 min)
5. Montrer log dans Kibana (1 min)
6. Envoyer attaque SQLi (1 min)
7. Montrer log dans Kibana (1 min)
8. Dashboard React (si possible) (30 sec)
```

---

### Étape 5.5 : Q&A simulation (1 min)
- Alphonse pose 2-3 questions
- Tu réponds en ~30 secondes

---

### Étape 5.6 : Débrief (1 min)
- Qu'est-ce qui a marché ?
- Qu'est-ce qui était lent ?
- À améliorer ?

---

### ✅ FIN PHASE 5

---

## PHASE 6️⃣ : PRÉPARATION PERSONNELLE (11:15 - 11:45)

### Étape 6.1 : Respire (5 min)
- Pause café
- Marche un peu
- Calme-toi

---

### Étape 6.2 : Revise rapidement (10 min)
- Relis ton script intro
- Mémorise les 3 points clés
- Visualise la démo qui marche

---

### Étape 6.3 : Préparation physique (10 min)
- Toilettes
- Hydrate-toi
- Check ta tenue (propre, pas de logo bateau)

---

### Étape 6.4 : Zones de confort (10 min)
- Prépare 2-3 requêtes d'attaque dans un document texte (copy-paste ready)
- Mets les URLs principales en favoris
- Range les fichiers importants (script, aide-mémoire) accessibles

---

### ✅ FIN PHASE 6

---

## PHASE 7️⃣ : TRAJET + TEST FINAL (11:45 - 12:00)

### Étape 7.1 : Trajet (5-10 min)
- Arrive 10 min en avance
- Pas de stress, tu as bien préparé

---

### Étape 7.2 : Arrivée en salle (5 min)
```
☐ Dis bonjour aux jurés (sourire, serrer la main)
☐ Vérifie le projecteur / vidéo
☐ Test les clics / interactions
☐ Test que Kibana ouvre bien
☐ Respire. Tu es prêt.
```

---

### ✅ C'EST PARTI ! 🎬

---

## 🚨 CONTINGENCY CHECKLIST

**Si X ne marche pas, quoi faire :**

| Problème | Solution |
|----------|----------|
| server_direct.js ne répond pas | Montre les logs historiques dans Kibana |
| Kibana lent | Attends 10 sec, c'est normal |
| Pas de logs | Envoie une attaque en direct pendant la démo |
| Projuteur ne marche pas | Fais la démo sur ton écran + enlarge |
| Q&A compliquée | "Bonne question, on explore ça après" |
| Temps qui passe | Saute la démo du dashboard React si besoin |

---

## 📋 CHECKLIST FINAL (5 min avant)

```
☐ J'ai mémorisé mon intro (2 min)
☐ Je comprends l'architecture (Logstash/ES/Kibana)
☐ Je sais envoyer une attaque XSS
☐ Je sais envoyer une attaque SQLi
☐ J'ai testé docker-compose ps
☐ J'ai ouvert Kibana et vu des logs
☐ Mon groupe a confirmé son rôle
☐ J'ai mes URLs en favoris
☐ J'ai mes requêtes d'attaque en copy-paste ready
☐ Je vais parler lentement et faire du contact visuel
☐ Si quelque chose ne marche pas, j'ai un plan B
```

---

## 🎯 TES 5 RÈGLES D'OR

1. **Parle lentement** (30% plus lent que d'habitude)
2. **Contact visuel** avec les jurés
3. **Montre, ne raconte pas** (démo > slides)
4. **Sois confiant** (tu l'as mérité !)
5. **Si c'est pas parfait, c'est normal** (c'est une démo live)

---

## 💪 DERNIER MOT

**Tu as 3-4h de préparation finale. C'est suffisant.**

**Vous avez construit une vraie plateforme. Soyez fiers.**

**Les jurés vont voir que vous comprenez ce que vous avez fait.**

**Allez-y confiants ! 🚀**

---

**Prochaine étape : Réunion de groupe (10:00)**
