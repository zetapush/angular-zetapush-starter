import { AngularZetapushStarterPage } from './app.po';

describe('angular-zetapush-starter App', () => {
  let page: AngularZetapushStarterPage;

  beforeEach(() => {
    page = new AngularZetapushStarterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
