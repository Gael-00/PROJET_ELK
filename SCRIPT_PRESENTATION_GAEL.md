# 🎤 SCRIPT DE PRÉSENTATION - GAEL MPINDA
## Plateforme d'Analyse des Attaques Web avec Kibana

---

## ⏱️ TIMING GLOBAL : 15 MINUTES

| Phase | Durée | Qui |
|-------|-------|-----|
| INTRODUCTION | 2 min | Gael |
| ARCHITECTURE | 2-3 min | Gael |
| DÉMO EN LIVE | 6-7 min | Gael + groupe |
| Q&A | 2-3 min | Tous |

---

## 📍 PHASE 1 : INTRODUCTION (2 MIN)

### 🎯 OBJECTIF
Captiver l'attention. Expliquer pourquoi vous avez fait ce projet.

### 📝 SCRIPT À LIRE (Adapte avec tes mots)

---

**[Debout, face à la salle. Débit modéré et clair]**

> **"Bonjour à tous. Je m'appelle Gael Mpinda et je présente un travail de groupe en cybersécurité.**
>
> **Chaque jour, des millions d'attaques web ciblent les applications : injections SQL, XSS (Cross-Site Scripting), et bien d'autres. Le problème ? Les équipes de sécurité sont **noyées** dans les logs techniques bruts. Impossible de détecter les menaces en temps réel.**
>
> **Notre objectif était simple : Créer une plateforme capable de :**
> - **1. Détecter automatiquement les attaques** (SQL Injection et XSS)
> - **2. Les transformer en données exploitables**
> - **3. Les afficher en temps réel à travers un tableau de bord clair**
>
> **Pour ça, nous avons utilisé la suite ELK (Elasticsearch, Logstash, Kibana) avec Docker. C'est une solution professionnelle utilisée par les plus grands SOC (Security Operation Centers).**
>
> **Voilà ce qu'on va vous montrer aujourd'hui."**

---

### ✅ POINTS À RETENIR
- Tu dois paraître **confiant**
- Parle **lentement** (20-30% plus lent que d'habitude)
- Fais du **contact visuel** avec le jury
- **Pause** avant chaque phrase importante

---

## 📍 PHASE 2 : ARCHITECTURE (2-3 MIN)

### 🎯 OBJECTIF
Montrer que tu comprends comment ça marche techniquement.

### 📝 SCRIPT À LIRE

---

**[Pointer vers un schéma ou le tableau]**

> **"Voilà comment notre architecture fonctionne :**
>
> **ÉTAPE 1 - Génération des attaques**
> Un utilisateur malveillant envoie une requête suspecte à notre serveur intentionnellement vulnérable. Par exemple, une injection SQL : `admin' OR '1'='1`
>
> **ÉTAPE 2 - Détection et logging**
> Notre serveur détecte la signature d'attaque et crée un **log structuré en JSON** qui contient :
> - L'IP de l'attaquant
> - L'URL demandée
> - Le type d'attaque (SQL Injection ou XSS)
> - L'heure exacte
>
> **ÉTAPE 3 - Transport et filtrage (Logstash)**
> Logstash, c'est notre **moteur d'analyse**. Il lit les logs bruts et applique des **filtres intelligents** pour identifier les patterns dangereux. Il normalise les données et les envoie à Elasticsearch.
>
> **ÉTAPE 4 - Indexation et stockage (Elasticsearch)**
> Elasticsearch est notre **base de données temps réel**. Elle crée des **index inverses** pour permettre des recherches ultra-rapides, même avec des millions de logs. Cela prend quelques millisecondes.
>
> **ÉTAPE 5 - Visualisation (Kibana)**
> Kibana, c'est l'**interface** que l'analyste utilise. Elle interroge Elasticsearch et affiche les résultats dans des **tableaux de bord dynamiques**. On peut voir les attaques en temps réel, les filtrer, les analyser.
>
> **Et c'est là qu'intervient le **Dashboard React** de Jordan : c'est une couche supplémentaire pour une visualisation personnalisée."**

---

### 🎨 CE QUE TU DOIS DESSINER/POINTER

```
Attaquant → Serveur Vuln → Logstash (filtre) → Elasticsearch (indexe) → Kibana (affiche)
                                                                              ↓
                                                                       Dashboard React
```

### ✅ POINTS CLÉS À DIRE
- ✓ "Logstash c'est le **moteur** (filtre + normalise)"
- ✓ "Elasticsearch c'est le **stockage** (index inverses = rapide)"
- ✓ "Kibana c'est la **visualisation** (interface temps réel)"
- ✓ "Tout est dans **Docker** pour la portabilité"

---

## 📍 PHASE 3 : DÉMONSTRATION EN LIVE (6-7 MIN)

### 🎯 OBJECTIF
Montrer que le système fonctionne réellement. C'est la partie la plus importante.

### 📝 ORDRE DES ÉTAPES

#### **ÉTAPE 1 : Vérifier que l'infrastructure tourne (30 sec)**

**[Tu ouvres un terminal]**

```bash
# Commande à exécuter
docker-compose ps
```

**Ce que tu dis :**
> "Voyez, les trois conteneurs (Elasticsearch, Logstash, Kibana) tournent tous. Le statut est 'Up'. Ça signifie que notre infrastructure est opérationnelle."

---

#### **ÉTAPE 2 : Ouvrir Kibana (1 min)**

**[Tu ouvres le navigateur]**

```
URL : http://localhost:5601
```

**Ce que tu dis :**
> "Voilà Kibana. On voit l'interface d'accueil. Maintenant, on va aller dans la section 'Discover' ou 'Logs' pour voir les attaques enregistrées. Kibana communique directement avec Elasticsearch pour récupérer les données."

**[Tu navigues dans Kibana]**
- Clique sur "Discover" (ou la section qui affiche les logs)
- Sélectionne l'index "django-logs-main"

---

#### **ÉTAPE 3 : Montrer les logs existants (1 min)**

**Ce que tu dis :**
> "Ici, on voit les logs existants. Chaque ligne représente une requête qui a été reçue par notre serveur. On peut voir :
> - L'heure (@timestamp)
> - Le message de la requête
> - Le type d'attaque (si détecté)
> - La gravité
> 
> On peut chercher, filtrer, et trier en temps réel. C'est ça la puissance d'Elasticsearch."

---

#### **ÉTAPE 4 : Envoyer une attaque XSS et la voir en temps réel (2 min)**

**[Tu ouvres un autre terminal OU directement une requête HTTP]**

```bash
# Remplace par l'URL de ton serveur vulnérable
curl "http://localhost:3000/search?q=<script>alert('XSS')</script>"
```

**OU si c'est une interface web :**
```
Ouvrir : http://localhost:3000/search
Entrer dans le champ de recherche : <script>alert('XSS')</script>
```

**Ce que tu dis :**
> "Je viens d'envoyer une requête XSS. Attendez quelques secondes... Et voilà ! Le log apparaît dans Kibana en temps réel ! Vous voyez la requête avec le type 'XSS' ? C'est notre système de détection qui a fonctionné. Logstash a appliqué le filtre regex, Elasticsearch l'a indexée, et Kibana l'affiche."

**[Actualiser Kibana pour montrer le nouveau log]**

---

#### **ÉTAPE 5 : Envoyer une attaque SQL Injection (2 min)**

```bash
# SQL Injection
curl "http://localhost:3000/login?user=admin' OR '1'='1"
```

**Ce que tu dis :**
> "Maintenant, une injection SQL. C'est un classique des attaques web. On envoie... Et regardez ! Un nouveau log apparaît avec le type 'SQL Injection'. Notre regex a détecté le pattern `' OR`. C'est notre middleware de détection qui a fonctionné."

---

#### **ÉTAPE 6 : Montrer le Dashboard React (1 min) [OPTIONNEL]**

**Si Jordan est présent ou si c'est prêt :**

```
URL : http://localhost:4000/api/attacks (ou le Dashboard React)
```

**Ce que tu dis :**
> "Et voilà notre Dashboard React personnalisé. Il fait une requête à notre API qui interroge Elasticsearch. On voit un résumé des attaques filtrées par type. C'est une couche de visualisation supplémentaire pour les besoins spécifiques de notre projet."

---

### ⚠️ CONTINGENCY PLAN (Si quelque chose ne marche pas)

**Si server_direct.js ne tourne pas :**
> "Ah, le serveur vulnérable n'est pas accessible en ce moment, mais regardez : on voit déjà des logs d'attaques précédentes dans Kibana. Ça montre que le système fonctionne et stocke les données."

**Si Kibana n'affiche rien :**
> "Les logs sont là dans Elasticsearch (on peut vérifier via la CLI), mais Kibana met peut-être quelques secondes à les afficher. C'est normal avec la volumétrie. Regardez, je rafraîchis..."

**Si rien ne marche :**
> "Techniquement parlant, voilà ce que vous verriez. Les logs apparaîtraient en temps réel comme ceci [montrer un screenshot préparé à l'avance]."

---

## 📍 PHASE 4 : TRANSITION VERS LE GROUPE (30 sec)

**Ce que tu dis :**
> "Voilà pour la démonstration technique. Maintenant, laissez-moi passer la parole à mes collègues pour qu'ils expliquent leurs contributions spécifiques."

---

## 🎓 QUESTIONS COURANTES ET RÉPONSES

### ❓ **Q1 : "Comment avez-vous détecté les attaques ?"**

**Ta réponse :**
> "Nous avons utilisé des **expressions régulières (regex)** pour identifier les signatures d'attaques. Par exemple, pour SQL Injection, on cherche les patterns comme `' OR`, `--`, `UNION`. Pour XSS, on cherche `<script>`, `alert(`. Ces patterns sont appliqués dans notre middleware Node.js ET dans les filtres Logstash."

---

### ❓ **Q2 : "Pourquoi Docker et pas installer directement ?"**

**Ta réponse :**
> "Docker apporte 3 avantages majeurs :
> 1. **Portabilité** : Chacun de vous peut relancer nos conteneurs sans aucune configuration
> 2. **Isolation** : Elasticsearch, Logstash et Kibana sont isolés, zéro conflit de dépendances
> 3. **Reproductibilité** : Ça marche exactement pareil en prod qu'en dev
> 
> Avec WSL 2, nous disposons du noyau Linux nécessaire, et tous les conteneurs partagent cette base."

---

### ❓ **Q3 : "Pourquoi Elasticsearch plutôt qu'une base de données classique (MySQL) ?"**

**Ta réponse :**
> "Parce qu'Elasticsearch est optimisé pour :
> 1. **Les volumes massifs** : Des millions de logs indexés en temps réel
> 2. **Les recherches rapides** : Grâce aux index inverses, une recherche prend quelques ms
> 3. **L'analyse** : Les agrégations et les statistiques sont native
> 
> MySQL serait trop lent pour une visualisation temps réel avec notre volumétrie."

---

### ❓ **Q4 : "Comment avez-vous intégré tout le groupe si tout le monde n'a pas la même machine ?"**

**Ta réponse :**
> "Bonne question. Jordan a le Dashboard React qui s'exécute sur sa machine. Il fait des requêtes HTTP à notre Elasticsearch. Grâce à Docker, Elasticsearch expose ses APIs publiques. Tout communique via les APIs REST. C'est l'architecture SOA (Service-Oriented Architecture) : chaque service est indépendant."

---

### ❓ **Q5 : "Qu'est-ce que vous feriez en production ?"**

**Ta réponse :**
> "En production, nous ferions :
> 1. Déployer sur un cloud (AWS, Azure, GCP)
> 2. Configurer Kibana avec authentification (actuellement désactivée)
> 3. Augmenter les ressources Elasticsearch (cluster mode)
> 4. Ajouter des indices hot-warm-cold pour archiver les vieux logs
> 5. Configurer des alertes temps réel avec Kibana Alerting"

---

## ✅ CHECKLIST AVANT DE PRÉSENTER

```
☐ J'ai testé docker-compose ps (infrastructure OK)
☐ J'ai testé Kibana sur http://localhost:5601
☐ J'ai testé une attaque XSS (apparaît dans Kibana)
☐ J'ai testé une attaque SQLi (apparaît dans Kibana)
☐ J'ai mémorisé les 3 points clés : "Logstash = moteur, ES = base, Kibana = vue"
☐ J'ai préparé 2-3 requêtes d'attaque à copier-coller (pas de risque d'erreur)
☐ J'ai les URLs principales en favoris du navigateur
☐ Mon groupe et moi avons confirmé la répartition des rôles
☐ Je vais arriver 10 min en avance pour test final
```

---

## 🎯 TES 5 RÈGLES D'OR À RETENIR

1. **Parle lentement** (20-30% plus lent que d'habitude)
2. **Contact visuel** avec le jury
3. **Démo = plus important que les slides** (montrer > raconter)
4. **Sois confiant** (même si quelque chose ne marche pas, c'est normal)
5. **Fais participer ton groupe** (transitions claires, chacun son rôle)

---

## 💡 NOTES PERSONNELLES

- Gael : Tu es le "maestro" de la présentation. Tu dois mener le timing.
- Alphonse : Backend et filtres - peux parler 2-3 min sur la détection
- Jordan : Dashboard React - peux parler 1-2 min sur la visualisation perso
- Belvine : DevOps et déploiement - support + Q&A
- Asnath : Rapport - support + Q&A

---

**Bonne présentation Gael ! 🚀**
