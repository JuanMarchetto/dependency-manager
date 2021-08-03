import { runCommand } from "./run-commad";
export const processLines = (lines:Array<string>, record: Array<any>) => lines.reduce((acc:Array<string>,line:string):Array<string>=> {
    const outputLines = runCommand(line, record);
    return [...acc, ...outputLines];
},[]);