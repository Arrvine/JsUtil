(function () {
	window.$$ = {
		util : {
			get : function (str) {
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
			},
			isJson : function (json) {
				var type = toString.call(json).substring(8);
				type = type.substring(0, type.length - 1);
				return type === 'Object';
			},
			addEvent : function (ele, eve, action) {
				var notIe = function (obj) {
					obj.element = typeof obj.element === 'string'
							? $$.get(obj.element) : obj.element;
					obj.element.addEventListener(obj.event, obj.fun);
				};

				var doIe = function (obj) {
					obj.element = typeof obj.element === 'string'
							? $$.get(obj.element) : obj.element;
					obj.element.attachEvent("on" + obj.event, obj.fun);
				};

				var deal3Args = function (ele, eve, action) {
					if ((typeof eve) !== 'string') {
						throw new Error("参数类型不正确！");
					}
					action = typeof action !== 'function'
						? function() {} : action;
					ele = (typeof ele == 'string') ? $$.get(ele) : ele;
					return {
						element : ele,
						event : eve,
						fun : action,
					};
				};

				var realAction = window.attachEvent ? doIe : notIe;

				$$.addEvent = function (ele, eve, action) {
					if (eve != undefined && action != undefined) {
						realAction(deal3Args(ele, eve, action));
						return;
					}
					if (ele != undefined && eve == undefined) {
						deal1Arg(ele);
						return;
					}
					throw new Error("参数个数不正确！");
				};

				var deal1Arg = function (arg) {
					// arg是json对象；若不是json对象，则，必须是数组
					var json = $$.isJson(arg);
					var array = arg instanceof Array;
					if (!json && !array) {
						throw new Error("参数类型不正确！");
					}
					if (array) {
						for (var index = 0; index < arg.length; index++) {
							if (!$$.isJson(arg[index])) {
								throw new Error("数组中必须是json对象");
							}
							dealJsonArg(arg[index]);
						}
						return;
					}
					dealJsonArg(arg);
				}

				var dealJsonArg = function (json) {
					// 要区分两种情况对待；
					if (json.events) {
						var element = json.element;
						var events = json.events;
						for (var index = 0; index < events.length; index++) {
							realAction({
								element : element,
								event : events[index].event,
								fun : events[index].fun
							});
						}
						return;
					}
					realAction(json);
				};

				$$.addEvent(ele, eve, action);
			}


		},
	};
	$$.get = $$.util.get;
	$$.isJson = $$.util.isJson;
	$$.addEvent = $$.util.addEvent;
}) ();	// 自运行函数
