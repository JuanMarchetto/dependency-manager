import { createComponentsManager } from '../index';
import { sampleOutput, validInput } from './testContants';

describe('Check if componentsManager returns an obnjets', () => {
  it('should return an objets', () => {
    const componentsManager = createComponentsManager();
    const output = componentsManager.procces('END');
    expect(output).toBe('END');
  });

  it('Sample input should return the sample output', () => {
    const componentsManager = createComponentsManager();
    const output = componentsManager.procces(validInput.join('\n'));
    expect(output).toBe(sampleOutput);
  });
});
