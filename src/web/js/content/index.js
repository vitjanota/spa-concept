let Index = new ContentRenderer(
	pageContentRef,
	`<div>
        <h2>%%title%%</h2>
        <p>%%text%%</p>
    </div>`,
	{
		content: {
			title: "Welcome",
			text: "This is a simple frameworkless SPA concept."
		}
	}
);
