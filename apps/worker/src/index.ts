import { startWorker } from 'db-background-job';

startWorker().catch(err => {
  console.error(err);
  process.exit(1);
});
