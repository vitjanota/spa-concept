// global app config
const appNavigation = [ // global menu setup (items to be displayed)
		{
			path: appIndexPath,
			label: "Home",
            ref: Index
		},
		{
			path: appIndexPath + "page1/",
			label: "Page 1",
            ref: Page1
		},
		{
			path: appIndexPath + "page2/",
			label: "Page 2",
            ref: Page2
		},
		{
			path: appIndexPath + "page3/",
			label: "Page 3",
            ref: Page3
		},
		{
			path: appIndexPath + "page4/",
			label: "Page 4",
            ref: Page4
		}
	],

    // url path mapping to page to be displayed
	appRoutes = {};
    // each menu item
    appNavigation.forEach((item) => {
        appRoutes[item.path] = item.ref;
    });
    // not found page
	appRoutes["notfound"] = NotFound;