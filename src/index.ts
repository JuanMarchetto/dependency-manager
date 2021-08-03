import { validate } from "./validate";
import { processLines } from "./proccess-line";

export const createComponentsManager = () => {
    const record: Array<any> =[];

    return {
        procces:(input:string):string=>processLines(validate(input.split('\n')), record).join('\n'),
    };
};
