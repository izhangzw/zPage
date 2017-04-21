
require.config({
	baseUrl: 'js',
	paths: {
		util: 'moudles/util',
		zPage: 'moudles/zPage',
		People: 'moudles/People',
		jquery: ['libs/jquery/jquery.min'],
		moment: ['libs/moment/moment.min'],
		'jquery.tmpl': ['libs/tmpl/jquery.tmpl.min'],
		'jquery.orgchart': ['libs/orgchart/jquery.jOrgChart'],
		'jquery.dprange': ['libs/dprange/datepicker'],
		'jquery.echarts': ['libs/echarts/echarts.min']
	},
	map: {
        'jquery.dprange': {
            'css': 'libs/amd/css.min'
        }
    },
	shim: {
		'jquery.tmpl': ['jquery'],
		'jquery.orgchart': ['jquery'],
		'jquery.dprange': ['jquery', 'css!../js/libs/dprange/css/datepicker.css'],
		'jquery.echarts': ['jquery'],
		People: {
			init: function(){
				return {
					Loginer: Loginer,
					Person: Person
				}
			}
		}
	}
})

