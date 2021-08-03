import {status} from "../consts";

export const runListCommand = (record: any[]): string[] => ["LIST", ...record.filter(component => component.status !== status.NOT_INSTALLED).map(({ name }) => name)];
