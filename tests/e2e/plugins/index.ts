export interface EnvTypes {
  ENV_1: string;
}

interface ResolvedConfigOptions extends Omit<Cypress.ResolvedConfigOptions, 'env'> {
  env: EnvTypes;
}

export default function (on: any, config: ResolvedConfigOptions) {
  config.env.ENV_1 = 'env1';

  return config;
}
