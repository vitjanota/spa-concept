var NotFound = new ContentRenderer(
	pageContentRef,
	`<div><h2>%%title%%</h2>`,
	{
		content: {
			title: "404 Requested page not found"
		}
	});
