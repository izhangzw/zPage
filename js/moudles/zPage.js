define(['jquery', 'jquery.tmpl'], function($){
	var _default = {
		ctx: './tmpl/',
		tmpl: 'home',//默认加载模板名
		suff: '.html',//后缀名
		tmpl1st: '[zpage]',
		tmpl2st: '[zpage2]'//二级模板默认名
	}
	//一级模板加载位置
	var $Loader = $(_default.tmpl1st);
	
	//Load Page之后执行
	var loadAfter = function(rep,status,xhr){
		if(status==='success'){
			//TODO do something after success
		}else{
			$Loader.html(xhr.responseText+'<h3>('+xhr.status+')</h3>')
		}
	}
	var appendDefaultHash = function(){
		if ('pushState' in history) {
			history.pushState(0, 0, '#'+_default.tmpl);
		}else{
			//Fix IE8/9 history.pushState
			//location.hash = '#'+tmpl
		}
	}
	//组装load URL
	var makeURL = function(opt){
		var options = {}
		options = $.extend(options, _default, opt);
		var url = options.ctx + options.tmpl + options.suff;
		if(options.parameter) url += ('?'+options.parameter);
		return url;
	}
	/**
	 * 解析Hash
	 * 
	 * return {
	 * 	[tmpl]
	 * 	[tmpl2nd]
	 * 	[parameter]
	 * }
	 */
	var readHash = function(){
		var
		hash = location.hash.replace('#', ''),//去掉#
		_aHash = hash.split('?'),
		tmpl = '',
		parameter,//url上面的参数
		ret = {};
		
		_aHash[0] && ( tmpl = _aHash[0] );
		parameter = _aHash.length>1 ? _aHash[1] : '';
		
		var i = tmpl.indexOf('/');
		var has2nd = i != -1;
		var tmpl1st,tmpl2nd;
		
		if(has2nd){
			tmpl1st = tmpl.substring(0, i)
			tmpl2nd = tmpl.substring(i, tmpl.length)
		}else{
			tmpl1st = tmpl;
			tmpl2nd = '';
		}
		
		tmpl && ( ret.tmpl = tmpl1st );
		tmpl2nd && ( ret.tmpl2nd = tmpl2nd );
		parameter && ( ret.parameter = parameter );
		return ret;
	}
	
	return {
		config: function(setting){
			_default = $.extend(_default, setting);
		},
		init: function(){
			var 
			options = readHash(),
			url = makeURL(options);
			// Load...
			$Loader.load(url, loadAfter)
			//
			if(!options.tmpl){
				appendDefaultHash()
			}
		},
		/**
		 * 截取URL上参数
		 * @param {String} name - URL上参数key
		 */
		params: function(name){
			var hash = location.hash;
			var index = hash.indexOf('?');
			var search = hash.substr(index);
			var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");//构造一个含有目标参数的正则表达式对象
			var r = search.substr(1).match(reg);//匹配目标参数
			if (r!=null) return unescape(r[2]); return null;//返回参数值
		},
		//二级模板名
		tmpl2nd: function(){
			var path = location.hash.replace('#', '').split('?').shift();//Hash去掉#和参数
			var index = path.indexOf('/');
			return index != -1 ? path.substr(++index) : '';
		},
		/**
		 * 加载二级模板
		 * @param {String} tmplId 模板名
		 * @param {String} pozId  放置模板的位置
		 */
		fill: function(tmplId, pozId){
			tmplId = this.tmpl2nd() || tmplId;
			
			var $tmpl = $('#'+tmplId);
			pozId = pozId ? ( '#'+pozId ) : _default.tmpl2st;
			if($tmpl.length)
				$tmpl.tmpl().appendTo(pozId);
			else{
				$(pozId).html('模板'+tmplId+'未找到')
			}
		}
	}
})