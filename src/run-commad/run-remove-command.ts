import {status} from "../consts";
import {Record, Component} from "../types";

export const runRemoveCommand = (line: string, record: Record, splited: string[]) => {
    const removeOutput = [line];
    const found = record.components.findIndex(item => item.name === splited[1]);
    if (found >= 0) {
        if (!record.components.some(item => item.dependencies.includes(splited[1]) && item.status !== status.NOT_INSTALLED)) {
            removeOutput.push(`Removing ${splited[1]}`);
            record.components[found].status = status.NOT_INSTALLED;
            removeUnusedDependencies(record, removeOutput);
        }else{
            removeOutput.push(`${splited[1]} is still needed`);
        }
    }
    return removeOutput;
}


const implicitRemove = (item: Component, record: Record,removeOutput:Array<string>) => {
     const found = record.components.findIndex(component => component.name === item.name);
    if (found >= 0) {
        record.components[found].status = status.NOT_INSTALLED;
        removeUnusedDependencies(record, removeOutput);
        removeOutput.push(`Removing ${record.components[found].name}`);
    } 
}

const removeUnusedDependencies = (record: Record, removeOutput: Array<string>) =>
    record.components.filter(item => item.status === status.IMPLICITLY_INSTALLED && !record.components.some(component => component.dependencies.includes(item.name) && component.status !== status.NOT_INSTALLED)).map(item => implicitRemove(item, record, removeOutput));

