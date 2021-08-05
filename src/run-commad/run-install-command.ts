import { status } from '../consts';
import { Record } from '../types';

const implicitInstall = (
  record: Record,
  componentIndex: number,
  installOutput: string[],
) => Object.keys(record.components[componentIndex].dependencies).forEach((dependency) => {
  const found = record.components.findIndex(
    (item) => item.name === record.components[componentIndex].dependencies[dependency],
  );
  if (
    found >= 0
      && record.components[found].status === status.NOT_INSTALLED
  ) {
    installOutput.push(`Installing ${record.components[found].name}`);
    implicitInstall(record, found, installOutput);
    record.updateComponents(
      { ...record.components[found], status: status.IMPLICITLY_INSTALLED },
    );
  }
});

const installDeclaredComponent = (record: Record, index: number, installOutput: string[]) => {
  if (record.components[index].status === status.INSTALLED) {
    installOutput.push(
      `${record.components[index].name} is already installed`,
    );
  } else {
    implicitInstall(record, index, installOutput);
    installOutput.push(
      `Installing ${record.components[index].name}`,
    );
    record.updateComponents(
      { ...record.components[index], status: status.INSTALLED },
    );
  }
};

const installUndeclaredComponent = (record: Record, name: string, installOutput: string[]) => {
  record.updateComponents(
    {
      name,
      dependencies: [],
      status: status.INSTALLED,
    },
  );
  installOutput.push(`Installing ${name}`);
};

const runInstallCommand = (line: string, record: Record, splited: string[]) => {
  const installOutput = [line];
  const componentIndex = record.components.findIndex(
    (item) => item.name === splited[1],
  );
  if (componentIndex >= 0) {
    installDeclaredComponent(record, componentIndex, installOutput);
  } else {
    installUndeclaredComponent(record, splited[1], installOutput);
  }
  return installOutput;
};

export default runInstallCommand;
