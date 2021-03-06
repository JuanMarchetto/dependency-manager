import { status } from './consts';

export type Component = {
    name: string;
    dependencies: Array<string>;
    status: status
}

export type Record = {
    components: Component[];
    updateComponents(component: Component): void;
}
