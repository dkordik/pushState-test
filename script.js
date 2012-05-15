$("nav a").on("mousedown", function (event) {
	History.pushState("",
		document.title, //for some reason the History plugin *requires* you to change the title
		this.href
	);
}).click(function () { return false; });

$(window).on("load", function () {
	$(window).trigger("popstate").trigger("hashchange");
});

$(window).on("popstate hashchange", function (event) {
	var matchedState = History.getState().url.match(/\/([\w]+$)/);
	var state = matchedState ? matchedState[1] : "/";
	//console.info(event.type.toUpperCase() + ": ", state);
	$("[data-href]").hide();
	$(".focus").removeClass("focus");
	$("a[href='" + state + "']").addClass("focus");
	var $matchedElement = $("[data-href='" + state + "']");
	$matchedElement.show();

	//ajax external page support
	var matchedElementUrl = $matchedElement.data("url");
	if (matchedElementUrl) {
		$matchedElement.load(matchedElementUrl);
	}
});