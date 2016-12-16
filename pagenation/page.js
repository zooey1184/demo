$(function(){
	function page(i, s){
		var i = i||1;
		var s = s||1;
		var w = $('.pg_line').width();
		var step = Math.floor(w/s);
		var dl = $('.pg_line').offset().left
		var dp = $('.pg_point').offset().left;
		
		var min = 1;
		var max = s;
		//设置移动函数，获取数据
		function move(){
			$(window).mousemove(function(e){
				console.log("move")
				var px = e.clientX-dp;
				var txt;
				txt = px/
				if(px<0){
					px = 0;
					txt = 1;
				}else if(px>200){
					px = 200;
					txt = max;
				}
				console.log(px)
				$('.pg_point').css({
					left: px+"px"
				})
			})
		}
		$('.pg_point').mousedown(function(){
			console.log("down")
			move()
		})
		$(window).mouseup(function(){
			$(window).off('mousemove')
		})
		
	}
	
	
	
	page()
})
