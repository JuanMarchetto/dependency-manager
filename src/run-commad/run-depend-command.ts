import { status } from '../consts';
import { Record } from '../types';

const runDependCommand = (record: Record, splited: string[], line: string) => {
  const lines = [line];
  const foundIndex = record.components.findIndex(
    (item) => item.name === splited[1],
  );
  if (foundIndex >= 0) {
    const circularDependency = record.components.find(
      (item) => item.dependencies.includes(splited[1])
        && splited.slice(2).includes(item.name),
    );
    if (circularDependency) {
      lines.push(
        `${circularDependency.name} depends on ${splited[1]}, ignoring command`,
      );
    } else {
      record.updateComponents({
        ...record.components[foundIndex],
        dependencies: [...splited.slice(2)],
      });
    }
  } else {
    record.updateComponents({
      name: splited[1],
      dependencies: splited.slice(2),
      status: status.NOT_INSTALLED,
    });
    splited.slice(2).map((dependency) => record.updateComponents({
      name: dependency,
      dependencies: record.components
        .find((component) => component.name === dependency)?.dependencies ?? [],
      status: status.NOT_INSTALLED,
    }));
  }
  return lines;
};

export default runDependCommand;
