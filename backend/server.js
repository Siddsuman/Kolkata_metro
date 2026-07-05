const express = require('express');
const cors = require('cors');

const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// Merge: New Garia == Kavi Subhash (kept for backward compatibility)
const alias = {
  "New Garia": "Kavi Subhash",
};

function normalize(st) {
  return alias[st] || st;
}

function loadDataset() {
  const p = path.join(__dirname, 'kolkata-metro-dataset.json');
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function buildGraphFromDataset(dataset) {
  const graph = {};
  const connections = dataset.connections || [];

  const ensureNode = (s) => {
    const ns = normalize(s);
    if (!graph[ns]) graph[ns] = [];
  };

  connections.forEach((c) => {
    if (!c || !c.from || !c.to) return;
    ensureNode(c.from);
    ensureNode(c.to);
  });

  connections.forEach((c) => {
    if (!c || !c.from || !c.to) return;
    const a = normalize(c.from);
    const b = normalize(c.to);
    graph[a].push({ to: b, line: c.line || null });
  });

  return graph;
}

// Dijkstra-like (line change penalty)
function findPath(graph, start, end) {
  start = normalize(start);
  end = normalize(end);

  if (!graph[start] || !graph[end]) return null;

  const dist = {};
  const pq = [[0, start, [start], []]];

  Object.keys(graph).forEach((s) => (dist[s] = Infinity));
  dist[start] = 0;

  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0]);
    const [cost, st, path, usedLines] = pq.shift();

    if (st === end) return { path, usedLines };

    for (const nb of graph[st] || []) {
      const newLine = nb.line;
      let newCost = cost + 1;

      if (usedLines.length > 0 && newLine !== usedLines[usedLines.length - 1]) {
        newCost += 2; // line change penalty
      }

      if (newCost < (dist[nb.to] ?? Infinity)) {
        dist[nb.to] = newCost;
        pq.push([newCost, nb.to, [...path, nb.to], [...usedLines, newLine]]);
      }
    }
  }

  return null;
}

// Demo platform data for interchangeTime estimation (optional)
const platformData = {
  "Dum Dum": { platform: "Platform 1", towards: "Kavi Subhash", interchangeTime: 0 },
  "Esplanade": { platform: "Platform 1", towards: "Kavi Subhash", interchangeTime: 4 },
  "Kavi Subhash": { platform: "Platform 1", towards: "Terminal", interchangeTime: 5 },
  "Noapara": { platform: "Platform 5", towards: "Barrackpore", interchangeTime: 4, lines: ["Pink", "Blue"] },
  "Sealdah": { platform: "Platform 2", towards: "Howrah", interchangeTime: 0 },
  "Majerhat": { platform: "Platform 3", towards: "Esplanade", interchangeTime: 0 },
};

let cached = null;
function getModel() {
  if (!cached) {
    const dataset = loadDataset();
    const graph = buildGraphFromDataset(dataset);
    cached = { dataset, graph };
  }
  return cached;
}

app.get('/lines', (req, res) => {
  const { dataset } = getModel();
  // Keep response shape compatible with earlier frontend usage.
  // Provide ids 1..N as object keys.
  const out = {};
  (dataset.lines || []).forEach((ln, idx) => {
    const key = String(idx + 1);
    out[key] = ln;
  });
  res.json(out);
});

app.get('/platforms', (req, res) => {
  res.json(platformData);
});

app.get('/route', (req, res) => {
  let { source, dest } = req.query;
  if (!source || !dest) return res.json({ route: [], message: 'Missing source or dest' });

  const { graph } = getModel();

  const result = findPath(graph, source, dest);
  if (!result) {
    // Debug: helpful during integration; remove later.
    console.log('DEBUG /route', { source, dest, hasSource: !!graph[source], hasDest: !!graph[dest] });
    return res.json({ route: [], message: 'No route found' });
  }


  const { path, usedLines } = result;

  let interchangePoints = [];
  let lineChanges = 0;

  for (let i = 1; i < usedLines.length; i++) {
    if (usedLines[i] !== usedLines[i - 1]) {
      lineChanges++;
      interchangePoints.push(path[i]);
    }
  }

  // Fare model (demo)
  const price = 5 + 2 * (path.length - 1);

  // Travel time estimation (demo)
  const baseHopMins = 2.5;
  const dwellMins = 0.5;
  const hops = Math.max(0, path.length - 1);
  const runningTimeMins = hops * (baseHopMins + dwellMins);

  const interchangeTimeMins = interchangePoints.reduce((sum, st) => {
    const ns = normalize(st);
    return sum + (platformData[ns]?.interchangeTime || 0);
  }, 0);

  const travelTimeMins = runningTimeMins + interchangeTimeMins;

  const segments = [];
  for (let i = 0; i < path.length - 1; i++) {
    const from = path[i];
    const to = path[i + 1];
    const line = usedLines[i] || usedLines[usedLines.length - 1];
    const platformInfoTo = platformData[normalize(to)] || { interchangeTime: 0 };

    const isInterchange = interchangePoints.includes(to);
    const segmentTime = (baseHopMins + dwellMins) + (isInterchange ? (platformInfoTo.interchangeTime || 0) : 0);

    segments.push({ from, to, line, timeMins: segmentTime });
  }

  const routeWithLines = path.map((station, idx) => {
    const info = platformData[normalize(station)] || { platform: 'Platform 1', towards: 'Unknown', interchangeTime: 0 };
    return {
      station,
      line: usedLines[idx] || usedLines[usedLines.length - 1],
      platform: info.platform,
      towards: info.towards,
      interchangeTime: info.interchangeTime,
    };
  });

  res.json({
    route: path,
    routeWithLines,
    segments,
    travelTimeMins,
    totalStations: path.length - 1,
    lineChanges,
    interchangePoints,
    price,
  });
});

app.listen(PORT, () => console.log('Server running on ' + PORT));

