import { commadNames, errorMessage } from "./consts";

const isValidEnd= (lines) => lines[lines.length-1] === "END";
const linesStartWithCommand = (lines) => lines.slice(0,lines.length - 1).every(line => commadNames.includes(line.split(" ")[0]));

export const validate = (lines:Array<string>):Array<string> =>  isValidEnd(lines) && linesStartWithCommand(lines) ? lines : [errorMessage];
