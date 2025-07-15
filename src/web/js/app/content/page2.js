let Page2 = new ContentRenderer(
	pageContentRef,
	`<div>
        <h2>%%title%%</h2>
    </div>`,
	{
		content: {
			title: "Page 2"
		}
	}
);

Page2.customPreRenderActivity = function() {
	const date = new Date();
	this.setData({
		content: {
			title: "Page 2: Example of dynamic data and templates load",
			text: "This page was loaded at",
			list: [
				{content1: "hours", content2: date.getHours()},
				{content1: "minutes", content2: (date.getMinutes() > 9 ? "" : "0") + date.getMinutes()},
				{content1: "seconds", content2: (date.getSeconds() > 9 ? "" : "0") + date.getSeconds()}
            ]
		}
	});

	this.setTemplates(`<div>
		<h2>%%title%%</h2>
		<p>%%text%%:</p>
		<ul>
			<li data-for-each='list'>%%content2%% %%content1%%.</li>
		</ul>
	</div>`);

	$(this).trigger("PreRenderDone");
};
