import { test, expect } from '@playwright/test';
import { Page, Locator } from '@playwright/test';

class BaseTaxCalculatorTest {
    url: string = 'https://secapp.taxes.gov.il/srsimulatorNZ/#/simulatorMasHachnasah';
    page: Page;
    electricBtn: Locator;
    home_HC_Btn: Locator;
    categorysArray: Locator[];
    priceInput!: Locator;
    amountInput!: Locator;
    coinTypeDropdown!: Locator;
    calculationBtn!: Locator;
    result!: string | null;

    constructor(page: Page) {
        this.page = page;
        this.electricBtn = this.page.locator('#MenuData > div:nth-child(4) > a > div > div > div');
        this.home_HC_Btn = this.page.locator('#MenuData > div:nth-child(1) > a > div > div.price-table-heading > div');
        this.categorysArray = [];

    }

    async navigateToHomeHCCategory() {
        await this.page.goto(this.url);
        await this.electricBtn.waitFor();
        await this.electricBtn.click();
        await this.home_HC_Btn.waitFor();
        await this.home_HC_Btn.click();
    }
    async locateAllSubCategories() {
        this.electricBtn = this.page.locator('#MenuData'); 
    }
    async selectCategory() {
    }

    async loadCalculator() {
        await this.page.locator('text=מחשבון מס').click();
    }
    async locateCalcElements() {
        this.priceInput = this.page.locator('input[name="CustomsValueAmountFinalPrice0"]');
        this.amountInput = this.page.locator('input[name="TariffQuantity0"]');
        this.coinTypeDropdown = this.page.locator('#productList > div:nth-child(4) > div.row.col-12.col-lg-7.col-centered > div:nth-child(8) > select');
        this.calculationBtn = this.page.locator('text=חשב מס');
        await this.calculationBtn.waitFor();
        await this.coinTypeDropdown.waitFor();
        await this.priceInput.waitFor();
        await this.amountInput.waitFor();
    }
    async putValues(price: string, amount: string) {
        await this.priceInput.fill(price);
        await this.amountInput.fill(amount);
    }
    async getResult() {
        await this.calculationBtn.click();
        this.result = await this.page.locator('text=סה"כ מס:').textContent();

    }
    async run(){
        await this.navigateToHomeHCCategory();
        await this.locateAllSubCategories();
        await this.selectCategory();
        await this.loadCalculator();
        await this.locateCalcElements();
        await this.putValues('100', '1');
        await this.getResult();

    }
}
