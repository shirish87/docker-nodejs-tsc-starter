
import * as express from 'express';

const app = express();

app.get('/', (req, res) => res.json({ success: true }));

app.listen(process.env.PORT, () => console.debug(`Listening on port ${process.env.PORT}`));
