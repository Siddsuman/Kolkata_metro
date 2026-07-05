const fs = require('fs');
const path = require('path');

const DATASET_PATH = path.join(__dirname, 'kolkata-metro-dataset.json');

function loadDataset() {
  const raw = fs.readFileSync(DATASET_PATH, 'utf8');
  const dataset = JSON.parse(raw);

  const linesById = new Map();
  (dataset.lines || []).forEach((ln) => {
    const id = ln.id || ln.name;
    linesById.set(id, { ...ln, id });
  });

  return {
    dataset,
    linesById,
  };
}

module.exports = { loadDataset };

