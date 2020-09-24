var Page2 = new ContentRenderer(
	pageContentRef,
	"<div><h2>%%title%%</h2></div>",
	{
		content: {
			title: "Page 2"
		}
	});

Page2.customPreRenderActivity = function() {
	var date = new Date();
	this.setData({
		content: {
			title: "Page 2: Example of dynamic data and templates load",
			text: "This page was loaded at",
			list: {
				listitem01: {content1: "hours", content2: date.getHours()},
				listitem02: {content1: "minutes", content2: (date.getMinutes() > 9 ? "" : "0") + date.getMinutes()},
				listitem03: {content1: "seconds", content2: (date.getSeconds() > 9 ? "" : "0") + date.getSeconds()}
			}
		}
	});

	this.setTemplates("<div>\n\
		<h2>%%title%%</h2>\n\
		<p>%%text%%:</p>\n\
		<ul>\n\
			<li data-for-each='list'>%%content2%% %%content1%%.</li>\n\
		</ul>\n\
	</div>");

	$(this).trigger("PreRenderDone");
};
