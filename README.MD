# Dependency Manager
- This program is to automate the process of adding and removing components.
- The project is setted tu publish it as a npm dependency if needed

## Prerrequisites
    - Node
    - Typescript

## Instalation
`npm i`

## Run Test 
`npm test`

## build
`npm run build`

## usage
```
import createComponentsManager from 'dependency-manager';
const componentsManager = createComponentsManager();
console.log(componentsManager.process('END'));
```

This import path assumes that this is published as a packege with de dependency-manager name
if you will use this dependency as a local module that should be changing.
