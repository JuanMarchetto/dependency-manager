import { status } from '../consts';
import { Component } from '../types';

const runListCommand = (components: Component[]): string[] => [
  'LIST',
  ...components.filter((component) => component.status !== status.NOT_INSTALLED)
    .map(({ name }) => name),
];

export default runListCommand;
