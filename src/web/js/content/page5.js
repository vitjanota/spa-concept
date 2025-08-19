let Page5 = new ContentRenderer(
	pageContentRef,
	`<div>
        <h2>%%title%%</h2>
		<p>%%content%%</p>
	</div>`,
	{}
);

Inits.push(initData);

function initData() {
	$(document).on("onDataLoaded",function(event,data,that){
		that.setData(data);
		$(that).trigger("PreRenderDone");
    });
}

Page5.customPreRenderActivity = async function() {
    const res = await fetch('/test/get_data/');
    if (res.status == 200) {
        const data = await res.json();
        $(document).trigger("onDataLoaded",[data,this]);
    } else {
        notifications.emit([{
            title: 'data fetch',
            body: [{content:`${res.status} ${res.statusText}`}]
        }],'error')
    }
};
