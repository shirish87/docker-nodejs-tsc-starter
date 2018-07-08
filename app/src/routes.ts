import * as express from 'express';

// app endpoints
const router = express.Router();


router.get('/', (req, res, next) => {
  res.json({ success: true });
  next();
});


export default router;
