// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  zetapush: {
    /*
    apiUrl: 'http://vm-zbo:8080/zbo/pub/business/',
    sandboxId: 'IgOv5_xs'
    */
    apiUrl: 'http://demo-1.zpush.io/zbo/pub/business/',
    sandboxId: 'UxSoJcEk'
  }
};
