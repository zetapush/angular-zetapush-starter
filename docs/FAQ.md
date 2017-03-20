# Frequently Asked Questions

##  How to setup my own sandbox id ?

Edit [dev environement file](..//src/environments/environment.ts).

```ts
export const environment = {
  production: false,
  zetapush: {
    sandboxId: '<SET_YOUR-SANDBOX-ID>',
  }
};
```

## How to create and deploy by own backend ?

Consult ZetaPush BaaS quickstart [documentation](https://doc.zetapush.com/quickstart/).
