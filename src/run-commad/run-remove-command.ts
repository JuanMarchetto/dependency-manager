import {status} from "../consts";

export const runRemoveCommand = (line: string, record: any[], splited: string[]) => {
    const removeOutput = [line];
    const found = record.findIndex(item => item.name === splited[1]);
    if (found >= 0) {
        if (!record.some(item => item.dependencies.includes(splited[1]) && item.status !== status.NOT_INSTALLED)) {
            removeOutput.push(`Removing ${splited[1]}`);
            record[found].status = status.NOT_INSTALLED;
            removeOutput.push(`${splited[1]} is removed`);
        }else{
            removeOutput.push(`${splited[1]} is still needed`);
        }
    }
    return removeOutput;
}
