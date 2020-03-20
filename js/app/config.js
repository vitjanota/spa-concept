// global app config
var appRoutes = { // url path mapping to page to be displayed
		"/test/spa/": Index,
		"/test/spa/page1/": Page1,
		"/test/spa/page2/": Page2,
		"/test/spa/page3/": Page3,
		"notfound": NotFound
	},
	
	appNavigation = { // global menu setup (items to be displayed)
		item01: {
			path: "/test/spa/",
			label: "Home"
		},
		item02: {
			path: "/test/spa/page1/",
			label: "Page 1"
		},
		item03: {
			path: "/test/spa/page2/",
			label: "Page 2"
		},
		item04: {
			path: "/test/spa/page3/",
			label: "Page 3"
		}
	};
