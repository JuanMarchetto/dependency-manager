import {status} from "../consts";

export const runInstallCommand = (line: string, record: any[], splited: string[]) => {
    const installOutput = [line];
    const componentIndex = record.findIndex(item => item.name === splited[1]);
    if (componentIndex >= 0) {
        for (const dependency in record[componentIndex].dependencies) {
            const found = record.findIndex(item => item.name === record[componentIndex].dependencies[dependency]);
            if (found >= 0 && record[found].status !== status.INSTALLED) {
                record[found].status = status.IMPLICITLY_INSTALLED;
                installOutput.push(`Installing ${record[found].name}`);
            }
        }
        record[componentIndex].status = status.INSTALLED;
        installOutput.push(`Installing ${record[componentIndex].name}`);
    } else {
        record.push({
            name: splited[1],
            dependencies: [],
            status: status.INSTALLED
        });
    }
    return installOutput;
}