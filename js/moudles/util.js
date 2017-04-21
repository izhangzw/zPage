define(['jquery', 'jquery.echarts'], function($, echarts){
	return {
		ajax: function(params, fn){
			var succ = function (ret) {
				if (ret.status === 'success') {
					if (fn) {fn(ret.data);}
				}else {
					alert(ret.errorMsg)
				}
			};
			$.ajax({
				url: params.url,
				type: params.method,
				data: params.data,
				cache: false,
				success: succ,
				error: function (xhr) {}
				,complete: function () {}
			})
		},
		/*throwError: function(name, msg){
			try{
				throw {
					name: name,
					message: msg
					//,extra: {a: 1,b: 2}
					//,remedy: error1
				}
			}catch(e){
				alert(e.message)
				//e.remedy()
			}
		},*/
		Loginer: {
			get: function(){
				if(!localStorage.loginer){
					//console.error('localStorage.loginer is null');
					return;
				}
				var o;
				if(localStorage){
					if(JSON.parse){
						o = JSON.parse(localStorage.loginer);
					}else{
						o = eval("("+localStorage.loginer+")");
					}
				}else{
					cookie.get('loginer');
				}
				return o;
			},
			set: function(data){
				var _data = typeof data === 'string' ? data : JSON.stringify(data);
				if(localStorage){
					localStorage.loginer = _data;
				}else{
					cookie.set('loginer', _data);
				}
			}
		},
		Echart: {
			pie: function(id, options){
				var e = echarts.init(document.getElementById(id), 'macarons');
				var u = {
					tooltip: {
				        trigger: 'item',
				        formatter: "{a} <br/>{b}: {c} ({d}%)"
				    },
					calculable: !0,
					legend: {
						x: 'center',
						y: 'bottom'
					},
					series: [{
						type: 'pie',
			            center: ['50%', '35%'],
			            radius: ['50%', '70%'],
						avoidLabelOverlap: false,
			            label: {
			                normal: {
			                    show: false,
			                    position: 'center'
			                }
			            },
			            itemStyle: {
							normal:{
								color: function(params) {
									var colorList = ['#22ac38','#f8ac59','#ed5565'];
									return colorList[params.dataIndex]
								}
							}
						}
					}]
				}
				//
				if(options.legend) u.legend = $.extend(u.legend, options.legend);
				if(options.series) u.series[0] = $.extend(u.series[0], options.series[0]);
				e.setOption(u);
				$(window).resize(e.resize);
			},
			xbar: function(id, options){
				var e = echarts.init(document.getElementById(id), 'macarons');
				var u = {
					legend: {
						data: ['耗时（毫秒）']
					},
					grid: {
						x: '14%',
						x2: 70,
						y2: 40
					},
					calculable: !0,
					yAxis: [{
						name: '用户操作名称',
						type: 'category',
						boundaryGap: 1,
						axisLabel: {
							//rotate: 15,
							interval: 0,
							textStyle: {
								fontSize: '8'
							},
							formatter:function(val){
								if(val.length > 10){
										return val.substring(0,10)+'...';
								}else{
									  return val
								}
							}	
						},
						data: []
					}],
					xAxis: [{
						name: "平均耗时\n（毫秒）",
						type: "value",
						axisLabel: {
							//rotate: 60,
							formatter: "{value}"
						}
					}],
					series: [{
						name: "",
						type: 'bar',
						barWidth: '20',
						itemStyle: {
							normal: {
								color: function (params) {
									var colorList = ['#b9e749','#f76a23'];
									if(params.data>=0 && params.data< 1500){
										return colorList[0];
									}else{
										return colorList[1];
									}
								},
							}
						},
						label: {
							normal: {
								show: true,
								position: 'right'
		                	}
		            	},
						data: []
					}]
				}	
				if(options.series) u.yAxis[0] = $.extend(u.yAxis[0], options.yAxis[0]);
				if(options.series) u.series[0] = $.extend(u.series[0], options.series[0]);
				e.setOption(u);
				$(window).resize(e.resize);
				return e;
			}
		}
	}
})