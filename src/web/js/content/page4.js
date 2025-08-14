let Page4 = new ContentRenderer(
	pageContentRef,
	`<div>
		<h2>%%title%%</h2>
		<p><b>%%text%%</b></p>
		<p><a href='${appIndexPath}page4/?id=1' class='internalLink'>reload this page</a> with search part of url (id = 1) and feel free to change the value of id in browser address bar</p>
	</div>`,
	{}
);

Page4.customPreRenderActivity = function() {

	const queryItems = new URLSearchParams(window.location.search);
    const content = queryItems.get('id') ? `Id is set to ${queryItems.get('id')}.` : "Id is not set.";

    this.setData({
		content: {
			title: "Page 4: Search aka query usage example",
			text: content
		}
	});
	
	$(this).trigger("PreRenderDone");
};

Page4.customPostRenderActivity = function() {
	// alter functionality for app internal links to prevent document reload
	$(".internalLink").click(function(event) {
		event.preventDefault();
		$(document).trigger("appStateChanged",[this.getAttribute("href"),"push"]);
	});

    const queryItems = new URLSearchParams(window.location.search);
    if (queryItems.get('id')) {
        notifications.emit(`Id was set to ${queryItems.get('id')}`);
    }

	$(this).trigger("PostRenderDone");
};
