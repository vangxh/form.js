/**
 +-------------------------------------------------------------------
 * jQuery TUi-form 表单验证插件
 +-------------------------------------------------------------------
 * @version    2.0.0
 * @since      2013.09
 * @author     携心楼主 <vangxh@gmail.com>
 +-------------------------------------------------------------------
 */
(function($) {
	var 	F	= null,		// 当前表单
		_F	= [],		// 正常表单
		F_	= [],		// 构造表单
		G	= 0,		// 表单分组
	config		= {
		// 内置提示
		tip	: {
			notempty	: '必填项不能为空',
			chs			: '只允许汉字',
			chsAlpha	: '只允许汉字、字母',
			chsAlphaNum	: '只允许汉字、字母、数字',
			chsDash		: '只允许汉字、字母、数字、下划线、破折号',
			digit		: '只允许数字、小数',
			num			: '只允许数字',
			alpha		: '只允许字母',
			alphaNum	: '只允许字母、数字',
			alphaDash	: '只允许字母、数字、下划线、破折号',
			zipCode		: '邮编格式不正确',
			email		: '邮箱格式不正确',
			mobile		: '手机号格式不正确',
			idCard		: '身份证格式不正确',
			idPass		: '护照格式不正确',
			date		: '日期格式不正确',
			ip			: 'IP地址格式不正确',
			url			: 'URL地址格式不正确'
		},
		// 内置规则
		regex	: {
			// 为空
			empty		: '^\\.{0}$',
			// 非空
			notempty	: '\\S+',
			// 仅汉字
			chs			: '^[\\u4E00-\\u9FA5\\uF900-\\uFA2D]+$',
			// 仅汉字、字母
			chsAlpha	: '^[\\u4E00-\\u9FA5\\uF900-\\uFA2Da-zA-Z]+$',
			// 仅汉字、字母、数字
			chsAlphaNum	: '^[\\u4E00-\\u9FA5\\uF900-\\uFA2Da-zA-Z0-9]+$',
			// 仅汉字、字母、数字、下划线、破折号
			chsDash		: '^[\\u4E00-\\u9FA5\\uF900-\\uFA2Da-zA-Z0-9_\\-]+$',
			// 有效数字
			digit		: '^(-?\\d+)(\\.\\d+)?$',
			// 整数
			num			: '^-?[1-9][0-9]*|0$',
			// 仅字母
			alpha		: '^[A-Za-z]+$',
			// 字母、数字
			alphaNum	: '^[A-Za-z0-9]+$',
			// 字母、数字、下划线、破折号
			alphaDash	: '^[A-Za-z0-9_\\-]+$',
			// 邮编
			zipCode		: '^\\d{6}$',
			// 邮件
			email		: '^([a-zA-Z0-9_\\.\\-])+\\@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9]{2,4})+$',
			// 手机
			mobile		: '^1[0-9]{10}$',
			// 身份证
			idCard		: '^[1-9]([0-9]{14}|[0-9]{17})$|^[1-9][0-9]{16}(X|x)$',
			// 护照
			idPass		: '^[a-zA-Z0-9]{5,17}$',
			// 日期
			date		: '^(\\d{4})[-\\/](\\d{1}|0\\d{1}|1[0-2])([-\\/](\\d{1}|0\\d{1}|[1-2][0-9]|3[0-1]))*$',
			// IP
			ip			: '^(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)$',
			// URL
			url			: '^((http[s]?:)?\\/\\/([\\w-]+\\.)+[\\w-]+|\\/)([\\w-./?%&=]*)?$'
		}
	};

	// 提示函数
	function show (FM, OBJ, LBL, i, j, k) {
		if (k === -1) {
			setTimeout(execute, 200);
		} else {
			execute();
		}
		function execute() {
			var info, type, sele, arr;
			// 提交显示
			if (OBJ === true) {
				type = FM.subTipArr[0];
				sele = $(FM.subTipArr[1]);
				info = i;
				OBJ	 = sele;
				type === undefined && (type = 1);
			} else {
				// 单个文本域提示
				arr	 = FM.cloneArr[i] ? FM.cloneArr[i][0] : FM.ruleArr[i];
				type = parseInt(FM.ruleArr[i][7][j]) || parseInt(arr[7][0]);
				sele = $(FM.ruleArr[i][8][j] || arr[8][0]);
				switch (LBL) {
					case 0	: info = FM.ruleArr[i][2][j]  ? FM.ruleArr[i][2][j][k] : arr[2][0][k]; break;
					case 1	: info = FM.ruleArr[i][3][j] || arr[3][0]; break;
					case 2	: info = FM.ruleArr[i][4][j] || arr[4][0]; break;
					case 3	: info = FM.ruleArr[i][5][j] || arr[5][0]; break;
					case 4	: info = FM.ruleArr[i][6][j] || arr[6][0]; break;
				}
			}
			if (info) {
				info == ' ' && (info = '');
			} else {
				info = '&nbsp;';
			}
			switch (type) {
				case 1 	:
					if (info != '&nbsp;' && info != '' && LBL != 4) {
						alert(info);
					}
					break;
				case 2 	:
					if (FM.labelTmp == 4) {
						setTimeout(function() {
							display(LBL, sele, info, 1);
						}, 200);
					} else {
						display(LBL, sele, info, 1);
					}
					break;
				case 3	: break;
				default :
					if (FM.labelTmp == 4) {
						setTimeout(function() {
							display(LBL, OBJ, info);
						}, 200);
					} else {
						display(LBL, OBJ, info);
					}
			}
		}
		FM.labelTmp = LBL;
	}

	function display(lbl, el, info, way) {
		var col = ['#ff8723','#8cd232','#87befc','#ffb941','#c0871a'],
			tip = way == 1 ? el.children('i:last') : el.next('i');
		tip.length == 0 && (tip = way == 1 ? el.append('<i></i>').children('i:last') : el.after('<i></i>').next('i'));
		info == ''
			? tip.remove()
			: tip.css({
				'display'	: 'inline-block',
				'font-style'	: 'normal',
				'height'	: '20px',
				'line-height'	: '18px',
				'padding-left'	: '20px',
				'background'	: 'url("data:image/gif;base64,R0lGODlhFACMAPf/AMxsHHCpKPx9HkSMsP/59f/+94nNMebevcXe5vt3HPf372yYsOPv9qvT547TNvn8/flxG/ujbfx6HYS72VSt2ebw9vl3Kfb6/fhuGubv7+/v3u/398uUNfrv3LHR49jm7/qWWom1zvn89ovA3VOq1v3dyrDXfPi0P8Dc6vu2QOuJNv+JJ1qy3f2GI+z1+f7v5vmJRf6BIf7jzN7u9vixdYO51v7u0/f//9be1eurPGK13v+LKpTVQZDD3v++T+bm1v/478/k6N7exv/39/f39+bv5vfv5v/17aTG2fH2+e/v5p3B1cLa5e7Dd+nx9uXz+fX77v3w3Hy7LfiDIl2pzuqUTOP0z8Dane344JPJ5ITFLoC3PO+jZMDglemxUveDIvbQsPl9Ms1uIKPbW36xzXe/4/+PM+jx3Py8lWKpzYO1Qny31c3hs/vp2v/Oeuf01v3LrZfBYU+jzYjH5/H4/P7l1vqEIvXCmeyxTPXYpbPW6f+zc9fs95S80ZPM6frAj5/L4//HZ5LH4p/HapDUOf/s3f7z7Njr9f66Q+ydW/7m0/rn1/+fT/rYnY+9VLbiff7i0f/Thuy+b6/gcPu1iuq4Yf+rZfD26OLw0Pfv3nCx0f7p3P326f+7SP7z5fbgufbNhv7n2e5+IfnPh+bw2djm3c7e1e/v7+/m1tu6Ye/vzubmxc20fefmvXmrxv+RNcigWkydxuV5H8CHGtq5fff35rW1kd7HjObmzunZq9vEnu/mzebexY2MU9W9jrjFrlp7Tam9qt7Ke4Olh2yVdPf33u/vxd7OrPfv1qqofcG9nqp7HZG0tHWmscXWxZazmtatOs7Hq5+ic7/Ov9WtTMCfa+/ev73W2MnMuPfmy7qMOunWl7WMRjt7jObWvebFjPfvzubOmdbWwJScb+bOpZC10Pfm1ubWjM6lHVaYudbOuTaAsViPmebWtc7e7+bm5pq9w+bm3qnKzu/m3ubOte/v987e5vf/92ucxYzSMlWv3Ie+3P+5Qf+HI////////yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Qjg1MTZCMzM1MDJGMTFFMzk3NThDMEQzNkE1N0I4RDEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Qjg1MTZCMzQ1MDJGMTFFMzk3NThDMEQzNkE1N0I4RDEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCODUxNkIzMTUwMkYxMUUzOTc1OEMwRDM2QTU3QjhEMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCODUxNkIzMjUwMkYxMUUzOTc1OEMwRDM2QTU3QjhEMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQz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") 0 ' + -20*lbl + 'px no-repeat',
				'color'		: col[lbl]
			}).html(info);
	}
	// 获取索引
	function _indexOf(arr, e) {
		if (!Array.indexOf) {
			for (var i in arr) {
				if (arr[i] == e)
					return i;
			}
			return -1;
		}
		return arr.indexOf(e);
	}
	// 去掉字符串2边的引号、逗号
	function _trim(data){
		return data.replace(/(^[',"])|([',"]$)/g, '');
	}
	// 判断对象是否为空
	function _empty(obj) {
		for (var name in obj)
			return false;
		return true;
	}
	// 规则处理
	function _rule(rule) {
		rule = rule.replace(/^#!|[#!]/, '');
		return config.regex[rule] || rule;
	}
	// 获取字符串长度
	function _len(data) {
		var len = 0, arr;
		arr = data.split('');
		for (var key in arr) {
			len = arr[key].charCodeAt(0) < 299
					? len + 1
					: len + 2;
		}
		return len;
	}

	/* 核心表单验证函数
	 * type = [-1,0,1,2,3]
	 * -1	: 外部提交验证
	 * 0	: blur 单个表单域验证
	 * 1	: submit、ajaxSubmit 提交验证
	 * 2	: powSubmit 提交验证
	 * 3	: 提交验证时表单域无改变，此时只验证是否为空
	 */
	function _check(Fm, obj, k, g, m, typ) {
		var chkTof		= true,
			defArr	 	= Fm.cloneArr[k] || [Fm.ruleArr[k], Fm.dataArr[k]],
			chkRuleArr	= Fm.ruleArr[k][0][m] || defArr[0][0][0],
			dataTof		= Fm.ruleArr[k][1][m] || 0,
			// 默认数据
			defData		= Fm.dataArr[k] ? (Fm.dataArr[k][m] || (defArr[1][0] ? defArr[1][0][0] : '')) : '',
			tmpData		= '',
			value		= obj.prop('type') == 'checkbox' || obj.prop('type') == 'radio'
							? (obj.is(':checked') ? obj.filter(':checked').val() : '')
							: (obj.attr('contenteditable') ? obj.html() : obj.val());
		if (Fm.dataArrTmp[k]) {
			tmpData = Fm.dataArrTmp[k][m] || defData;
		} else {
			Fm.dataArrTmp[k] = [];
		}
		// placeholder处理
		if (defData == value && Fm.placeholder[k] === 1) value = '';
		// 设置临时数据，下次则不作验证，根据dataTof直接返回真假
		Fm.dataArrTmp[k][m] = value;
		// 当表单域有变动或数据标志为假[0]则执行验证
		if (value != tmpData || dataTof == 0) {
			var chkRule, temp, ruleLbl, tofLbl, ajxCheck, len = chkRuleArr.length;
			chkRuleArr[0]  = chkRuleArr[0].replace(/^#/, '');
			// 规则验证
			for (var i in chkRuleArr) {
				if (i == 1 && defData == value) break;
				chkRule = chkRuleArr[i];
				tofLbl  = chkRule.charAt(0);
				chkRule = _rule(chkRule.replace(/^!/, ''));
				// 判断是否为函数
				temp = chkRule.match(/(^[a-zA-Z_]+\w*)\((.*)\)$/);
				if (temp == null) {
					chkTof = new RegExp(chkRule).test(value);
				} else {
					// 函数参数处理，同正常参数
					temp[2] = temp[2].split(',');
					for (var o in temp[2]) {
						if (/^['"]/.test(temp[2][o])) {
							temp[2][o] = _trim(temp[2][o]);
						} else if (isNaN(temp[2][o])) {
							try {
								temp[2][o] = eval(temp[2][o]);
							} catch (e) {}
						}
					}
					// 当ajx第2参数为true且typ=0则跳过验证，只在提交时进行验证
					if (temp[1] == 'ajx' && typ !== true && (temp[2][1] === true || temp[2][2] === true)) {
						ajxCheck = true;
						// 因未验证，重置为0
						Fm.ruleArr[k][1][m] = 0;
						continue;
					}
					// 执行自定义函数，若函数不存在，则查找另一种自定义函数
					try {
						chkTof = eval(temp[1]).call(null, value, temp[2]);
					} catch(e) {
						try {
							chkTof = eval(value + '.' + temp[0]);
						} catch(e) {
							try {
								chkTof = chkFunc[temp[1]].call(null, temp[2], obj, value, Fm, g, k, m, i);
							} catch (e) {
								chkTof = false;
								console.log(e);
							}
						}
					}
				}
				tofLbl == '!' && (chkTof = !chkTof);
				if (i == 0) {
					// 若规则为empty
					if (chkRule == '^\\.{0}$') {
						if (!chkTof) {
							chkTof = true;
							continue;
						}
						if (value == '') break;
					}
				}
				if (!chkTof) {
					Fm.ruleArr[k][1][m] = 0;
					// 设置焦点
					if (typ) {
						obj.data('tof', true);
						obj.focus();
					}
					// 提示
					show(Fm, obj, 0, k, m, i);
					// 最后一个验证条件执行回调
					i == len - 1 && Fm.errorArr[k] && Fm.errorArr[k].call(obj,F[g].powForm ? $(document) : $('form').eq(g));
					return false;
				}
			}
			if (chkTof) {
				if (typ || ajxCheck !== true) {
					Fm.ruleArr[k][1][m] = 1;
				}
				// 提示
				show(Fm, obj, 1, k, m);
			}
		} else if (value == tmpData) {
			if (!typ && Fm.ruleArr[k][5][m]) {
				show(Fm, obj, dataTof, k, m);
			}
		}
		return chkTof;
	}
	function check(H, obj, g, objArr, type) {
		var chkTof 		= true,
			childObjArr 	= [],
			Fobj		= null,
			len		= 0;
		for (var i in objArr) {
			Fobj = obj.find(objArr[i]);
			len	 = Fobj.filter(':visible').length + Fobj.filter('[type="hidden"]').length;
			if ($.inArray(Fobj.attr('type'),['checkbox','radio']) > -1) {
				if (!(chkTof = _check(H, Fobj, type ? _indexOf(H.objArr, objArr[i]) : i, g, 0, true))) {
					return false;
				}
			} else {
				for (var m = 0; m < len; m++) {
					if (chkTof = _check(H, Fobj.eq(m), type ? _indexOf(H.objArr, objArr[i]) : i, g, m, true)) {
						if (H.ruleArr[i][0][0][m] && H.ruleArr[i][0][0][m].charAt(0) == '#') {
							m == 0 && childObjArr.push([objArr[i], i, len]);
							break;
						}
					} else {
						return false;
					}
				}
			}
		}
		function recurse(arr, i) {
			if (arr.length == 0) {
				return;
			}
			for (var k in arr) {
				Fobj = obj == '' ? $(arr[k][0]) : $(obj).find(arr[k][0]);
				if (i >= arr[k][2]) {
					arr.splice(k, 1);
				} else {
					if (!(chkTof = _check(H, Fobj.eq(i), arr[k][1], g, i, true))) {
						return;
					}
				}

			}
			recurse(arr, ++i);
		}
		recurse(childObjArr, 1);
		return chkTof;
	}

	// 通用验证函数
	var chkFunc = {
		// 等于 当有参数2为true时则比较2个字段值是否相等，通常用于密码与重复密码
		eq: function(args,Fobj,data,Fm,g,i,j,k) {
			if (args[1] === true) {
				var obj = Fm.powForm ? $(args[0]) : $('form').eq(g).find(args[0]),
					key	= _indexOf(Fm.objArr,args[0]);
				args[0] = obj.val();
				if (i < key) {
					args[0] = data == args[0] ? 1 : 0;
					show(Fm, obj, args[0], i, j, k);
					Fm.ruleArr[key][1][k] = args[0];
					return true;
				}
			}
			return data == args[0];
		},
		// 大于
		gt: function(args,Fobj,data,Fm,g,i,j,k) {
			if (args[1] === true) {
				return _len(data) > parseInt(args[0]);
			}
			return data > parseInt(args[0]);
		},
		// 小于
		lt: function(args,Fobj,data,Fm,g,i,j,k) {
			if (args[1] === true) {
				return _len(data) < args[0];
			}
			return data < parseInt(args[0]);
		},
		// 验证字符串长度在args[0]-args[1]之间或数据大小between
		limit : function(args,Fobj,data,Fm,g,i,j,k) {
			var len;
			if (args[2] === true) {
				len = parseInt(data);
			} else {
				len = _len(data);
				if (args[1] === undefined) {
					return len == parseInt(args[0]);
				}
			}
			return len >= parseInt(args[0]) && len <= parseInt(args[1]);
		},
		// ajax方式请求 args[0]为url，args[1]为[post|get]
		ajx : function(args,Fobj,data,Fm,g,i,j,k) {
			var tof	 = false,
				json = {};
				json[Fobj.prop('name').replace('[]', '') || 'key'] = data;
			$.ajax({
				type		: args[1] == 'post' ? 'post' : 'get',
				async		: false,
				url			: args[0],
				dataType	: 'json',
				data		: json,
				beforeSend	: function() {
					show(Fm, Fobj, 4, i, j, k);
				},
				success		: function(data) {
					if (typeof data == 'object') {
						tof = data.code;
						Fm.ruleArr[i][1][j][k] = data.msg;
					} else {
						tof = Boolean(data);
					}
				}
			});
			return tof;
		}
	};
	// 接口
	$.form = {
		// 配置
		config	: function(opt1, opt2) {
			switch (opt2) {
				case 'tip'	: config.tip   = $.extend(config.tip, opt1); break;
				case 'regex'	: config.regex = $.extend(config.regex, opt1); break;
				default		: config = $.extend(config, opt1);
			}
		},
		// 分组
		group	: function(grp, action, powForm) {
			// 默认变量
			var opt	= {
				objArr		: [],		// 所有表单对象
				ruleArr		: [],		// 所有表单对象规则
				dataArr		: [],		// 默认表单数据
				subTipArr	: [],		// 表单提交，提示方式、提示层id
				objArrTmp	: [],		// 临时对象数变量，添加每条rule时临时使用，使用完即清空
				dataArrTmp	: [],		// 临时数据
				labelTmp	: 0,		// 执行show函数时存储当前label值
				placeholder 	: [],		// 是否为placeholder
				errorArr	: [],		// 每项规则验证失败后回调
				cloneArr	: []		// 默认ruleArr + dataArr 克隆
			};
			// 非Form提交
			if (grp === true || powForm === true) {
				F = F_;
				G = powForm ? grp < 0 ? F.length + grp : grp : F.length;
				opt.powForm = true;
			} else if (grp === null) {
				// 清空规则
				F_ = [];
				_F = [];
				G  = 0;
				F  = null;
				return;
			} else {
				F = _F;
				G = isNaN(grp)
						? F.length
						: (grp < 0
							? $('form').length + grp
							: grp
						);
				if (G < 0) {
					alert('分组配置错误'+G);
					return;
				}
				// 设置表单主选择器
				opt.relative = 'form:eq('+ G +')';
			}
			switch (action) {
				case 'INSERT'	:
					if (F[G]) {
						F.splice(G, 0, opt);
					} else {
						F[G] = opt;
					}
					break;
				case 'INSERTONE':
					if (F[G]) {
						if (!F[G].insert) {
							opt.insert = true;
							F.splice(G,0,opt);
						}
					} else {
						F[G] = opt;
					}
				case 'DELETE'	:
					F[G] && $(document).off(F[G].event[0],F[G].event[1]) && F.splice(G, 1);
					break;
				case 'RESET'	:
					F[G] && $(document).off(F[G].event[0],F[G].event[1]);
					F[G] = opt;
					break;
				default			:
					if (F[G]) {
						console.log('分组配置冲突'+ G);
						return;
					}
					F[G] = opt;
			}
			return G;
		},
		/* 添加规则及规则出错提示 */
		rule	: function(obj, rule, errTip, corTip, defTip, focTip, ajxTip) {
			F.length || $.form.group(0);
			obj	= obj.split(',');
			if (typeof errTip === 'object') {
				errTip	= errTip.errTip === undefined ? [] : errTip.errTip.split('|'),
				corTip	= errTip.corTip === undefined ? [] : [errTip.corTip],
				defTip	= errTip.defTip === undefined ? [] : [errTip.defTip],
				focTip	= errTip.focTip === undefined ? [] : [errTip.focTip],
				ajxTip	= errTip.ajxTip === undefined ? [] : [errTip.ajxTip];
			} else {
				errTip	= errTip === undefined ? [] : errTip.split('|'),
				corTip	= corTip === undefined ? [] : [corTip],
				defTip	= defTip === undefined ? [] : [defTip],
				focTip	= focTip === undefined ? [] : [focTip],
				ajxTip	= ajxTip === undefined ? [] : [ajxTip];
			}
			if (rule === undefined) {
				rule = ['notempty'];
			} else {
				// 防止正则里面的|线被分割
				rule = '|' + rule + '|';
				var expRule = rule.match(/\|\[.+\]\|/g),
					rgxRule = rule.match(/\|\/.+\/\|/g);
				rule = rule.replace(/\|\[.+\]\|/g, '|[EXPRULE]|').replace(/\|\/.+\/\|/g, '|[RGXRULE]|').slice(1, -1).split('|');
				for (var i in rule) {
					if (rule[i] == '[EXPRULE]') {
						rule[i] = expRule.shift().replace(/^\|\[|\]\|$/g, '').split('|');
					} else if (rule[i] == '[RGXRULE]') {
						rule[i] = rgxRule.shift().replace(/^\|\/|\/\|$/g, '');
					}
				}
			}
			// 初始化objArrTmp为空
			F[G].objArrTmp = [];
			var chkArr, k, el, hd;
			if (typeof focTip[0] == 'object') {
				hd = focTip[0][0];
				focTip = [focTip[0][1]];
			}
			for (var i in obj) {
				chkArr = [];
				for (var j in rule) {
					if (typeof rule[j] == 'object') {
						for (var l in rule[j]) {
							rule[j][l] = '(' + rule[j][l] + ')';
						}
						chkArr[j] = rule[j].join('|');
					} else {
						chkArr[j] = rule[j];
					}
					// 若未设置errTip，则初始化errTip设置
					errTip[j] || (errTip[j] = config.tip[rule[j].replace(/^#|\(.*\)$/g, '')] || '验证未通过');
				}
				k = _indexOf(F[G].objArr, obj[i]);
				if (k == -1) {
					if (F[G].powForm) {
						hd || (hd = $(document));
						el = $(obj[i]).eq(0);
					} else {
						hd || (hd = $('form').eq(G));
						el = hd.find(obj[i]).eq(0);
					}
					// 初始化数据
					F[G].objArr.push(obj[i]);
					F[G].ruleArr.push([[chkArr], [0], [errTip], corTip, defTip, focTip, ajxTip, [], []]);
					// 表单默认值
					F[G].dataArr.push([$.inArray(el.attr('type'), ['checkbox','radio']) > -1 && !el.is(':checked') ? '' : el.val()]);
					k = F[G].objArr.length - 1;
					// 默认提示
					if (defTip[0]) {
						show(F[G], el, 2, k, 0, -1);
					}
					// focus监听
					if (focTip[0]) {
						var H = F[G];
						hd.on('focus', obj[i], function(e) {
							var self = $(this);
							self.data('tof') || show(H, self, 3, k, hd.find(obj[i]).index(self));
						});
					}
				} else {
					// 选择器已存在
					for (j in chkArr) {
						if (-1 == _indexOf(F[G].ruleArr[k][0][0], chkArr[j])) {
							F[G].ruleArr[k][0][0].push(chkArr[j]);
							F[G].ruleArr[k][2][0].push(errTip[j]);
						}
					}
				}
				// 用于impl下面的函数
				F[G].objArrTmp.push(obj[i]);
			}
			return impl;
		},
		submit : function(opt) {
			// 初始化
			var g		= G,
				H		= F[g],
				init  	= $.extend({}, {
					tof 		 : true,
					bindSubmit	 : '',
					relative	 : H.relative,
					beforeSubmit : function() {},
					success		 : function() {}
				}, opt || {}),
				submit 	= false, hasConfirm = false;
				// 表单默认数据
				defData = $(init.relative).eq(0).serialize();
			// 附加数据，用于DELETE、RESET
			H.event = ['submit', init.relative];
			// 外部绑定触发事件
			init.bindSubmit && $(document).on('click', init.bindSubmit, function() {
				$(init.relative).eq($(init.bindSubmit).index($(this))).submit();
			});
			// 事件监听
			$(document).off('submit', init.relative).on('submit', init.relative, function() {
				var self = $(this);
				// 防重复提交、添加hook - beroreSubmit
				if (submit || init.beforeSubmit.call(self))
					return false;
				// 表单验证
				if (!check(H, self, g, H.objArr))
					return false;
				if (defData == self.serialize() && init.tof) {
					var fileFlag = false;
					self.find('input[type=file]').each(function() {
						if ($(this).val() != '') {
							fileFlag = true;
							return;
						}
					});
					if (!fileFlag) {
						show(H, true, 0, '表单域未更新！');
						return false;
					}
				}
				// 验证通过后，加入hook - success
				if (init.success.call(self)) return false;
				submit = true;
				return true;
			});
		},
		ajxSubmit : function(opt) {
			var g		= G,
				H		= F[g],
				init	= $.extend({}, {
					ajxTip		: '',
					errTip		: '',
					corTip		: '',
					tof 		: true,
					type		: 'post',
					bindSubmit	: '',
					relative	: H.relative,
					beforeSubmit	: function(){},
					beforeSend 	: function(){},
					success 	: function(){},
					error		: function(){}
				}, opt || {}),
				submit 	= false,
				// 表单默认数据
				defData = $(init.relative).eq(0).serialize();
			// 附加数据，用于DELETE、RESET
			H.event = ['submit', init.relative];
			// 外部绑定触发事件
			init.bindSubmit && $(document).on('click', init.bindSubmit, function() {
				$(init.relative).eq($(init.bindSubmit).index($(this))).submit();
			});
			// 事件监听
			$(document).off('submit', init.relative).on('submit', init.relative, function(e) {
				var self = $(this);
				if (submit || init.beforeSubmit.call(self)) {
					return false;
				}
				e.preventDefault();

				var subData  = self.serialize(),
					postData = self.serializeArray(),
					data 	 = {};
				// 表单验证
				if (!check(H, self, g, H.objArr))
					return false;
				if (defData === subData && init.tof) {
					var fileFlag = false;
					self.find('input[type=file]').each(function() {
						if ($(this).val() != '') {
							fileFlag = true;
							return;
						}
					})
					if (!fileFlag) {
						show(H, true, 0, '表单域未更新！');
						return false;
					}
				}
				submit = true;
				$.each(postData,function(i,e2) {
					var name 	= e2.name
					if (name.match(/\[\]/) !== null) {
						name = name.replace('[]', '');
						if (data[name]) {
							data[name].push(e2.value);
						} else {
							data[name] = [e2.value];
						}
					} else {
						data[name] = e2.value;
					}
				});
				$.ajax({
					type		: init.type,
					async		: true,
					url		: self.attr('action'),
					dataType	: 'json',
					data		: data,
					beforeSend	: function() {
						// 不带参的hook - beforeSend
						if (!init.beforeSend.call(self) && H.subTipArr.length != 0) {
							show(H, true, 4, init.ajxTip);
						}
					},
					success		: function(data) {
						if (data.code >= 1) {
							// hook - success
							if (!init.success.call(self, data)) {
								var cb = data.url ? ('location.href = "'+ data.url +'"') : 'location.reload()';
								show(H, true, 1, init.corTip || data.msg);
								H.labelTmp == 4
									? setTimeout(cb, 500)
									: setTimeout(cb, 1500)
							}
							defData = self.serialize();
						} else {
							init.error.call(self, data);
							show(H, true, 0, init.errTip || data.msg);
						}
						// 表单提交成功后，重置submited为false
						submit = false;
					},
					error		: function(err) {
						console.log(err);
					}
				});
			});
		},
		powSubmit : function(handle, opt) {
			// 初始化
			var g		= G,
				H		= F[g],
				submit	= false,
				defData = {},
				init	= $.extend({}, {
					url		: null,
					key		: [],
					tof		: true,
					ajax		: true,
					type		: 'post',
					ajxTip		: '',
					errTip		: '',
					corTip		: '',
					relative	: document,	// 相对祖先选择器
					beforeSubmit	: function() {},
					beforeSend	: function() {},
					success		: function() {},
					error		: function() {}
				}, opt || {}),
				setData = function(data) {
					for (var i in H.objArr) {
						var parent = $(init.relative).find(H.objArr[i]);
						parent.prop('type') == 'checkbox' || parent.prop('type') == 'radio' && (parent = parent.filter(':checked'));
						data[init.key[i] || parent.attr('name')] = parent.attr('contenteditable') ? parent.html() : parent.val();
					}
				};
			// 设置事件
			H.event = ['click', init.relative +' '+ handle];
			H.relative = init.relative;
			// 设置默认值
			setData(defData);
			// 触发事件
			$(init.relative).off('click', handle).on('click', handle, function(e) {
				var el = $(this), data = {},
					url = typeof init.url === 'function' ? init.url.call(el) : init.url;
				// 防重复提交、beforeSubmit
				if (submit || init.beforeSubmit.call(el))
					return false;
				// 数据验证
				if (check(H, $(init.relative), g, H.objArr)) {
					// 设置当前值
					setData(data);
					if (JSON.stringify(defData) == JSON.stringify(data) && init.tof) {
						show(H, true, 0, '表单域未更新！');
						return false;
					}
					// 设置defData
					defData = data;
					if (init.ajax && url) {
						submit 	= true;
						$.ajax({
							async		: false,
							dataType	: 'json',
							type		: init.type,
							url		: url,
							data		: data,
							beforeSend	: function() {
								// 不带参的hook - beforeSend
								if (!init.beforeSend.call(el)) {
									H.subTipArr.length == 0 || show(H, true, 4, init.ajxTip);
								} else {
									return false;
								}
							},
							success		: function(data) {
								if (data.code >= 1) {
									// hook - success
									if (!init.success.call(el, data)) {
										var cb = data.url ? 'location.reload()' : ('"location.href = ' + data.url + '"');
										H.labelTmp == 4
											? setTimeout(cb, 500)
											: setTimeout(cb, 1000)
									}
									show(H, true, 1, init.corTip || data.msg);
								} else {
									init.error.call(el, data);
									show(H, true, 0, init.errTip || data.msg);
								}
								// 表单提交成功后，重置submit为false
								submit = false;
							}
						});
					} else {
						var query = '';
						for (var k in data) {
							if (data[k] === '') continue;
							query += '&' + k + '=' + data[k];
						}
						query = query.replace('&','?');
						// 验证通过后，加入hook - success
						if (init.success.call(this, init.url + query))
							return false;
						if (init.url) {
							location.href = init.url + query;
							submit = true;
						}
					}
				}
				e.stopPropagation();
			});
		},
		// rule规则重新设置
		ruleSet	: function(action, rule, p, g) {
			g === undefined && (g = G);
			p === undefined && (p = F[g].objArr.length);
			switch (action) {
				case 'INSERT' :
					var ruleArr	= [],
						chkArr	= [],
						errTip	= rule.errTip === undefined ? [] : rule.errTip.split('|'),
						corTip	= rule.corTip === undefined ? [] : [rule.corTip],
						defTip	= rule.defTip === undefined ? [] : [rule.defTip],
						focTip	= rule.focTip === undefined ? [] : [rule.focTip],
						ajxTip	= rule.ajxTip === undefined ? [] : [rule.ajxTip],
						hd	= null,
						fb	= null;
					F[g].objArrTmp = [];
					if (rule.rule === undefined) {
						ruleArr 	= ['notempty'];
					} else {
						// 防止正则里面的|线被分割
						rule.rule = '|' + rule.rule + '|';
						var expRule = rule.rule.match(/\|\[.+\]\|/g),
							rgxRule = rule.rule.match(/\|\/.+\/\|/g);
						ruleArr = rule.rule.replace(/\|\[.+\]\|/g, '|[EXPRULE]|').replace(/\|\/.+\/\|/g, '|[RGXRULE]|').slice(1, -1).split('|');
						for (var i in ruleArr) {
							if (ruleArr[i] == '[EXPRULE]') {
								ruleArr[i] = expRule.shift().replace(/^\|\[|\]\|$/g, '').split('|');
							} else if (rule[i] == '[RGXRULE]') {
								ruleArr[i] = rgxRule.shift().replace(/^\|\/|\/\|$/g, '');
							}
						}
					}
					for (var i in ruleArr) {
						if (typeof ruleArr[i] == 'object') {
							for (var l in ruleArr[i]) {
								ruleArr[i][l] = '(' + ruleArr[i][l] + ')';
							}
							chkArr[i] = ruleArr[i].join('|');
						} else {
							chkArr[i] = ruleArr[i];
						}
						// 若未设置errTip，则初始化errTip设置
						errTip[i] || (errTip[i] = config.tip[ruleArr[i].replace(/^#|\(.*\)$/g, '')] || '验证未通过');
					}
					if (F[g].powForm) {
						hd = $(document);
						el = $(rule.obj);
					} else {
						hd = $('form').eq(g);
						el = hd.find(rule.obj).eq(0);
					}
					F[g].objArr.splice(p, 0, rule.obj);
					F[g].ruleArr.splice(p, 0, [[chkArr], [0], [errTip], corTip, defTip, focTip, ajxTip, [], []]);
					F[g].dataArr.splice(p, 0, [$.inArray(el.attr('type'), ['checkbox','radio']) > -1 && !el.is(':checked') ? '' : el.val()]);
					// 默认提示
					if (defTip[0]) {
						show(F[g], el, 2, p, 0, -1);
					}
					// focus监听
					if (focTip[0]) {
						var H = F[g];
						hd.on('focus', rule.obj, function(e) {
							var self = $(this);
							self.data('tof') || show(H, self, 3, p, hd.find(rule.obj).index(self));
						});
					}
					// 用于impl下面的函数
					F[g].objArrTmp.push(rule.obj);
					break;
				case 'MODIFY':
					// 修改规则
					if (rule.rule) {
						// 防止正则里面的|线被分割
						rule.rule = '|' + rule.rule + '|';
						var chkArr  = [],
							expRule = rule.rule.match(/\|\[.+\]\|/g),
							rgxRule = rule.rule.match(/\|\/.+\/\|/g),
							ruleArr = rule.rule.replace(/\|\[.+\]\|/g, '|[EXPRULE]|').replace(/\|\/.+\/\|/g, '|[RGXRULE]|').slice(1, -1).split('|');
						for (var i in ruleArr) {
							if (ruleArr[i] == '[EXPRULE]') {
								ruleArr[i] = expRule.shift().replace(/^\|\[|\]\|$/g, '').split('|');
							} else if (rule[i] == '[RGXRULE]') {
								ruleArr[i] = rgxRule.shift().replace(/^\|\/|\/\|$/g, '');
							}
						}
						for (var i in ruleArr) {
							if (typeof ruleArr[i] == 'object') {
								for (var l in ruleArr[i]) {
									ruleArr[i][l] = '(' + ruleArr[i][l] + ')';
								}
								chkArr[i] = ruleArr[i].join('|');
							} else {
								chkArr[i] = ruleArr[i];
							}
						}
						F[g].ruleArr[p][0] = [chkArr];
						F[g].ruleArr[p][2] = [errTip];
					}
					// 修改对象
					if (rule.obj) {
						if (!F[g].cloneArr[p]) {
							F[g].cloneArr[p] = [$.extend(true, {}, F[g].ruleArr[p]), $.extend(true, {}, F[g].dataArr[p])];
						}
						F[g].objArr[p] = rule.obj;
					}
					// 错误提示
					if (rule.errTip) {
						rule.errTip = rule.errTip.split('|');
						for (var i in rule.errTip) {
							// 若未设置errTip，则初始化errTip设置
							rule.errTip[i] || (rule.errTip[i] = config.tip[F[g].ruleArr[p][0][0][i].replace(/^#|\(.*\)$/g, '')] || '验证未通过');
						}
						F[g].ruleArr[p][2] = [rule.errTip];
					}
					rule.corTip === undefined || (F[g].ruleArr[p][3] = [rule.corTip]);
					rule.defTip === undefined || (F[g].ruleArr[p][4] = [rule.defTip]);
					rule.focTip === undefined || (F[g].ruleArr[p][5] = [rule.focTip]);
					rule.ajxTip === undefined || (F[g].ruleArr[p][6] = [rule.ajxTip]);
					rule.defData=== undefined || (F[g].dataArr[p] = [rule.defData]);
					break;
				case 'DELETE'	:
					F[g].objArr.splice(p, 1);
					F[g].ruleArr.splice(p, 1);
					F[g].dataArr.splice(p, 1);
					F[g].dataArrTmp.splice(p, 1);
					F[g].cloneArr.splice(p, 1);
					break;
				case 'STATUS'	:
					rule instanceof Array
						? F[g].ruleArr[p][1][rule[0]] = rule[1]
						: F[g].ruleArr[p][1][0] = rule;
					break;
				default			: return;
			}
			return impl;
		},
		// 外部事件执行验证
		check : function(bindSelector, cb, ckObj) {
			var g 		= G,
				H		= F[g],
				objArr, type;
			if (ckObj == undefined) {
				objArr	= F[g].objArr.slice(0);
			} else if (typeof ckObj == 'string') {
				objArr	= ckObj.split(',');
				type	= true;
			}
			$(bindSelector).on('click', function() {
				if ($.isFunction(ckObj)) {
					objArr	= ckObj.call($(this)).split(',');
					type	= true;
				}
				check(H, $(H.relative), g, objArr, type) && cb.call($(this), $(H.relative));
			});
		},
		// 失去焦点
		blur : function(obj, isImpl) {
			var g 	= G;
			obj || (obj = F[g].powForm ? $(document) : $('form').eq(g));
			$.each(isImpl ? F[g].objArrTmp : F[g].objArr, function(i, e) {
				isImpl && (i = _indexOf(F[g].objArr, e))
				// blur事件监听
				obj.off('blur', F[g].objArr[i]).on('blur', F[g].objArr[i], function(e) {
					var self = $(this);
					_check(F[g], self, i, g, obj.find(F[g].objArr[i]).index(self));
					return false;
				});
			});
			return isImpl ? impl : $.form;
		},
		// 设置提示方式
		way : function(tipTyp, tipPos, tipSub, isImpl) {
			switch (tipTyp) {
				case 'auto'   : tipTyp = 0; break;
				case 'alert'  : tipTyp = 1; break;
				case 'single' : tipTyp = 2; break;
				case 'none'	  : tipTyp = 3; break;
			}
			if (tipSub === true && !isImpl) {
				F[G].subTipArr = [tipTyp, tipPos];
			} else {
				var chkArr = isImpl ? F[G].objArrTmp : F[G].objArr;
				for (var i in chkArr) {
					var k = isImpl ? _indexOf(F[G].objArr, chkArr[i]) : i;
					for(var j in F[G].ruleArr[k]) {
						F[G].ruleArr[k][7][j] = tipTyp;
						tipPos == undefined || (F[G].ruleArr[k][8][j] = tipPos);
					}
				};
				if (tipSub !== false) {
					F[G].subTipArr = [tipTyp, tipPos];
				}
			}
			return isImpl ? impl : $.form;
		},
		// 默认显示内容
		placeholder : function(opt, isImpl) {
			var init = {
					focus 		: function() {},
					blur  		: function() {}
				};
			opt == undefined || $.extend(init, opt);
			$.each(isImpl ? F[G].objArrTmp : F[G].objArr, function(i, e) {
				var Fobj 	= F[G].powForm ? $(e) : $('form').eq(G).find(e),
					defData = Fobj.val();
				isImpl && (i = _indexOf(F[G].objArr, e));
				if (defData != '' && i != -1) {
					F[G].placeholder[i] = 1;
				}
				Fobj.focus(function() {
					var data = $(this).val();
					if (data == defData) {
						$(this).val('');
						init.focus.call(this);
					}
				}).blur(function() {
					var self = $(this),
						data = self.val();
					if (data == '') {
						init.blur.call(this);
						setTimeout(function(){
							self.val(defData);
						},50);
					}
				});
			});
			return isImpl ? impl : $.form;
		},
		error	: function(cb, isImpl) {
			$.each(isImpl ? F[G].objArrTmp : F[G].objArr, function(i, e) {
				isImpl && (i = _indexOf(F[G].objArr, e));
				F[G].errorArr[i] = cb;
			});
			return isImpl ? impl : $.form;
		},
		/* 生成验证码
		 * 用法：$.form.verify(参数);
		 * selector	: [必须]验证码相对位置选择器
		 * url		：[必须]生成验证码的链接地址
		 * action	: 动作类型
		 */
		verify : function(selector, url, action, cb) {
			var verify = $('<img src="' + url + '" style="cursor:pointer" title="刷新验证码" onclick="this.src=this.src + \'?\' + Math.random()" />');
			$(selector)[typeof action == 'string' ? action : 'append'](verify);

			typeof action == 'function'
				? action.call(verify)
				: typeof cb == 'function' && cb.call(verify);
		}
	}
	// 链式方法，用于rule方法后的链式调用
	var impl = {
		// 失去焦点
		blur		: function(obj) {
			return $.form.blur(obj, true);
		},
		// 提示方式
		way			: function(tipTyp, tipPos, TOF) {
			return $.form.way(tipTyp, tipPos, TOF, true);
		},
		placeholder : function(opt) {
			return $.form.placeholder(opt, true);
		},
		error		: function(cb) {
			return $.form.error(cb, true);
		}
	};
})(jQuery);
