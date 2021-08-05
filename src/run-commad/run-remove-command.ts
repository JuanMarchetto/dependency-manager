/* eslint-disable no-use-before-define */
import { status } from '../consts';
import { Record } from '../types';

const removeComponent = (removeOutput: string[], name: string, record: Record, found: number) => {
  removeOutput.push(`Removing ${name}`);
  const dependencies = [...record.components[found].dependencies];
  record.updateComponents({
    ...record.components[found],
    status: status.NOT_INSTALLED,
  });
  removeUnusedDependencies(
    dependencies,
    record,
    removeOutput,
  );
};

const removeUnusedDependencies = (
  dependencies: string[],
  record: Record,
  removeOutput: string[],
) => {
  dependencies.forEach((dependency) => {
    const found = record.components.findIndex(
      (item) => item.name === dependency,
    );
    if (
      found >= 0
      && record.components[found].status === status.IMPLICITLY_INSTALLED
    ) {
      if (
        !record.components.some(
          (item) => item.dependencies.includes(dependency)
            && item.status !== status.NOT_INSTALLED,
        )
      ) {
        removeComponent(removeOutput, dependency, record, found);
      }
    }
  });
};

const runRemoveCommand = (line: string, record: Record, splited: string[]) => {
  const removeOutput = [line];
  const found = record.components.findIndex((item) => item.name === splited[1]);
  if (found >= 0) {
    if (record.components[found].status === status.NOT_INSTALLED) {
      removeOutput.push(`${splited[1]} is not installed`);
    } else if (
      !record.components.some(
        (item) => item.dependencies.includes(splited[1])
          && item.status !== status.NOT_INSTALLED,
      )
    ) {
      removeComponent(removeOutput, splited[1], record, found);
    } else {
      removeOutput.push(`${splited[1]} is still needed`);
    }
  }
  return removeOutput;
};

export default runRemoveCommand;
