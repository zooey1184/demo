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
			var m = $date.getMonth();//获取月份
			m = m+k
			mon = m%12
			console.log(mon)
			var y = $date.getFullYear();//获取年份
			addYear = Math.floor(m/12)
			y = y+addYear
			console.log(y)
			var d = $date.getDate();//获取日期
			var w = $date.getDay();//获取星期
			var r = y%4;//是否闰年
			var maxday = [31, (r==0)?29:28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];//设置最大天数
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
		//当天样式
		$('.day').find('li').eq(x).addClass('today')
		//当天之前的样式
		$('.day').find('li').eq(x).prevAll().css({
			background: "#F6F6F6",
			color: "gray"
		});
		//当天之前的样式覆盖空内容的<li>
		$('.day').find('li').eq(wdII).prevAll().css({
			background: "transparent"
		});
		//点击获取日期
		var yt = parseInt($('.today').attr('data-y'));//当日的储存值-年
		var mt = parseInt($('.today').attr('data-m'));//当日的储存值-月
		var dt = parseInt($('.today').attr('data-d'));//当日的储存值-日
		//起始时间触发条件
		var moveIn = false;
		var moveOut = false;
		//开始函数
		$('#moveIn').click(function(){
			$('.date').fadeIn()
			return moveIn = true
		})
		//结束函数
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
			var dd = parseInt($(this).attr('data-d'))
			var mm = parseInt($(this).attr('data-m'))
			var yy = parseInt($(this).attr('data-y'))
			//入住时间的存储日子
			var sd = parseInt($('.start').attr('data-d'))
			var sm = parseInt($('.start').attr('data-m'))
			var sy = parseInt($('.start').attr('data-y'))
			//离开时间的存储日期
			var ed = parseInt($('.end').attr('data-d'))
			var em = parseInt($('.end').attr('data-m'))
			var ey = parseInt($('.end').attr('data-y'))
			
			var len_s = $('.start').length
			var len_e = $('.end').length
			var datetime = yy+"-"+(mm+1)+"-"+dd;//返回在输入款的值
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
					if( ((yy>yt)||((yy==yt)&&(mm>mt))||(dd>=dt)) && ((yy<ey)||((yy==ey)&&(mm<em))||((yy==ey)&&(mm==em)&&(dd<ed))) ){
						$(this).addClass('start').siblings().removeClass('start')
						$(this).parent().siblings('ul').children().removeClass('start')
						$('.date').fadeOut()
						$('#moveIn').val(datetime)
						//充当回调函数
						setTimeout(function(){
							range()
						},0)
					}else{
						return;
					}
				}
				moveIn = false
			}
			//触发离开条件
			if(moveOut){
				if(len_s!=0){
					if(yy>sy ||((yy==sy)&&(mm>sm))||((yy==sy)&&(mm==sm)&&(dd>sd))){
						$(this).addClass('end').siblings().removeClass('end')
						$(this).parent().siblings('ul').children().removeClass('end')
						$('.date').fadeOut()
						$('#moveOut').val(datetime)
						//充当回调函数
						setTimeout(function(){
							range()
						},0)
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
			
			//点击位置的存储日期
			dd = parseInt($(this).attr('data-d'))
			mm = parseInt($(this).attr('data-m'))
			yy = parseInt($(this).attr('data-y'))
			//入住时间的存储日子
			sd = parseInt($('.start').attr('data-d'))
			sm = parseInt($('.start').attr('data-m'))
			sy = parseInt($('.start').attr('data-y'))
			//离开时间的存储日期
			ed = parseInt($('.end').attr('data-d'))
			em = parseInt($('.end').attr('data-m'))
			ey = parseInt($('.end').attr('data-y'))
			//返回两个日期的差值
			function range(){
				var dateI = new Date(ey, em, ed)
				var dateII = new Date(sy, sm, sd)
				var dayI = dateI.getTime()
				var dayII = dateII.getTime()
				var ran = parseInt(dayI-dayII)
				//利用时间戳的差值计算
				var day_ran = ran/(1000*60*60*24)
				console.log("您总共预定了"+day_ran+"个晚上")
			}
			console.log(yy+"--"+mm+"--"+dd)
		})
	}
	
	
	
	//调用方法
	date(3)
})
