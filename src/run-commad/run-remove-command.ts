import {status} from "../consts";

export const runRemoveCommand = (line: string, record: any[], splited: string[]) => {
    const removeOutput = [line];
    const found = record.findIndex(item => item.name === splited[1]);
    if (found >= 0) {
        if (!record.some(item => item.dependencies.includes(splited[1]) && item.status !== status.NOT_INSTALLED)) {
            removeOutput.push(`Removing ${splited[1]}`);
            record[found].status = status.NOT_INSTALLED;
            removeUnusedDependencies(record, removeOutput);
        }else{
            removeOutput.push(`${splited[1]} is still needed`);
        }
    }
    return removeOutput;
}


const implicitRemove = (item: any, record: any[],removeOutput:Array<string>) => {
     const found = record.findIndex(component => component.name === item.name);
    if (found >= 0) {
        record[found].status = status.NOT_INSTALLED;
        removeUnusedDependencies(record, removeOutput);
        removeOutput.push(`Removing ${record[found].name}`);
    } 
}

const removeUnusedDependencies = (record: any[], removeOutput: Array<string>) =>
    record.filter(item => item.status === status.IMPLICITLY_INSTALLED && !record.some(component => component.dependencies.includes(item.name) && component.status !== status.NOT_INSTALLED)).map(item => implicitRemove(item, record, removeOutput));

