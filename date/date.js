$(function(){
	function date(s){
		var s = s||3;
		//设置固定位置的星期栏
		$('.week').append("<ul></ul>")
		
		$('.week').find("ul").append("<li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li>")
		function month(k){
			$('.day').append('<ul></ul>')
			$('.day').append('<ul></ul>').last().append("<hr />")
			
			var $date = new Date()
			//月
			var m = $date.getMonth()
				m = m+k
				mon = m%12
				console.log(mon)
			//年
			var y = $date.getFullYear()
				addYear = Math.floor(m/12)
				y = y+addYear
				console.log(y)
			//日
			var d = $date.getDate()
			//星期
			var w = $date.getDay()
			//是否闰年
			var r = y%4
			//设置最大天数
			var maxday = [31, (r==0)?29:28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
			var len = maxday[mon]
			var arr_month = [];
			arr_month.length = len
			//形成日历天数
			$.each(arr_month, function(index, value) {
				var day = index+1
				//在元素内存数据
				$('.day').find('ul').last().append("<li data-y="+y+" data-m="+mon+" data-d="+day+">"+day+"</li>")
			});
			//设置每个月第一天的位置
			var $dateII = new Date(y, mon, 1)
			var wII = $dateII.getDay()
			var arr_monthII = []
			arr_monthII.length = wII
			$.each(arr_monthII, function(i,v) {
				$('.day').find('ul').last().find('li').first().before("<li></li>")
			});
			//添加月份
			$('.day').find("ul").last().before("<div class='month'>"+(mon+1)+"月</div>")
		}
		var arr = [];
		arr.length = s;
		$.each(arr, function(i,v) {
			month(i)
		});
		//设置当天日期的样式
		var weekday = new Date()
		var wyI = weekday.getFullYear()
		var wmI = weekday.getMonth()
		var wdI = weekday.getDate();//当天日期
		var weekdayII = new Date(wyI, wmI, 1)
		var wdII = weekdayII.getDay();//当月1号
		var x = wdI+wdII-1
		$('.day').find('li').eq(x).addClass('today')//当天样式
		
		$('.day').find('li').eq(x).prevAll().css({
			background: "#F6F6F6",
			color: "gray"
		});//当天之前的样式
		$('.day').find('li').eq(wdII).prevAll().css({
			background: "transparent"
		});//当天之前的样式覆盖空内容的<li>
		//点击获取日期
		var yt = $('.today').attr('data-y');//当日的储存值-年
		var mt = $('.today').attr('data-m');//当日的储存值-月
		var dt = $('.today').attr('data-d');//当日的储存值-日
		$('.day').on("click", "li", function(){
			if($(this).html()==""){
				return
			}
			var dd = $(this).attr('data-d')
			var mm = $(this).attr('data-m')
			var yy = $(this).attr('data-y')
			var len_s = $('.start').length
			console.log(index)
			if(yy>yt ||mm>mt ||dd>=dt){
				$(this).addClass('start').siblings().removeClass('start')
			}
			var ds = $('.start').attr('data-d')
			var ms = $('.start').attr('data-m')
			var ys = $('.start').attr('data-y')
			console.log(yy+"--"+mm+"--"+dd)
		})
	}
	date(3)
})
