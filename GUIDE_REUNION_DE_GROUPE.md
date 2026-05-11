# 👥 GUIDE DE RÉUNION DE GROUPE
## Coordination et Répartition des Rôles

---

## ⏱️ TIMING PRÉSENTATION FINALE : 15 MINUTES

```
0:00 - 2:00   │ GAEL      : Introduction + Contexte
2:00 - 4:00   │ GAEL      : Architecture globale (schéma)
4:00 - 10:30  │ GAEL      : Démo infrastructure + attaques + Kibana
10:30 - 11:30 │ ALPHONSE  : Backend & Filtres de détection (opt.)
11:30 - 12:00 │ JORDAN    : Dashboard React (opt.)
12:00 - 15:00 │ TOUS      : Q&A + Conclusion
```

---

## 👨‍💻 RÔLE DE GAEL (Toi) - 8-9 min

### Mission
**Tu es le "maestro" de la présentation. Tu conduis la démo en direct.**

### Responsabilités
- ✅ **Intro** (2 min) : Présente le problème + l'objectif du projet
- ✅ **Architecture** (2 min) : Explique le flux Attaquant → Logstash → ES → Kibana
- ✅ **Démo technique** (4-5 min) :
  - Montre docker-compose ps
  - Ouvre Kibana
  - Envoie une attaque XSS
  - Envoie une attaque SQLi
  - Montre les logs en temps réel
- ✅ **Transition** : Passe la parole à Alphonse/Jordan avec grâce

### Points clés à dire
- "Logstash c'est le moteur qui filtre"
- "Elasticsearch indexe avec des index inverses (ultra rapide)"
- "Kibana affiche en temps réel"
- "Tout est dockerisé pour la portabilité"

### Préparation
```
☐ Répéter le script 2-3 fois
☐ Tester la démo complète 30 min avant
☐ Avoir les URLs principales en favoris
☐ Préparer 2-3 requêtes d'attaque dans un fichier texte (copy-paste ready)
☐ Test internet/vidéo projecteur avant
```

---

## 👨‍💻 RÔLE D'ALPHONSE - 2-3 min (OPTIONNEL)

### Mission
**Expliquer le backend vulnérable et la détection des attaques.**

### Ce que tu peux dire
> "Gael vous a montré la démo. Moi, j'ai travaillé sur la création du serveur intentionnellement vulnérable et les filtres de détection.
>
> **Comment ça marche :**
> 1. Notre serveur Node.js reçoit les requêtes HTTP
> 2. Un **middleware d'analyse** inspecte les paramètres GET/POST
> 3. On applique des **regex pour détecter** les patterns dangereux :
>    - SQL Injection : `' OR`, `--`, `UNION SELECT`
>    - XSS : `<script>`, `alert(`, `onerror=`
> 4. Si un pattern match → on crée un log JSON structuré
> 5. Ce log est sauvegardé dans `attacks.log`
> 6. Logstash le récupère et l'envoie à Elasticsearch
>
> L'avantage de cette approche ? **Flexibilité** : on peut ajouter de nouveaux patterns sans recompiler."

### Points clés
- ✓ Regex = flexible et puissant
- ✓ Détection au niveau du middleware = rapide
- ✓ Logs JSON = facilité d'ingestion dans Logstash

### Préparation
```
☐ Comprendre les regex utilisées (au moins les 3 patterns principaux)
☐ Pouvoir montrer le code du middleware (1-2 slides suffisent)
☐ Mémoriser 3-4 exemples de payloads détectés
```

---

## 👨‍💻 RÔLE DE JORDAN - 1-2 min (OPTIONNEL)

### Mission
**Expliquer le Dashboard React et la visualisation personnalisée.**

### Ce que tu peux dire
> "Gael vous a montré Kibana par défaut. Moi, j'ai créé un Dashboard React personnalisé pour nos besoins spécifiques.
>
> **Pourquoi un dashboard custom ?**
> 1. **Kibana c'est générique** - on peut vouloir une UI adaptée à nos besoins
> 2. **React c'est flexible** - on peut créer exactement ce qu'on veut afficher
> 3. **L'API Elasticsearch** permet à n'importe quelle app d'interroger les données
>
> **Fonctionnalités du dashboard :**
> - Affiche les attaques en liste
> - Filtre par type (SQL, XSS, Normal)
> - Compte le nombre d'attaques par type
> - Tri par timestamp
>
> L'API dans mon code se connecte à Elasticsearch et formate les résultats pour React. C'est une architecture très modulable."

### Points clés
- ✓ Elasticsearch expose des APIs REST
- ✓ N'importe quelle technologie peut s'y connecter (Python, Java, JS, etc.)
- ✓ Flexibilité = avantage pour les futurs développements

### Préparation
```
☐ Avoir le Dashboard React ouvert sur ta machine
☐ Tester que l'API répond (curl ou browser)
☐ Pouvoir montrer rapidement le code server.js (1 screenshot suffit)
☐ Mémoriser les 2-3 fonctionnalités principales
```

---

## 👥 RÔLE DE BELVINE - SUPPORT (optionnel)

### Mission
**Support technique + Réponses aux questions compliquées**

### Points de support
- DevOps et Docker : Comment tourne l'infrastructure ?
- Performance : Combien de logs par seconde ?
- Scalabilité : Ça marche en production ?
- Configuration réseau : Comment les services communiquent ?

### Préparation
```
☐ Connaître la config du docker-compose.yml
☐ Comprendre les ports exposés (9200, 5044, 5601)
☐ Savoir expliquer les volumes Docker
☐ Avoir les réponses aux questions de production
```

---

## 👥 RÔLE D'ASNATH - SUPPORT (optionnel)

### Mission
**Support rapport + Questions pédagogiques**

### Points de support
- Rapport : Comment vous avez structuré le projet ?
- Architecture : Décisions techniques prises et pourquoi
- Processus : Comment avez-vous testé ?
- Améliorations futures : Qu'auriez-vous fait autrement ?

### Préparation
```
☐ Relire le rapport
☐ Identifier les 3-4 décisions clés du projet
☐ Avoir des exemples concrets
☐ Pouvoir répondre à "pourquoi Docker et pas X ?"
```

---

## 🎯 CHECKLIST DE COORDINATION

### 📋 Avant la réunion (communique ça par message/mail)
```
☐ Confirmez que chacun a bien testé sa partie
☐ Vérifiez que l'infrastructure tourne sur TOUTES les machines
☐ Testez les connexions réseau (si pas sur même machine)
☐ Préparez vos screenshots/démos de secours (au cas où)
```

### 🎬 Pendant la présentation
```
☐ GAEL : Arrive 10 min en avance pour test final
☐ ALPHONSE : Prépare tes 2-3 slides de code
☐ JORDAN : Prépare ton Dashboard en live
☐ BELVINE/ASNATH : Soyez en première ligne pour les Q&A
```

### ⚡ Points de transition critiques
```
GAEL → "Merci. Alphonse, peux-tu nous parler du backend ?"
ALPHONSE → "Bien sûr. Pour la visualisation, on laisse Jordan te montrer son dashboard React."
JORDAN → "Merci Alphonse. Maintenant, des questions ?"
```

---

## ❌ ERREURS À ÉVITER

| ❌ À ÉVITER | ✅ À FAIRE |
|-----------|-----------|
| Chacun parle 5 min | Chacun parle 1-2 min |
| Silence quand quelqu'un parle | Tous écoutent attentivement |
| "Hum, je sais pas" | "C'est une excellente question, laisse-moi y répondre" |
| Slide par slide sans démo | Démo en live (30% du temps) |
| Tous parlent à la fois | Un seul parle, autres se taisent |
| Pas de répétition | On a rehearsé 1-2x avant |

---

## 🆘 CONTINGENCY PLAN

### Si server_direct.js ne répond pas
```
GAEL : "Ah, le serveur vulnérable n'est pas accessible, mais regardez 
les logs historiques dans Kibana. Ça montre que le système fonctionne."

ALPHONSE : "Pas grave, le code est prêt. Voulez-vous voir le code source ?"
```

### Si Kibana ne montre pas les logs
```
GAEL : "Les données sont dans Elasticsearch (on peut vérifier avec curl),
mais Kibana met quelques secondes. Laissez-moi rafraîchir..."

BELVINE : "Techniquement parlant, c'est le comportement normal."
```

### Si la connexion réseau ne marche pas
```
JORDAN : "Notre API est conçue pour interroger Elasticsearch à distance.
Voilà le code [montre le fichier server.js]. Les requêtes HTTP passent 
par http://192.168.0.200:9200 normalement."
```

### Sinon, dernier recours
```
GAEL : "Montrons les screenshots préparés à l'avance. 
Voici exactement ce que vous verriez."
```

---

## 🎤 PHRASING PROFESSIONNEL

### Au lieu de... | Dis plutôt...
|---|---|
| "C'est compliqué" | "C'est une architecture en couches sophistiquée" |
| "On a juste fait..." | "Nous avons implémenté une solution robuste basée sur..." |
| "Je sais pas" | "C'est une excellente question. En production, on ferait..." |
| "Ça marche pas là" | "L'infrastructure n'a pas démarré ce matin, mais voici..." |
| "Le code c'est mon collègue qui a fait" | "Nous avons collaboré sur chaque module" |

---

## 📊 WHAT SUCCESS LOOKS LIKE

✅ Jury comprend l'architecture sans effort
✅ La démo fonctionne sans temps mort
✅ Chacun peut répondre aux questions dans son domaine
✅ Vous terminez à 15 minutes pile
✅ Jury pose des questions (= bon signe !)

---

## 🚀 BONNE CHANCE À VOTRE GROUPE !

**Rappelez-vous :**
- Vous avez construit une vraie plateforme de cybersécurité
- ELK c'est utilisé par les plus grands SOC du monde
- Docker c'est utilisé par les plus grands tech (Netflix, Airbnb, etc.)
- Vous devriez être FIERS du travail

**Allez-y confiants. C'est du bon travail.** 💪

---

## ⏰ TIMELINE FINALE

```
09:30 - Réunion de groupe (15 min) : confirmer les rôles
09:45 - Chacun teste sa partie (15 min)
10:00 - Test complet de la démo (10 min)
10:10 - Pause / Se préparer (30 min)
10:40 - Arrivée en salle (5 min early)
10:45 - Test final infrastructure (5 min)
10:50 - Attendre le signal
11:00 - C'EST PARTI ! 🎬
```
