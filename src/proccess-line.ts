import { runCommand } from "./run-commad";
import { Record } from "./types";

export const processLines = (lines:Array<string>, record: Record) => lines.reduce((acc:Array<string>,line:string):Array<string>=> {
    const outputLines = runCommand(line, record);
    return [...acc, ...outputLines];
},[]);