import { run } from 'graphile-worker';

export async function startWorker() {
  const runner = await run({
    connectionString: process.env.DATABASE_URL,
    concurrency: 5,
    // Install signal handlers for graceful shutdown on SIGINT, SIGTERM, etc
    noHandleSignals: false,
    pollInterval: 1000,
    // you can set the taskList or taskDirectory but not both
    // taskList: {
    //   hello: async (payload, helpers) => {
    //     const { name } = payload;
    //     helpers.logger.info(`Hello, ${name}`);
    //   },
    // },
    // or:
    taskDirectory: `${__dirname}/tasks`,
  });

  // Immediately await (or otherwise handled) the resulting promise, to avoid
  // "unhandled rejection" errors causing a process crash in the event of
  // something going wrong.
  await runner.promise;

  // If the worker exits (whether through fatal error or otherwise), the above
  // promise will resolve/reject.
}
