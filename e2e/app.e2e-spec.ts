import { ThumbnailtemplatesV4Page } from './app.po';

describe('thumbnailtemplates-v4 App', () => {
  let page: ThumbnailtemplatesV4Page;

  beforeEach(() => {
    page = new ThumbnailtemplatesV4Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
