import { quickAddJob } from 'graphile-worker';

export const addJob = <T>(taskId: string, payload: T) => {
  console.log('quick add job', { taskId, payload });
  quickAddJob(
    // makeWorkerUtils options
    { connectionString: process.env.DATABASE_URL },

    // Task identifier
    taskId,

    // Payload
    payload
  ).catch(err => {
    console.error(err);
    process.exit(1);
  });
};
