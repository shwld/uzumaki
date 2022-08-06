import fastify from 'fastify';
import fastifyNextJS from '@fastify/nextjs';

const app = fastify();

app.register(fastifyNextJS).after(() => {
  // (fastify as any).next('/hello');
});

app.listen({ port: 5000 }, err => {
  if (err) throw err;
  console.log('Server listening on http://localhost:5000');
});
