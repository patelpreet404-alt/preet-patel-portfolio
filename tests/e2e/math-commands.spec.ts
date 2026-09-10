import { test, expect } from '@playwright/test';

test.describe('Math Commands', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('#command-input').fill('clear');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(100);
  });

  test('calc adds numbers', async ({ page }) => {
    await page.locator('#command-input').fill('calc 2+2');
    await page.keyboard.press('Enter');
    await expect(page.locator('main')).toContainText('4');
  });

  test('calc respects precedence', async ({ page }) => {
    await page.locator('#command-input').fill('calc 2 + 3 * 4');
    await page.keyboard.press('Enter');
    await expect(page.locator('main')).toContainText('14');
  });

  test("calc rejects '**' with a clear error", async ({ page }) => {
    await page.locator('#command-input').fill('calc 2 ** 8');
    await page.keyboard.press('Enter');
    await expect(page.locator('main')).toContainText("unknown operator '**'");
  });

  test('calc shows usage when called bare', async ({ page }) => {
    await page.locator('#command-input').fill('calc');
    await page.keyboard.press('Enter');
    await expect(page.locator('main')).toContainText('Usage: calc');
  });

  test('convert km to mi', async ({ page }) => {
    await page.locator('#command-input').fill('convert 100 km to mi');
    await page.keyboard.press('Enter');
    await expect(page.locator('main')).toContainText('62.13');
  });

  test('convert 0 C to F', async ({ page }) => {
    await page.locator('#command-input').fill('convert 0 C to F');
    await page.keyboard.press('Enter');
    await expect(page.locator('main')).toContainText('= 32');
  });

  test('convert 1 GiB to MiB', async ({ page }) => {
    await page.locator('#command-input').fill('convert 1 GiB to MiB');
    await page.keyboard.press('Enter');
    await expect(page.locator('main')).toContainText('1 GiB = 1024 MiB');
  });

  test('convert errors on cross-category', async ({ page }) => {
    await page.locator('#command-input').fill('convert 1 km to kg');
    await page.keyboard.press('Enter');
    await expect(page.locator('main')).toContainText('cannot convert');
  });

  test('convert shows usage when called bare', async ({ page }) => {
    await page.locator('#command-input').fill('convert');
    await page.keyboard.press('Enter');
    await expect(page.locator('main')).toContainText('Usage: convert');
  });

  test('help lists Math category', async ({ page }) => {
    await page.locator('#command-input').fill('help');
    await page.keyboard.press('Enter');
    await expect(page.locator('main')).toContainText('Math:');
  });
});
