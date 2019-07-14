# 一、简介
    网页表单验证是网页上一种极为常见的需求，对于开发者来讲，要实现这些各种不同的验证需求，实在另人头疼，如不借助好的工具，将会耗费大量开发时间且可能编写出大量冗余代码。因而找到一款强大、简洁、使用简单的通用验证方案就显得尤为迫切需要，而我编写的form.js就是这样的一款基于Jquery的表单验证插件，一把锋利而又小巧的刀，经过了累积至少60多个工作日的煅造以及无数个验证需求的淬炼，几乎能解决所有的验证问题。这不是在吹嘘，而是在解决这个表单验证的问题上投入了太多的时间与心血，我想其足够能满足你的各种验证需求，正常表单、可编辑DIV表单和无<form>包裹的表单均可自动分组绑定、勿须在DOM上加额外属性、规则可动态增删改、极少的API接口、简便的使用方式、强大的验证功能，它诞生于2013年9月，一直应用于我所开发的项目当中，除了共事的若干同事，几无人知晓。  
    当然针对网页表单验证需求的验证方案已有不少，如NiceValidator、ValidForm、Rapid-Validation、Layui-form、FormValidator等，不乏优秀之作，当然我还是更喜欢我的form.js，因为我对她更熟悉，也认为它使用更简单、灵活。  
# 二、内置规则、提示、验证函数
## 2.1 内置提示
	notempty		必填项不能为空  
	chs			只允许汉字  
	chsAlpha		只允许汉字、字母  
	chsAlphaNum		只允许汉字、字母、数字  
	chsDash			只允许汉字、字母、数字、下划线、破折号  
	num			只允许数字  
	alpha			只允许字母  
	alphaNum		只允许字母、数字  
	alphaDash		只允许字母、数字、下划线、破折号  
	zipCode			邮编格式不正确  
	email			邮箱格式不正确  
	mobile			手机号格式不正确  
	idCard			身份证格式不正确  
	idPass			护照格式不正确  
	date			日期格式不正确  
	ip			IP地址格式不正确  
	url			URL地址格式不正确  
## 2.2 内置规则
	empty			// 为空  
	notempty		// 非空  
	chs			// 仅汉字  
	chsAlpha		// 仅汉字、字母  
	chsAlphaNum		// 仅汉字、字母、数字  
	chsDash			// 仅汉字、字母、数字、下划线、破折号  
	num			// 仅数字  
	alpha			// 仅字母  
	alphaNum		// 仅字母、数字  
	alphaDash		// 仅字母、数字、下划线、破折号  
	zipCode			// 邮编  
	email			// 邮箱  
	mobile			// 手机号  
	idCard			// 身份证  
	idPass			// 护照  
	date			// 日期  
	ip			// IP4地址  
	url			// URL地址  
## 2.3 内置验证函数（eq()、gt()、lt()、limit()、ajx()）
	eq(arg1, arg2)	  	// 当无参数arg2时，则判断是否相等，当arg2=true时，则arg1应为表单域选择器，此时判断2个文本域值是否相等，通常用于判断2次密码输入是否相等
	gt(arg)			// 判断是否大于，大于为真  
	lt(arg)			// 判断是否小于，小于为真  
	limit(arg1,arg2)	// 判断长度是否符合要求，arg2省略则表示固定长度判断  
	ajx(url, type)		// ajax请求返回真假，type取值[post|get]，默认get  
# 三、核心接口
## 3.1 $.form.group(grp, action, powForm);
说明：  
表单分组接口，必须。  
参数：  
	1）参数grp，值范围[…-2,-1,0,1,2…true]，整数或true  
		grp = true表示非正常表单（无<form>标签包裹的表单域，下文将不作说明）  
		grp = -1 表示最后一个表单，依此类推-2为倒数第二个表单  
		grp = 0 表示第一个表单，grp = 1表示第二个表单，依此类推  
	2）参数action，值范围[INSERT, INSERTONE, DELETE, RESET]，可省略，主要用于动态添加、删除表单（对应DOM结点新增、删除表单）  
		action = INSERT 表示在指定表单前插入一个表单  
		action = INSERTONE 表示在指定表单前仅可插入一个表单  
		action = DELETE 表示删除一个表单  
		action = RESET 表示重置表单，将表单数组恢复至默认状态  
	3）参数powForm，当powForm = true表示非正常表单  
使用：  
	// 按页面表单顺序自动绑定监听，将页面正常表单进行索引分组  
	$.form.group();  
	//按页面表单顺序自动绑定监听，自动将页面非正常表单进行索引分组  
	$.form.group(true);  
	// 绑定监听页面第一个表单  
	$.form.group(0);  
	// 绑定监听页面最后一个表单  
	$.form.group(-1);  
## 3.2 $.form.rule(obj, rule, errTip, corTip, defTip, focTip, ajxTip);  
说明：  
	设置规则、数据、提示，绑定监听输入域  
参数：  
	参数obj以“,”分割的需要验证的表单域选择器，一般只写单个选择器  
	参数rule以“|”分割的验证规则，规则支持“内置规则”、“内置函数”、“JS函数”、“自定义函数”、“正则表达式”及“规则表达式”  
	参数errTip有2种类型，当为字符串时表示“错误提示”，以“|”进行分割，对应相应的验证规则，当errTip为对象时则表示以JSON对象形式设置提示  
	{  
		errTip: '错误提示',  
		corTip: '正确提示',  
		defTip: '默认提示'，  
		focTip: '焦点提示',  
		'ajxTip': '加载提示'  
	}  
	参数corTip表示正确提示  
	参数defTip表示默认提示  
	参数focTip表示焦点提示  
	参数ajxTip表示加载提示  
使用：  
	// 单选择器规则设置，下例没有设置notempty的规则提示，则使用内置默认提示  
	$.form.rule('input[name="username"]', 'notempty|alhpaDash|limit(4,15)','|格式不正确|长度4-15');  
	// 多选择器相同验证规则  
	$.form.rule('input[name="mobile"],input[name="passport"]', 'notempty');  
	// 对mobile继续添加规则，ajx函数里url可以不用写引号（已做处理）  
	$.form.rule('input[name="mobile"]', 'mobile|ajx(/api/chkMobile)','手机格式不正确|手机号已被占用','手机号可用','联系人手机号','格式为…','检查手机号是否可用中…'); 
	// 对密码继续添加规则，并通过eq函数绑定repassword域  
	$.form.rule('input[name="passport"]', 'gt(7)|eq(input[name="repassword"],true)','密码长度大于7');  
	// eq绑定password域  
	$.form.rule('input[name="repassword"]', 'eq(input[name="password"],true)',{  
	errTip: '2次密码输入不一致',  
	focTip: '请输入密码'  
});  

// 正则表达式规则  
$.form.rule('input[name="username"]','notempty|/^[a-z][a-z0-9_]{3,14}$/);  
// 规则表达式组合，以中括号包含、“|”分割的表达式组合，支持不含“|”的正则，表示或的意思，只要中括号里一项为真则该组合为真  
$.form.rule('input[name="username"]', 'notempty|[email|mobile|^[a-z][a-z0-9_]{3,14}$]');  
// 支持表达式取反，取反符号“!”，如下规则“!empty”同“notempty”  
$.form.rule('input[name="username"]', '!empty');  
// 特殊符号“#”，仅存在于第一个规则表达式前，主要用于调整类似多个input[name="contact[]"]相同规则名不同对象的验证顺序，例如下面的表单域，如果不加“#”号，则验证顺序为1->3->2->4，加“#”号，则验证顺序为1->2->3->4  
$.form.rule('input[name="contactName[]"]','#notempty');  
$.form.rule('input[name="contactMobile []"]','#notempty');  
1）<input name="contactName[]" />  
2）<input name="contactMobile[]" />  
3）<input name="contactName[]" />  
4）<input name="contactMobile[]" />  

## 3.3 $.form.submit(opt);  
说明：  
	正常表单提交动作监听  
参数：  
参数opt，一般省略  
{    
		bindSubmit	: '',			// 外部触发表单提交的选择器  
		beforeSubmit	: function() {},	// 提交操作，执行验证之前的回调  
		success		: function() {}		// 验证通过后的回调  
}  
## 3.4 $.form.ajxSubmit(opt);
说明：
	正常表单ajax方式提交动作监听
参数：
	参数opt，一般省略
	{
		ajxTip		: '',				// 请求过程序提示
		errTip		: '',				// 错误提示
		corTip		: '',				// 正确提示
		bindSubmit	: '',				// 外部触发表单提交的选择器
		beforeSubmit	: function() {},		// 提交操作，执行验证之前的回调
		beforeSend	: function() {},		// ajax请求，发送数据之前的回调
		success		: function() {},		// ajax请求成功后的回调
		error		: function() {}		// ajax请求失败后的回调
	}
## 3.5 $.form.powSubmit(selector, opt);
说明：
	非正常表单提交动作监听，支持AJAX及HTTP get方式提交，支持可编辑DIV表单。
参数：
	参数opt，必填
	{
url			: '',				// 请求URL
		key			: [],				// 表单域name，可省略
		ajax			: true,			// 默认AJAX方式提交
		type			: 'post',			// 用于AJAX
		ajxTip		: '',				// 用于AJAX请求时的加载提示
		errTip		: '',				// 用于AJAX请求时的错误提示
		corTip		: '',				// 用于AJAX请求时的正确提示
		relative		: '',				// 文本域及handle祖先选择器，起限定范围作用
		beforeSubmit : function() {},		// 提交操作，执行验证之前的回调
		beforeSend	: function() {},		// ajax请求，发送数据之前的回调
		success		: function() {},		// ajax请求成功后的回调
		error		: function() {}		// ajax请求失败后的回调
	}
## 3.6 $.form.way(tipWay, tipPos, tipSub);
说明：
	设置验证提示方式，可单独设置每一文本域的提示方式、提示位置，也可批量设置；当tipSub === true时，表示设置公共提示方式与提示位置，当tipSub === false 时，表示不设置公共提示，否则则以最后一个验证域的“提示设置”设置公共提示。
参数：
	参数tipWay，取值[0,1,2,3]或者[auto,alert,single,none]，表示提式方式。分别表示“自动”、“弹窗”、“单一位置”、“无提示”
	参数tipPos，提示位置选择器
	参数tipSub，表示设置公共提示方式及位置
使用：
	# 设置username域的验证方式为“弹出窗口式”
	$.form.rule(' input[name="username"]').way('alert');
	# 批量设置，在多个$.form.rule()之后加入以下代码
	$.form.way('single', '#tip');
	# 支持链式调用
	$.form.way('none').submit();
#  3.7 $.form.blur(obj);
说明：
	失去焦点触发验证函数
参数：
	obj表示指定的文本域对象，一般省略
使用：
	// 监听rule指定的文本域失去焦点事件
	$.form.rule().blur();
	// 批量设置，在多个$.form.rule()之后加入以下代码
	$.form.blur();
	// 支持链式调用
	$.form.blur().submit();
# 四、辅助接口
## 4.1 $.form.config(opt1, opt2)
说明：
全局配置表单验证规则及提示，可省略
使用：
	# 同时配置规则及提示
	$.form.config({
		tip: {
			email: '邮箱格式不正确！',
			mobile: '手机格式不正确！'
		},
		regex: {
			email: '^([a-zA-Z0-9_\\.\\-])+\\@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9]{2,4})+$',
			mobile: '^1[0-9]{10}$'
		}
	});
	// 单独配置提示
	$.form.config({
		email: '邮箱格式不正确！',
		mobile: '手机格式不正确！'
	}, 'tip');
	// 单配置规则，注意“\”转义符要写成“\\”双斜线
	$.form.config({
		email: '^([a-zA-Z0-9_\\.\\-])+\\@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9]{2,4})+$',
		mobile: '^1[0-9]{10}$'
	}, 'regex');
## 4.2 $.form.error(cb);
说明：
	为每项表单对象验证失败后提供回调执行的接口，较少使用。
参数：
	参数cb表示回调函数
使用：
	# 通常单独设置
	$.form.rule().error(function() {});
	# 同样支持链式调用
	$.form.rule().way().blur().error();
	# 批量设置，很少使用
	$.form.error();
4.3 $.form.check(bindSelector, cb, ckObj);
说明：
	局部验证。
参数：
	参数bindSelector表示绑定click事件的选择器
	参数cb表示验证通过后执行的回调函数
	参数ckObj，待验证的局部表单域
		ckObj === undefined时，则自动验证已存储的部分表单域选择器
		ckObj类型为字符串时，应以“，”分割的表单域选择器
		ckObj类型为函数时，应返回以“，”分割的表单域选择器
使用：
	$.form.check('#sendMsg', function() {
		// 验证通过后，相应操作
});
# username、email验证通过后，则执行回调函数
$.form.check('#sendMail', function() {}, 'input[name="username"],input[name="email"]');
4.4 $.form.placeholder(opt);
说明：
	实现placeholder效果，focus事件隐藏默认的value值内容，blur事件显示默认的value值内容，支持链式调用
参数：
	参数opt通常省略，提供2个函数接口
	{
		focus: function() {},
		blur: function() {}
	}
使用：
	$.form.rule().placeholder();
	$.form.placeholder();
4.5 $.form.verify(selector, url, action, cb);
说明：
	生成验证码
参数：
	selector输出验证码的相对位置
	url 生成验证码的链接
	action 验证码的插入DOM方式，默认append，当action类型为function时，同cb回调函数，一般用于调整验证码样式
	cb应为function，可省略，一般用于调整验证码样式
使用：
	$.form.verify('#code', '/api/captcha/get', function() {
	this.css({
		width: 116,
		height: 30
	})
});
$.form.verify('#code', '/api/captcha/get', 'prepend', function() {});
4.6 $.form.ruleSet(action, pos, rule, g);
说明：
	动态新增、修改、删除验证规则，设置验证对象校验状态，默认状态为0，若设置为1则表示该验证对象不作验证
参数：
	action表示设置动作，取值[INSERT,MODIFY,DELETE,STATUS]
	pos表示验证对象在整个表单域验证数组中的索引位置
	rule规则对象，同$.form.rule()设置
	g表示表单分组索引，可省略
