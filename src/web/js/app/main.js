let Inits = [],
	factory = new TemplatingFactory(),
    notifications = new Notifications();

$(document).ready(function() {
	// execute libraries init functions
	Inits.forEach(function(Init) {
		Init();
    });

	// on page load update app view according to current url (document reload)
	updateView(window.location.pathname + window.location.search,'replace');

	// if window active history entry changes, update app view (back/forward browser buttons etc.)
	window.onpopstate = function(event) {
		updateView(event.state.url,'');
	};

	// if application state changes, update app view (internal app url change - internal links, menu items etc.)
	$(document).on('appStateChanged',function(event,url,hist) {
		updateView(url,hist);
	});
});

// app view chanage - core of app functionality
function updateView(location,hist) {
	let page = {},
		url = location.split("?")[0];
	if (url !== '') {
		// from app router select page to display
		page = appRoutes[url] ? appRoutes[url] : appRoutes['notfound'];
		// alter window history accordingly
		switch (hist) {
			case 'replace':
				history.replaceState({url:location},"",location);
				break;
			case 'push':
				history.pushState({url:location},"",location);
				break;
		}
		// display page content
		page.renderContent();
	}
}
