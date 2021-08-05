import validate from '../validate';
import { errorMessage } from '../consts';
import { incompleteInput, validInput } from './test-contants';

describe('Ceck if validate propperly', () => {
  it("an Input that contains only 'END' should be returning the same imput", () => {
    expect(validate(['END'])).toEqual(['END']);
  });

  it('an Input that contains only an empty line should be returning an error messaje', () => {
    expect(validate([''])).toEqual([errorMessage]);
  });

  it("an Input that not ends with the 'END' line should be returning an error messaje", () => {
    expect(validate(incompleteInput)).toEqual([errorMessage]);
  });

  it('an Input with an invalid line  should be returning an error messaje', () => {
    expect(validate([...incompleteInput, '', 'END'])).toEqual([errorMessage]);
  });

  it('a valid Input should return the same input', () => {
    expect(validate(validInput)).toEqual([...incompleteInput, 'END']);
  });
});
