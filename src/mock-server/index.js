
const express = require('express');
const app = express();
const routes = require('./routes');

const PORT = 800;

app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Mock server running at http://localhost:${PORT}`);
});