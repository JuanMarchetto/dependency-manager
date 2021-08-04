import { status } from '../consts';
import { Record } from '../types';

const runListCommand = (record: Record): string[] => [
  'LIST',
  ...record.components.filter((component) => component.status !== status.NOT_INSTALLED)
    .map(({ name }) => name),
];

export default runListCommand;
