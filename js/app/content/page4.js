var Page4 = new ContentRenderer(
	pageContentRef,
	"<div>\n\
		<h2>%%title%%</h2>\n\
		<p><b>%%text%%</b></p>\n\
		<p><a href='" + appIndexPath + "page4/?id=1' class='internalLink'>reload this page</a> with seach part of url (id = 1) and feel free to change the value of id in browser address bar\n\
		</p>\n\
	</div>",
	{});

Page4.customPreRenderActivity = function() {

	var queryItems = window.location.search.substring(1).split("&"),
		parsedQuery = [],
		content;
    
    for(var i = 0; i < queryItems.length; i++) {
        queryItem = queryItems[i].split('=');
        // parsedQuery[queryItem[0]] = decodeURIComponent(queryItem[1].replace(/\+/g," "));
        parsedQuery[queryItem[0]] = queryItem[1];
    }

    content = parsedQuery['id'] ? "Id is set to " + parsedQuery['id'] + "." : "Id is not set.";


    this.setData({
		content: {
			title: "Page 4: Search aka query usage example",
			text: content
		}
	});
};

Page4.customPostRenderActivity = function() {
	// alter functionality for app internal links to prevent document reload
	$(".internalLink").click(function(event) {
		event.preventDefault();
		$(document).trigger("appStateChanged",[this.getAttribute("href"),"push"]);
	});
};
