import type { JobHelpers } from 'graphile-worker';
import type { CalculateVelocityPayload } from 'graphql-resolvers';
import { db } from 'db';
import { createPubsubClient } from 'db-pubsub';
import { buildWorker } from 'core-domain';

module.exports = async function calculateVelocity(
  payload: CalculateVelocityPayload,
  helpers: JobHelpers
) {
  const { projectId } = payload;
  helpers.logger.info(`calculateVelocity, with ${projectId}`);
  const project = await db.project.findBy({ id: projectId });

  if (project == null) return;

  project.boardStatus.velocity;

  helpers.logger.info(`calculateVelocity, with ${projectId}`);

  const stories = await db.story.findMany({ project });
  if (!stories.nodes.length) {
    helpers.logger.info(`calculateVelocity, length = 0`);
    return;
  }

  const story = stories.nodes[0];
  const pubsub = createPubsubClient();
  pubsub.story.publish({
    object: story,
    triggeredBy: buildWorker(),
  });
};
