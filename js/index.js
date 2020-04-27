console.log("window:", window);

var hobbySelectAll = $$.get("#hobbySelectAll");
$$.addEvent({
	element : hobbySelectAll,
	events	: [{
		event : "click",
		fun : function hobbySelectAllClick(event) {
			console.log("单击:", event);
		}
	},{
		event : "dblclick",
		fun : function hobbySelectAllClick(event) {
			console.log("双击:", event);
		}
	},]
});

$$.addEvent({
	element : "#hobbySelectAll",
	event : "click",
	fun : function (event) {
		console.log("一个单击:", event);
	},
});

$$.addEvent([{
		element : $$.get("#hobbySelectRev"),
		event : "click",
		fun : function hobbySelectAllClick(event) {
			console.log("Rev:", event);
		},
	}, {
		element : $$.get("#hobbySelectAll"),
		events	: [{
			event : "click",
			fun : function hobbySelectAllClick(event) {
				console.log("click-All:", event);
			}
		},{
			event : "dblclick",
			fun : function hobbySelectAllClick(event) {
				console.log("dblclick-All:", event);
			}
		},],
	},]
);

$$.addEvent($$.get("#hobbySelectNone"), "click", function (event) {
	console.log("None1:", event);
});

$$.addEvent("#hobbySelectNone", "click", function (event) {
	console.log("None2:", event);
});
