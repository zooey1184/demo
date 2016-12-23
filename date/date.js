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
		var moveIn = false;
		var moveOut = false;
		$('#moveIn').click(function(){
			$('.date').fadeIn()
			return moveIn = true
		})
		$('#moveOut').click(function(){
			$('.date').fadeIn()
			return moveOut = true
		})
		//点击日期获取时间
		$('.day').on("click", "li", function(){
			if($(this).html()==""){
				return
			}
			//点击位置的存储日期
			var dd = $(this).attr('data-d')
			var mm = $(this).attr('data-m')
			var yy = $(this).attr('data-y')
			//入住时间的存储日子
			var sd = $('.start').attr('data-d')
			var sm = $('.start').attr('data-m')
			var sy = $('.start').attr('data-y')
			//离开时间的存储日期
			var ed = $('.end').attr('data-d')
			var em = $('.end').attr('data-m')
			var ey = $('.end').attr('data-y')
			
			var len_s = $('.start').length
			var len_e = $('.end').length
			var months = parseInt(mm)
			var datetime = yy+"-"+(months+1)+"-"+dd
			//触发了入住条件
			if(moveIn){
				if(len_e==0){
					if(yy>yt ||mm>mt ||dd>=dt){
						$(this).addClass('start').siblings().removeClass('start')
						$(this).parent().siblings('ul').children().removeClass('start')
						$('.date').fadeOut()
						$('#moveIn').val(datetime)
					}else{
						return false;
					}
				}else {
					if((yy>yt ||mm>mt ||dd>=dt)&&(yy<=ey && mm<=em && dd<ed)){
						$(this).addClass('start').siblings().removeClass('start')
						$(this).parent().siblings('ul').children().removeClass('start')
						$('.date').fadeOut()
						$('#moveIn').val(datetime)
					}else{
						return false;
					}
				}
				moveIn = false
			}
			//触发离开条件
			if(moveOut){
				if(len_s!=0){
					if(yy>sy ||mm>sm ||dd>sd){
						$(this).addClass('end').siblings().removeClass('end')
						$(this).parent().siblings('ul').children().removeClass('end')
						$('.date').fadeOut()
						$('#moveOut').val(datetime)
					}else {
						return false;
					}
				}else{
					if(yy>yt ||mm>mt ||dd>dt){
						$(this).addClass('end').siblings().removeClass('end')
						$(this).parent().siblings('ul').children().removeClass('end')
						$('.date').fadeOut()
						$('#moveOut').val(datetime)
					}else{
						return false;
					}
				}
				moveOut = false;
			}
			console.log(yy+"--"+mm+"--"+dd)
		})
	}
	date(3)
})
