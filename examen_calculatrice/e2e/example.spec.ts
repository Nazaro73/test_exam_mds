import { test, expect } from '@playwright/test';


test.describe('Calculatrice Tests', () => {
  test.beforeEach(async ({ page }) => {
    
    await page.goto('http://localhost:5173');
  });

  test('Test des opérations de la calculatrice', async ({ page }) => {
    
    await page.click('button:text("1")');
    await page.click('button:text("sum")');
    await page.click('button:text("2")');
    await page.click('button:text("=")');
    await expect(page.locator('.screen')).toHaveText('3');

    
    await page.click('button:text("C")');

    
    await page.click('button:text("5")');
    await page.click('button:text("soustraction")');
    await page.click('button:text("2")');
    await page.click('button:text("=")');
    await expect(page.locator('.screen')).toHaveText('3');

    // Reset
    await page.click('button:text("C")');

    // Test de la multiplication
    await page.click('button:text("2")');
    await page.click('button:text("multiplication")');
    await page.click('button:text("3")');
    await page.click('button:text("=")');
    await expect(page.locator('.screen')).toHaveText('6');
  });

  test('Test du bouton C', async ({ page }) => {
    // Entrez quelques chiffres et effacez-les
    await page.click('button:text("9")');
    await page.click('button:text("sum")');
    await page.click('button:text("3")');
    await page.click('button:text("C")');
    await expect(page.locator('.screen')).toHaveText('0');
  });

  test('Test du background color du bouton "="', async ({ page }) => {
    const color = await page.locator('button.btnEqual').evaluate(node => getComputedStyle(node).backgroundColor);
    expect(color).toBe('rgb(255, 0, 0)'); 
  });
});
