import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

function App() {
  const [attacks, setAttacks] = useState([]);
  const [filter, setFilter] = useState("");
  const [countdown, setCountdown] = useState(5);

  const fetchData = () => {
    // Ajout de /api pour correspondre au test navigateur réussi
    axios.get("http://localhost:4000/api/attacks")
      .then(res => {
        setAttacks(res.data);
        setCountdown(5);
      })
      .catch(err => console.error("Erreur Fetch:", err));
  };

  useEffect(() => {
    fetchData();
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          fetchData();
          return 5;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Correction : utilise 'a.type' au lieu de 'a.attack_type'
  const filtered = attacks.filter(a =>
    a.type?.toLowerCase().includes(filter.toLowerCase()) || 
    a.message?.toLowerCase().includes(filter.toLowerCase())
  );

  const total = filtered.length;
  const sql = filtered.filter(a => a.type === "SQL").length;
  const normal = filtered.filter(a => a.type === "Normal").length;

  const countByType = () => {
    const counts = {};
    filtered.forEach(a => {
      const type = a.type || "unknown";
      counts[type] = (counts[type] || 0) + 1;
    });
    return Object.keys(counts).map(key => ({ type: key, count: counts[key] }));
  };

  const topIPs = () => {
    const counts = {};
    filtered.forEach(a => {
      const ip = a.host || "Inconnu";
      counts[ip] = (counts[ip] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([ip, count]) => ({ ip, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", background: "black", minHeight: "100vh", color: "white" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ color: "white" }}>🚨 Tableau de bord du cyber attack</h1>
        <div style={{ color: "yellowgreen", fontWeight: "bold", border: "1px solid yellowgreen", padding: "5px 10px", borderRadius: "5px" }}>
          MàJ dans : {countdown}s
        </div>
      </div>

      <input
        placeholder="Filtrer (SQL, Normal...)"
        onChange={(e) => setFilter(e.target.value)}
        style={{ padding: "10px", marginBottom: "10px", width: "250px", borderRadius: "5px", border: "1px solid #ccc", background: "#333", color: "white" }}
      />

      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <div style={cardStyle}>
          <h3>Total Logs</h3>
          <p style={{ fontSize: "25px", fontWeight: "bold" }}>{total}</p>
        </div>
        <div style={cardStyle}>
          <h3>SQL Injection</h3>
          <p style={{ color: "red", fontSize: "25px", fontWeight: "bold" }}>{sql}</p>
        </div>
        <div style={cardStyle}>
          <h3>Normal Logs</h3>
          <p style={{ color: "yellowgreen", fontSize: "25px", fontWeight: "bold" }}>{normal}</p>
        </div>
      </div>

      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ ...cardStyle, flex: 5.4 }}>
          <h3>Répartition des logs</h3>
          <BarChart width={400} height={400} data={countByType()}>
            <XAxis dataKey="type" stroke="white" />
            <YAxis stroke="white" />
            <Tooltip contentStyle={{ background: "darkslategray", border: "none" }} />
            <Bar dataKey="count" fill="yellowgreen" />
          </BarChart>
        </div>

        <div style={{ ...cardStyle, flex: 2.5 }}>
          <h3>Top Hostnames/IPs</h3>
          {topIPs().map((ip, i) => (
            <p key={i} style={{ borderBottom: "1px solid #444", paddingBottom: "5px" }}>
              {ip.ip} <span style={{ color: "yellowgreen" }}>→ {ip.count}</span>
            </p>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "50px" }}>
        <h3 className="effet">Journal des événements by : jordantshitshi@icloud.com</h3>
        {filtered.map((a, i) => (
          <div key={i} style={{
            background: "darkslategray",
            marginBottom: "10px",
            padding: "15px",
            borderRadius: "15px",
            boxShadow: "0 2px 5px rgba(240,248,255, 0.1)",
            borderLeft: a.type === "SQL" ? "5px solid red" : "5px solid yellowgreen",
            borderRight: a.type === "SQL" ? "5px solid red" : "5px solid yellowgreen"
          }}>
            <p><strong>Host :</strong> {a.host}</p>
            <p><strong>Type :</strong> <span style={{ color: a.type === "SQL" ? "red" : "yellowgreen" }}>{a.type}</span></p>
            <p><strong>Date :</strong> {a.time}</p>
            <p style={{ fontSize: "0.9em", color: "#ccc" }}><strong>Message :</strong> {a.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const cardStyle = {
  background: "darkslategray",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 10px black",
  flex: 3,
  borderLeft: "black solid 5px",
  borderRight: "black solid 5px",
  color: "white"
};

export default App;