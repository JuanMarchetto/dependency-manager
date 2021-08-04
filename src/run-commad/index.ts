import {runDependCommand} from "./run-depend-command";
import {runListCommand} from "./run-list-command";
import {runRemoveCommand} from "./run-remove-command";
import {runInstallCommand} from "./run-install-command";
import {Record} from "../types";

export const runCommand=(line:string, record:Record):Array<string>=>{
    const splited = line.split(" ").filter(word=>word!==" ");
    switch (splited[0]) {
        case "DEPEND":
            return runDependCommand(record, splited, line);
        case "LIST":
            return runListCommand(record);
        case "REMOVE":
            return runRemoveCommand(line, record, splited);
        case "INSTALL":
            return runInstallCommand(line, record, splited);
        default:
            return [line];
    }
};
