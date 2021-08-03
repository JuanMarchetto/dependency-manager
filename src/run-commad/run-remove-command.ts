import {status} from "../consts";

export const runRemoveCommand = (line: string, record: any[], splited: string[]) => {
    const removeOutput = [line];
    const found = record.findIndex(item => item.name === splited[1]);
    if (found >= 0) {
        if (record[found].dependencies.filter(({ name }) => record.some(item => item.name === name && item.status !== status.NOT_INSTALLED)).length === 0) {
            record[found].status = status.NOT_INSTALLED;
            removeOutput.push(`${splited[1]} is removed`);
        }
    }
    return removeOutput;
}