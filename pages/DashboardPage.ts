import { Page } from '@playwright/test';
import { NavBar } from '@pages/NavBar';

export class DashboardPage extends NavBar {
  constructor(page: Page) {
    super(page);
    this.elements = {
        searchBar: this.page.locator('span', { hasText: 'Search or jump to...'}),
        ...this.elements,
    };
  }

}


