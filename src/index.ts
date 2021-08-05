import validate from './validate';
import processLines from './proccess-line';
import { Record, Component } from './types';

const createComponentsManager = () => {
  const record : Record = {
    components: [],
    updateComponents(component: Component) {
      this.components = [
        ...this.components.filter((c) => c.name !== component.name),
        component,
      ];
    },
  };

  return {
    process: (input: string): string => processLines(validate(input.split('\n')), record).join('\n'),
  };
};

export default createComponentsManager;
