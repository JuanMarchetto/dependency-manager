import {status} from "../consts";
import {Record} from "../types";

export const runInstallCommand = (line: string, record: Record, splited: string[]) => {
    const installOutput = [line];
    const componentIndex = record.components.findIndex(item => item.name === splited[1]);
    if (componentIndex >= 0) {
        if (record.components[componentIndex].status === status.INSTALLED) {
            installOutput.push(`${record.components[componentIndex].name} is already installed`);
        }else{
        implicitInstall(record, componentIndex, installOutput);
        installOutput.push(`Installing ${record.components[componentIndex].name}`);
        record.components = [
            ...record.components.filter(item => item.name !== record.components[componentIndex].name),
            {...record.components[componentIndex], status: status.INSTALLED}
            ];
        }
    } else {
        record.components = [...record.components, {
            name: splited[1],
            dependencies: [],
            status: status.INSTALLED,
        }];
        installOutput.push(`Installing ${splited[1]}`);
    }
    return installOutput;
}

const implicitInstall = (record: Record, componentIndex: number, installOutput: string[]) => {
    for (const dependency in record.components[componentIndex].dependencies) {
        const found = record.components.findIndex(item => item.name === record.components[componentIndex].dependencies[dependency]);
        if (found >= 0 && record.components[found].status === status.NOT_INSTALLED) {
            installOutput.push(`Installing ${record.components[found].name}`);
            implicitInstall(record, found, installOutput);
            record.components = [
                ...record.components.filter(item => item.name !== record.components[found].name),
                {...record.components[found], status: status.IMPLICITLY_INSTALLED}
            ]
        }
    }
}

