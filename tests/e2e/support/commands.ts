import type { EnvTypes } from '../plugins';

declare global {
  namespace Cypress {
    interface Cypress {
      env(key: string & keyof EnvTypes): any;
    }
    interface Chainable {
      abc: () => void;
    }
  }
}

export function abc() {}

Cypress.Commands.add('abc', abc);
