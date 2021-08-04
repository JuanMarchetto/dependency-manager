import { commadNames, errorMessage } from './consts';

const isValidEnd = (lines) => lines[lines.length - 1] === 'END';
const linesStartWithCommand = (lines) => lines
  .slice(0, lines.length - 1)
  .every((line) => commadNames.includes(line.split(' ')[0]));

const isValid = (lines) => isValidEnd(lines) && linesStartWithCommand(lines);

const validate = (lines: Array<string>): Array<string> => (isValid(lines) ? lines : [errorMessage]);

export default validate;
