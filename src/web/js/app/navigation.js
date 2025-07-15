Inits.push(initNavigation);

function initNavigation() {
	createMenu();
	// add menu icon functionality
	$(`#${menuSelectors.menu}`).click(function(){
		$(`#${menuSelectors.menuContent}`).slideToggle();
	});
}

// dynamic menu creation based on app navigation config
function createMenu() {
	let menu = new ContentRenderer(
		menuSelectors.menuContent,
		`<a href='%%path%%' class='pageHeaderMenuContentItem'>%%label%%</a>`,
		appNavigation
    );

	menu.customPostRenderActivity = function() {
		// alter menu items functionality to prevent document reload
		$(menuSelectors.menuContentItem).click(function(event) {
			event.preventDefault();
			$(document).trigger("appStateChanged",[this.getAttribute("href"),"push"]);
		});
	};
	
	menu.renderContent();
}
