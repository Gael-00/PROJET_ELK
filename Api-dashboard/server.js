const express = require("express");
const { Client } = require("@elastic/elasticsearch");
const cors = require("cors");

const app = express();
app.use(cors());

const client = new Client({ 
    node: 'http://elasticsearch:9200' 
});

app.get("/api/attacks", async (req, res) => {
  try {
    const response = await client.search({
      index: 'django-logs-main',
      body: {
        query: { match_all: {} },
        size: 50,
        sort: [{ "@timestamp": { order: "desc" } }]
      }
    });

    const rawHits = response.body ? response.body.hits.hits : response.hits.hits;

    const cleanData = rawHits.map(hit => {
      const source = hit._source;
      const msg = (source.message || "").toLowerCase();
      
      // --- SÉCURITÉ HOSTNAME TOUT-TERRAIN ---
      let hostName = "Inconnu";
      if (source.host) {
        if (typeof source.host === 'string') {
          hostName = source.host;
        } else if (typeof source.host === 'object') {
          hostName = source.host.name || source.host.hostname || "PC-Distant";
        }
      } else if (source.agent && source.agent.name) {
        hostName = source.agent.name; // Alternative si host est vide
      }

      // --- DÉTECTION XSS ET SQL AMÉLIORÉE ---
      let attackType = "Normal";
      if (msg.includes("or 1=1") || msg.includes("'") || msg.includes("%27") || msg.includes("--")) {
        attackType = "SQL";
      } else if (
        msg.includes("<script") || 
        msg.includes("%3cscript") || 
        msg.includes("alert(") || 
        msg.includes("<img") || 
        msg.includes("onerror")
      ) {
        attackType = "XSS";
      }

      return {
        id: hit._id,
        time: source["@timestamp"] || "N/A",
        message: source.message || "Pas de message",
        type: attackType,
        host: hostName
      };
    });

    res.json(cleanData);
  } catch (error) {
    console.error("Erreur API:", error.message);
    res.status(500).json({ error: "Erreur", details: error.message });
  }
});

app.listen(4000, () => {
  console.log("🚀 API SOC opérationnelle sur http://localhost:4000");
});