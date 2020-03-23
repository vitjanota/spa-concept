var Page1 = new ContentRenderer(
	pageContentRef,
	"<div>\n\
		<h2>%%title%%</h2>\n\
		<p>This text contains %%text1%% to <a href='%%url1%%' class='nternalLink'>%%link1%%</a> and to <a href='%%url2%%' class='internalLink'>%%link2%%</a>. %%text2%%</p>\n\
	</div>",
	{
		content: {
			title: "Page 1: Example of custom content post processing",
			text1: "internal links",
			link1: "homepage",
			url1: appIndexPath,
			link2: "nonexisting page",
			url2: appIndexPath + "page4/",
			text2: "Both links were altered after the content rendering to prevent document relaod."
		}
	});

Page1.customPostRenderActivity = function() {
	// alter functionality for app internal links to prevent document reload
	$(".internalLink").click(function(event) {
		event.preventDefault();
		$(document).trigger("appStateChanged",[this.getAttribute("href"),"push"]);
	});
};
