# 🧠 AIDE-MÉMOIRE - RÉPONSES RAPIDES
## 30 Questions Courantes à la Soutenance

---

## 🔧 ARCHITECTURE & TECHNOS

### Q1 : C'est quoi ELK ?
**R:** Elasticsearch (base de données), Logstash (moteur de filtrage), Kibana (interface).

### Q2 : Pourquoi 3 services et pas un seul ?
**R:** Séparation des responsabilités : collecte, traitement, visualisation. Chacun fait une chose bien.

### Q3 : Qui collects les logs ?
**R:** Notre serveur Node.js crée les logs. Logstash les récupère. Elasticsearch les stocke. Kibana les affiche.

### Q4 : Pourquoi Logstash au milieu ?
**R:** Logstash filtre, normalise, enrichit les logs AVANT qu'ils n'aillent dans Elasticsearch. C'est l'intelligence du système.

### Q5 : Et si on mettait les logs directement dans Elasticsearch ?
**R:** Possible, mais moins flexible. Logstash permet d'appliquer des règles complexes, des enrichissements, des transformations.

### Q6 : Pourquoi pas une base de données SQL classique (MySQL) ?
**R:** SQL est bon pour les requêtes transactionnelles. Elasticsearch est optimisé pour les volumes massifs et les recherches temps réel.

### Q7 : Elasticsearch c'est plus rapide que MySQL ?
**R:** Pour les recherches oui (quelques ms vs plusieurs secondes avec SQL sur millions de logs). Mais c'est pas adapté aux transactions ACID.

---

## 🐳 DOCKER & INFRASTRUCTURE

### Q8 : Pourquoi Docker ?
**R:** Portabilité, isolation, reproductibilité. Ça marche pareil chez Gael, Jordan, ou en production.

### Q9 : Qu'est-ce que WSL 2 ?
**R:** Windows Subsystem for Linux 2 : un noyau Linux virtuel sur Windows. Docker en a besoin pour fonctionner sur Windows.

### Q10 : Les conteneurs partagent le noyau Linux de WSL 2 ?
**R:** Oui, c'est ça l'efficacité. Elasticsearch, Logstash, Kibana = 3 apps isolées mais sur le même OS.

### Q11 : Pourquoi pas installer directement sans Docker ?
**R:** Ça dépendrait de l'OS, des versions, des configurations machines. Docker garantit l'identique partout.

### Q12 : Docker-compose c'est quoi ?
**R:** Un fichier YAML qui orchestre plusieurs conteneurs. `docker-compose up -d` = démarre tout.

### Q13 : Comment les 3 conteneurs se parlent ?
**R:** Via un réseau Docker virtuel. `elasticsearch:9200` = Logstash peut atteindre Elasticsearch par ce nom.

### Q14 : Est-ce que les données persistent si on fait `docker-compose stop` ?
**R:** Oui, les volumes Docker persistent. Elasticsearch est sauvegardé sur le disque.

---

## 🔍 DÉTECTION DES ATTAQUES

### Q15 : Comment vous détectez les attaques ?
**R:** Regex (expressions régulières) : on cherche les patterns dangereux (`' OR`, `<script>`, etc.).

### Q16 : Vous détectez 100% des attaques ?
**R:** Non, juste les patterns connus. En production, on utiliserait du machine learning pour détecter des anomalies.

### Q17 : Pourquoi XSS et SQLi et pas d'autres attaques ?
**R:** C'était le scope du projet. En production, on ajouterait : Path Traversal, Buffer Overflow, etc.

### Q18 : Qui écrit les regex de détection ?
**R:** Alphonse les a écrites. On peut les modifier facilement selon les nouvelles menaces.

### Q19 : Les regex c'est pas trop lent ?
**R:** Non, c'est très rapide. Même avec des millions de logs, c'est négligeable comparé à Elasticsearch.

### Q20 : Comment vous générez les requêtes d'attaque ?
**R:** On envoie des requêtes HTTP avec les payloads. Exemple : `curl "http://localhost:3000/login?user=admin' OR '1'='1"`

---

## 🔢 ELASTICSEARCH & INDEXATION

### Q21 : Qu'est-ce qu'un index Elasticsearch ?
**R:** Comme une table SQL. Elle contient des documents (logs) avec des champs (@timestamp, message, type, etc.).

### Q22 : Comment Elasticsearch est si rapide ?
**R:** Index inverses : pour chaque mot, elle garde la liste des documents qui le contiennent. Accès direct = rapide.

### Q23 : Combien d'indices vous avez ?
**R:** On utilise `django-logs-main` pour stocker tous les logs. On peut en créer d'autres si besoin de isoler par type.

### Q24 : Vous archivez les vieux logs ?
**R:** Pas dans cette démo, mais en production on ferait du hot-warm-cold : nouveaux logs en fast storage, vieux logs en slow storage.

### Q25 : Elasticsearch c'est une vraie DB ou juste du cache ?
**R:** C'est une vraie DB. Les données sont persistées sur disque via les shards et replicas.

---

## 📊 KIBANA & VISUALISATION

### Q26 : Kibana c'est obligatoire ou on peut utiliser autre chose ?
**R:** Pas obligatoire. N'importe quelle app peut interroger Elasticsearch. Jordan a fait un dashboard React custom.

### Q27 : Kibana peut faire quoi ?
**R:** Rechercher, filtrer, créer des dashboards, des alertes, des rapports. C'est l'interface d'analyse.

### Q28 : Kibana et Elasticsearch doivent être sur la même machine ?
**R:** Non, Kibana peut être à distance. Elle contacte Elasticsearch par HTTP (port 9200).

### Q29 : Comment Kibana sait qu'il y a un nouvel attaque ?
**R:** Kibana interroge Elasticsearch. Si on rafraîchit, ça montre les nouveaux logs indexés.

### Q30 : C'est quoi le dashboard React ?
**R:** Une couche de visualisation custom faite par Jordan. Elle interroge aussi Elasticsearch mais affiche les données selon ses propres règles.

---

## 🚀 PRODUCTION & SCALABILITÉ

### Q31 : Ça fonctionne en production ?
**R:** Oui, ELK est utilisé par Airbnb, Netflix, etc. Avec plus de ressources et de configuration.

### Q32 : Comment vous scaleriez ça si on avait 1 million de logs/jour ?
**R:** Cluster Elasticsearch (multiple nodes), sharding, réplication, balancing. Tout est possible avec Elastic.

### Q33 : Vous feriez une base de données pour les utilisateurs, alertes, etc. ?
**R:** Oui, en prod : PostgreSQL pour les données critiques, Redis pour le cache, Elasticsearch juste pour les logs.

### Q34 : Comment vous géreriez les faux positifs ?
**R:** Machine learning, whitelists, règles intelligentes. Actuellement, on fait du pattern matching basique.

### Q35 : RGPD/Conformité/Légalité ?
**R:** Important en production. Faut chiffrer les données, logs d'accès, destruction après X jours, etc.

---

## 🎯 POINTS D'APPUI

### Pour briller aux questions :

✅ **"Nous avons utilisé une architecture microservices avec Docker"**
✅ **"Logstash applique des filtres sophistiqués basés sur regex"**
✅ **"Elasticsearch indexe les données pour des recherches sub-milliseconde"**
✅ **"La scalabilité est horizontale : on ajoute juste des nodes"**
✅ **"Tout est temps réel et reproductible grâce à Docker"**

❌ **À ÉVITER :**
❌ "On a juste installé et ça marche"
❌ "On sait pas vraiment comment ça fonctionne en détail"
❌ "Hum..."

---

## 💡 BONUS : QUESTIONS PIÈGES

### Q : "Et si Logstash plante ?"
**R:** Les logs s'accumulent dans le fichier d'entrée. Quand Logstash redémarre, il reprend où il s'était arrêté. (sincedb_path)

### Q : "Et si Elasticsearch plante ?"
**R:** Les données sont persistées. On relance le conteneur, les données sont toujours là.

### Q : "Pourquoi Port 5044 pour Logstash ?"
**R:** C'est le port Beats standard. On a choisi 5044 pour que les apps externes envoient les logs à ce port.

### Q : "Comment vous loggez les faux positifs ?"
**R:** On pourrait ajouter un champ `confirmed` dans les logs. L'analyste valide ou invalide les alertes.

### Q : "Et la latence réseau ? Ça affecte les performances ?"
**R:** Négligeable. HTTP c'est ultra rapide. Même à distance, c'est quelques ms.

---

## 📌 CHECKLIST MÉMOIRE

Avant de présenter, reprends cette liste :

```
✓ ELK = Elasticsearch + Logstash + Kibana
✓ Logstash = collecte + filtre
✓ Elasticsearch = indexe rapide
✓ Kibana = affiche
✓ Docker = portabilité
✓ Regex = détecte les patterns
✓ Index inverses = rapide
✓ En production = cluster mode
✓ Faux positifs = ML + whitelists
✓ RGPD = chiffrement + logs
```

---

## 🎓 MET À JOUR CES RÉPONSES

Si les jurés te posent une question pas dans cette liste :
1. **Réfléchis 2 secondes** (pas honte de silence)
2. **Réponds avec confiance** (même si approximatif)
3. **"En production on ferait..."** (super pour les cas limites)
4. **"Bonne question, on peut l'explorer après"** (si vraiment bloqué)

**Bon courage ! 🚀**
