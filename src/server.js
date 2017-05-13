import path from 'path';
import express from 'express';
import historyApiFallback from 'express-history-api-fallback';

const rootDir = path.join(__dirname, '../');
const app = express();

app.use(express.static(rootDir));
app.use(historyApiFallback('index.html', { root: rootDir }));

export default app;