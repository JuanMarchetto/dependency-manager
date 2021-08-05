import createComponentsManager from '../index';
import { sampleOutput, validInput } from './test-contants';

describe('ComponentsManager should return "END" when the input just contains "END"', () => {
  it('should return an objets', () => {
    const componentsManager = createComponentsManager();
    expect(componentsManager.process('END')).toBe('END');
  });

  it('Sample input should return the sample output', () => {
    const componentsManager = createComponentsManager();
    expect(componentsManager.process(validInput.join('\n'))).toBe(sampleOutput);
  });
});
