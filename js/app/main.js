var Inits = [],
	factory = new TemplatingFactory();

$(document).ready(function() {
	// execute libraries init functions
	Inits.forEach(function(Init) {
		Init();
    });

	// on page load update app view according to current url (document reload)
	updateView(window.location.pathname,"replace");

	// if window active history entry changes, update app view (back/forward browser buttons etc.)
	window.onpopstate = function(event) {
		updateView(event.state.url,"");
	};

	// if application state changes, update app view (internal app url change - internal links, menu items etc.)
	$(document).on("appStateChanged",function(event,url,hist) {
		updateView(url,hist);
	});
});

// app view chanage - core of app functionality
function updateView(url,hist) {
	var page = {};
	if (url !== "") {
		// from app router select page to display
		page = appRoutes[url] ? appRoutes[url] : appRoutes["notfound"];
		// alter window history accordingly
		switch (hist) {
			case 'replace':
				history.replaceState({url:url},"",url);
				break;
			case 'push':
				history.pushState({url:url},"",url);
				break;
		}
		// display page content
		page.renderContent();
	}
}
