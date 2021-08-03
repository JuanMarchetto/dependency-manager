import {status} from "../consts";

export const runDependCommand = (record: any[], splited: string[], line: string) => {
    const foundIndex = record.findIndex(item => item.name === splited[1]);
    if (foundIndex >= 0) {
        record[foundIndex].dependencies = [...splited.slice(2)];
    } else {
        record.push({
            name: splited[1],
            dependencies: splited.slice(2),
            status: status.NOT_INSTALLED
        });
    }
    return [line];
}