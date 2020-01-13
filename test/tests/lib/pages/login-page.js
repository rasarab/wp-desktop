/** @format */

const { By } = require( 'selenium-webdriver' );
const AsyncBaseContainer = require( '../async-base-container' );
const driverHelper = require( '../driver-helper' );

class LoginPage extends AsyncBaseContainer {
	constructor( driver ) {
		super( driver, By.css( '.is-section-auth' ) );
	}

	async login( username, password ) {
		const driver = this.driver;
		const userNameSelector = By.name( 'login' );
		const passwordSelector = By.name( 'password' );
		const submitSelector = By.css( 'button.is-primary' );

		await this.hideGdprBanner();

		await driverHelper.waitTillPresentAndDisplayed( driver, userNameSelector );
		await driverHelper.setWhenSettable( driver, userNameSelector, username );

		await driverHelper.setWhenSettable( driver, passwordSelector, password, {
			secureValue: true,
		} );
		await driverHelper.clickWhenClickable( driver, submitSelector );
		return await driver.sleep( 1000 );
	}

	async hideGdprBanner() {
		//TODO: Move to AsyncBaseContainer?
		const gdprBannerButton = By.css( '.gdpr-banner__acknowledge-button' );
		try {
			await driverHelper.isEventuallyPresentAndDisplayed( this.driver, gdprBannerButton, 5000 );
			return await driverHelper.clickWhenClickable( this.driver, gdprBannerButton );
		} catch ( e ) {
			console.log( 'GDPR button is not present.' );
			return true;
		}
	}

	async openCreateAccountPage() {
		const element = By.css( '.auth__links a' );
		return await driverHelper.clickWhenClickable( this.driver, element );
	}
}

module.exports = LoginPage;
