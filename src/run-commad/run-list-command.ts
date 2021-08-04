import { status } from '../consts';
import { Record } from '../types';

export const runListCommand = (record: Record): string[] => [
  'LIST',
  ...record.components.filter((component) => component.status !== status.NOT_INSTALLED)
    .map(({ name }) => name),
];
