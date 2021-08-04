import { status } from './consts';

export type Record = {
    components: Array<Component>;
}

export type Component = {
    name: string;
    dependencies: Array<string>;
    status: status
}
