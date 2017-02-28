# angular-zetapush-starter

> Angular (2+) ZetaPush Starter project

## Installation

Clone project

```console
git clone https://github.com/zetapush/angular-zetapush-starter.git
```

Install dependencies (yarn recommended)

```console
yarn install
```

```console
npm install
```

## Configuration

Edit environement file

```ts
export const environment = {
  production: false,
  zetapush: {
    sandboxId: '<SET_YOUR-SANDBOX-ID>',
  }
};
```

## Getting started

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0-rc.0.

### Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.
