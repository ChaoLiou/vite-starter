import { createServer } from 'miragejs';

export default async function makeServer({ environment = 'test' }) {
  return createServer({
    environment,

    factories: {},

    models: {},

    routes() {
      this.namespace = 'api/v1';
    },

    seeds(server) {
      server.db.loadData({});
    },
  });
}
