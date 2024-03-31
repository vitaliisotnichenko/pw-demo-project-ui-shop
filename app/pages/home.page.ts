import {PageHolder} from "../abstract";

export type Categories =
    | 'MARKEN'
    | 'PARFUM'
    | 'NEU'
    | 'DÜFTE'
    | 'PFLEGE'
    | 'MAKE-UP'
    | 'GESICHT'
    | 'KÖRPER'
    | 'HAARE'
    | 'HOME & LIFESTYLE'
    | 'DOUGLAS COLLECTION'
    | 'APOTHEKE¹ & GESUNDHEIT'
    | 'OSTERN'
    | 'SALE';

export class Home extends PageHolder {
    async open() {
        await this.page.goto('/');
    }

    async acceptCookies() {
        const cookieAcceptButton = await this.page.getByRole('button', {name: 'Alle erlauben'});
        // await page.addLocatorHandler(
        //     cookieAcceptButton,
        //     async () => cookieAcceptButton.click());
        await cookieAcceptButton.click();
    }

    async openCategory(category: Categories) {
        await this.page.getByRole('link', {name: category, exact: true}).click();
    }
}