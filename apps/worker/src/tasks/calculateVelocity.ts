import type { JobHelpers } from 'db-background-job';
import type { CalculateVelocityPayload } from 'domain-interfaces';
import { db } from 'db';
import { createPubsubClient } from 'db-pubsub';
import { buildWorker } from '../utils/worker-user';
import { getOrThrow } from 'core-domain/lib';

module.exports = async function calculateVelocity(
  payload: CalculateVelocityPayload,
  helpers: JobHelpers
) {
  const { projectId } = payload;
  const { logger } = helpers;

  logger.info(`calculateVelocity, with ${projectId}`);
  const project = await getOrThrow(db.project.findBy({ id: projectId }));

  if (project == null) return;

  // project.boardStatus.velocity;

  logger.info(`calculateVelocity, with ${projectId}`);
  logger.info(`calculateVelocity, hoge122345678`);

  const stories = await getOrThrow(db.story.findMany({ project }));
  logger.info(`calculateVelocity, length ${stories.nodes.length}`);
  if (!stories.nodes.length) {
    logger.info(`calculateVelocity, length = 0`);
    return;
  }

  const story = stories.nodes[0];

  const pubsub = createPubsubClient();
  pubsub.story.publish({
    object: story,
    triggeredBy: buildWorker(),
  });
};
