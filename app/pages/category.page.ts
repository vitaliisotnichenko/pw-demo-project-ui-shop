import {PageHolder} from "../abstract";
import {expect, Locator} from "@playwright/test";

// const filterNameToTestId = {
//     'Marke': 'brand',
//     'Produktart': 'classificationClassName',
//     'Fur Wen': 'gender',
//     'Geschenk fur': 'flags',
// }

export class Category extends PageHolder {

    private productTile = this.page.locator('[data-testid="product-tile"]');
    private itemsInFilterMenu = this.page.locator('.facet__menu a');

    private getFilterByTitle(filterTitle: string): Locator {
       return this.page.locator('.facet-wrapper .facet__title', { hasText: filterTitle });
    }


    /**
     *
     * @param filterTitle
     * @param value if undefined the first value will be selected
     * @returns selected value in filter
     */

    async selectFilterValue(filterTitle: string, value?: string) {
        await this.getFilterByTitle(filterTitle).click();

        let selectedValue: string;

        if (value === undefined) {
            selectedValue = await this.itemsInFilterMenu.first().innerText();
            await this.itemsInFilterMenu.first().click();
        } else {
            const filterItem = this.itemsInFilterMenu.filter({ hasText: value });
            selectedValue = await filterItem.innerText();
            await filterItem.click();
        }
        await this.getFilterByTitle(filterTitle).click();
        return selectedValue;
    }

    /**
     * Expecting at least one product to be visible
     */

    async expectSearchResultsNotEmpty() {
        await expect(await this.productTile.first()).toBeVisible();
        await expect(await this.productTile).not.toHaveCount(0);

    }

    /**
     * Expecting selecting filters to be visible
     * @param selectedFilters
     */

    async expectedSelectedSearchFilters(selectedFilters: string[]) {
        await expect(this.page.locator('.selected-facets__value')).toHaveText(selectedFilters);
    }


}