const express = require("express");
const { Client } = require("@elastic/elasticsearch");
const cors = require("cors");

const app = express();
app.use(cors());

// Connexion adaptée à la version 7.17 installée
const client = new Client({ 
    node: 'http://192.168.0.200:9200' 
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

    // Formatage pour correspondre exactement aux besoins du Dashboard
    const cleanData = rawHits.map(hit => {
      const source = hit._source;
      const msg = source.message || "";
      return {
        id: hit._id,
        time: source["@timestamp"] || "N/A",
        message: msg,
        // On définit le type pour que React puisse filtrer/compter
        type: msg.includes("OR") || msg.includes("%27") ? "SQL" : "Normal",
        host: source.host ? (source.host.name || source.host) : "Inconnu"
      };
    });

    res.json(cleanData);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Erreur", details: error.message });
  }
});

app.listen(4000, () => {
  console.log("🚀 API SOC opérationnelle sur http://localhost:4000");
});