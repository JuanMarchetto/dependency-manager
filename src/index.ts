import { validate } from "./validate";
import {status} from "./consts";

export const createComponentsManager = () => {
    const record =[];

    const runCommand=(line:string):Array<string>=>{
        const splited = line.split(" ").filter(word=>word!==" ");
        switch (splited[0]) {
            case "DEPEND":
                const foundIndex = record.findIndex(item=>item.name===splited[1]);
                if (foundIndex>=0) {
                    record[foundIndex].dependencies = [...splited.slice(2)]
                }else{
                    record.push({
                        name: splited[1],
                        dependencies: splited.slice(2),
                        status: status.NOT_INSTALLED
                    });
                }
                return [line];
            case "LIST":
                return ["LIST", ...record.filter(component=>component.status!==status.NOT_INSTALLED).map(({name})=>name)];
            case "REMOVE":
                const removeOutput = [line];
                const found = record.findIndex(item=>item.name===splited[1]);
                if (found>=0) {
                    if (record[found].dependencies.filter(({name})=>record.some(item=>item.name===name&&item.status!==status.NOT_INSTALLED)).length===0){
                        record[found].status = status.NOT_INSTALLED;
                        removeOutput.push(`${splited[1]} is removed`);
                    }
                }
                return removeOutput;
            case "INSTALL":
                const installOutput = [line];
                const componentIndex = record.findIndex(item=>item.name===splited[1]);
                if (componentIndex>=0) {
                    for (const dependency in record[componentIndex].dependencies) {
                        const found = record.findIndex(item=>item.name===record[componentIndex].dependencies[dependency]);
                        if (found>=0 && record[found].status!==status.INSTALLED) {
                            record[found].status = status.IMPLICITLY_INSTALLED;
                            installOutput.push(`Installing ${record[found].name}`);
                        }
                    }
                    record[componentIndex].status = status.INSTALLED;
                    installOutput.push(`Installing ${record[componentIndex].name}`);
                }else{
                    record.push({
                        name: splited[1],
                        dependencies: [],
                        status: status.INSTALLED
                    });
                }
                return installOutput;
            default:
                return [line];
        }
    };
    
    const processLines = (lines:Array<string>) => lines.reduce((acc:Array<string>,line:string):Array<string>=> {
        const outputLines = runCommand(line);
        return [...acc, ...outputLines];
    },[]);

    return {
        procces:(input:string):string=>processLines(validate(input.split('\n'))).join('\n'),
    };
};
