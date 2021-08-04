import validate from './validate';
import processLines from './proccess-line';
import { Record } from './types';

const createComponentsManager = () => {
  const record: Record = {
    components: [],
  };

  return {
    procces: (input:string):string => processLines(validate(input.split('\n')), record).join('\n'),
  };
};

export default createComponentsManager;
