
import * as express from 'express';
import * as Prometheus from 'prom-client';
import routes from './routes';


const defaultMetricsInterval = Prometheus.collectDefaultMetrics({ timeout: 5000 });

const reqDurationMetric = new Prometheus.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'path', 'code'],
  buckets: [0.10, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000, 10000]  // buckets for response time from 0.1ms to 500ms
});


const app = express();


app.get('/metrics', (req, res) => {
  res.set('Content-Type', Prometheus.register.contentType);
  res.end(Prometheus.register.metrics());
});


// before all app requests
app.use((req, res, next) => {
  res.locals._reqStartEpoch = Date.now();
  next();
});


app.use('/', routes);


// after all app requests
app.use((req, res, next) => {
  if (res.locals._reqStartEpoch > 0) {
    reqDurationMetric.labels(req.method, req.path, res.statusCode + '')
      .observe(Date.now() - res.locals._reqStartEpoch);
  }

  next();
});


const server = app.listen(process.env.PORT, () => {
  console.debug(`Listening on port ${process.env.PORT}`);
});


// Graceful shutdown
process.on('SIGTERM', () => {
  clearInterval(defaultMetricsInterval);

  server.close((err: Error) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    process.exit(0);
  });
});
