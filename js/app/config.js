// global app config
var appNavigation = { // global menu setup (items to be displayed)
		item01: {
			path: appIndexPath,
			label: "Home"
		},
		item02: {
			path: appIndexPath + "page1/",
			label: "Page 1"
		},
		item03: {
			path: appIndexPath + "page2/",
			label: "Page 2"
		},
		item04: {
			path: appIndexPath + "page3/",
			label: "Page 3"
		},
		item05: {
			path: appIndexPath + "page4/",
			label: "Page 4"
		}
	},

	appRoutes = {}; // url path mapping to page to be displayed

	appRoutes[appIndexPath] = Index;
	appRoutes[appIndexPath + "page1/"] = Page1;
	appRoutes[appIndexPath + "page2/"] = Page2;
	appRoutes[appIndexPath + "page3/"] = Page3;
	appRoutes[appIndexPath + "page4/"] = Page4;
	appRoutes["notfound"] = NotFound;