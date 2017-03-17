import { ExcelListPage } from './app.po';

describe('excel-list App', () => {
  let page: ExcelListPage;

  beforeEach(() => {
    page = new ExcelListPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
