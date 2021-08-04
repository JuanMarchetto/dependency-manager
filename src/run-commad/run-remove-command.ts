import { status } from '../consts';
import { Record, Component } from '../types';

export const runRemoveCommand = (line: string, record: Record, splited: string[]) => {
  const removeOutput = [line];
  const found = record.components.findIndex((item) => item.name === splited[1]);
  if (found >= 0) {
    if (record.components[found].status === status.NOT_INSTALLED) {
      removeOutput.push(`${splited[1]} is not installed`);
    } else if (!record.components.some((item) => item.dependencies.includes(splited[1]) && item.status !== status.NOT_INSTALLED)) {
      removeOutput.push(`Removing ${splited[1]}`);
      record.components[found].status = status.NOT_INSTALLED;
      removeUnusedDependencies(record.components[found].dependencies, record, removeOutput);
    } else {
      removeOutput.push(`${splited[1]} is still needed`);
    }
  }
  return removeOutput;
};

const removeUnusedDependencies = (dependencies: string[], record: Record, removeOutput: string[]) => {
  dependencies.forEach((dependency) => {
    const found = record.components.findIndex((item) => item.name === dependency);
    if (found >= 0 && record.components[found].status === status.IMPLICITLY_INSTALLED) {
      if (!record.components.some((item) => item.dependencies.includes(dependency) && item.status !== status.NOT_INSTALLED)) {
        removeOutput.push(`Removing ${dependency}`);
        record.components[found].status = status.NOT_INSTALLED;
        removeUnusedDependencies(record.components[found].dependencies, record, removeOutput);
      }
    }
  });
};
