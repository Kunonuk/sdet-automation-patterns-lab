import { test as base } from '@playwright/test';
import { NavigationComponent } from '../../ui/components/navigation.component';
import { CataloguePage } from '../../ui/pages/catalogue.page';
import { ProductPage } from '../../ui/pages/product.page';

interface UiFixtures {
  navigation: NavigationComponent;
  catalogue: CataloguePage;
  product: ProductPage;
}

export const test = base.extend<UiFixtures>({
  navigation: async ({ page }, use) => {
    await use(new NavigationComponent(page));
  },
  catalogue: async ({ page, navigation }, use) => {
    await use(new CataloguePage(page, navigation));
  },
  product: async ({ page, navigation }, use) => {
    await use(new ProductPage(page, navigation));
  },
});

export { expect } from '@playwright/test';
