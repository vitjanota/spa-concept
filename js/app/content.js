// content renderer definition
function ContentRenderer(rootRef,templates,data) {

	this.rootRef = rootRef;
	this.templates = templates;
	this. data = data;

	// custom root ref setting
	this.setRoot = function(rootRef) {
		this.rootRef = rootRef;
	};

	// custom data setting
	this.setData = function(data) {
		this.data = data;
	};

	// custom templates setting
	this.setTemplates = function(templates) {
		this.templates = templates;
	};

	// rendering init wrapper
	this.renderContent = function() {
		this.preRender();
	};

	// custom pre content rendering activity
	this.customPreRenderActivity = function() {
		// this needs to be added at the end of any custom code
		$(this).trigger("PreRenderDone");
	};

	// custom post content rendering activity
	this.customPostRenderActivity = function() {
		// this needs to be added at the end of any custom code
		$(this).trigger("PostRenderDone");
	};

	// general pre content rendering wrapper
	this.preRender = function() {
		this.customPreRenderActivity();
	};

	// rendering itself: find root, add templates and process data
	this.render = function() {
		var root = $(this.rootRef);
		root.html(this.templates);
		factory.renderRoot(root,this.data);
		$(this).trigger("RenderDone");
	};

	// general post content rendering wrapper
	this.postRender = function() {
		this.customPostRenderActivity();
	};
  
	$(this).on("PreRenderDone",function(){
		this.render();
	});
	$(this).on("RenderDone",function(){
		this.postRender();
	});
}
