var get = function (str) {
	return ({
		"*" : function () {
			return document.getElementsByTagName("*");
		},
		"." : function (className) {
			return document.getElementsByClassName(
				className.substring(1));
		},
		"#" : function (id) {
			return document.getElementById(id.substring(1));
		},
		"@" : function (name) {
			return document.getElementsByName(name.substring(1));
		}
	}[str.substring(0, 1)] || function (tag) {
		return document.getElementsByTagName(tag);
	})(str);
}
