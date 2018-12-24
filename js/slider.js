$(function () {
	var count = 0;//计数	
	var index = null;
	var $j_home = $('.home-hero-slider'); 
	// console.log($j_homeUl);
	var $j_homeBanner = $('.home-hero-banner li');//轮播图切换的li
	var $j_arrowLeft = $('#j-arrow-left'); //左箭头
	var $j_arrowRight = $('#j-arrow-right');//右箭头
	var $j_sliderTrundle = $('.slider-trundle');//小圆圈按钮的父盒子				
	$j_homeBanner.eq(0).css('zIndex', 50);//默认第一张图片在最上面	
	// 遍历li生成滑动小圆圈按钮	
	$j_homeBanner.each(function () {
		//根据父盒子创建滑动小圆圈按钮
		$j_sliderTrundle.append("<li><a></a></li>");
		//获取小圆圈按钮中每个元素
		var $j_sliderLi = $('.slider-trundle li');
		//默认第一个滑动小圆圈按钮亮起
		$j_sliderTrundle.children().eq(0).css('backgroundColor', '#000')
			.children().css('backgroundColor', '#ccc');
		//遍历滑动小圆圈按钮
		$j_sliderLi.each(function () {
			var index = $(this).index();
			//鼠标移入事件
			$j_sliderLi.eq(index).mouseover(function () {
				//鼠标移入小圆圈按钮本身颜色				
				$(this).css('backgroundColor', '#000');
				$(this).children().css('backgroundColor', '#ccc');
			})
			//鼠标点击事件
			$j_sliderLi.eq(index).click(function () {
				$j_homeBanner.eq(index).stop().fadeIn(1000)
					.siblings().stop().fadeOut(1000);
				$(this).css('backgroundColor', '#000')
					.children().css('backgroundColor', '#ccc');
				$(this).siblings().css('backgroundColor', '#ccc')
					.children().css('backgroundColor', '#000');
				//记录点击按钮的索引值
				count = $(this).index();
			})
			//鼠标移出事件
			$j_sliderLi.mouseout(function () {
				//点击后小圆圈按钮的状态后,用点击后有状态的按钮去排除其他小圆圈按钮的状态
				$j_sliderLi.eq(count).css('backgroundColor', '#000')
					.children().css('backgroundColor', '#ccc');
				$j_sliderLi.eq(count).siblings().css('backgroundColor', '#ccc');
				$j_sliderLi.eq(count).siblings().children().css('backgroundColor', '#000');
			})
		})
	});
	
	// 鼠标移入ul
	// 自动轮播
	var timer = null;
	timer = setInterval(arrowRight, 1000)
	$j_home.mouseout(function () {
		timer = setInterval(arrowRight, 1000)
	});
	$j_home.mouseover(function () {
		clearInterval(timer);
	});
	//轮播图右箭头函数
	$j_arrowRight.click(function () {
		arrowRight();
	});
	//轮播图左箭头函数
	$j_arrowLeft.click(function () {
		clearInterval(timer);
		if (count === 0) {
			count = $j_homeBanner.length;
		}
		count--;
		$j_homeBanner.eq(count).stop().fadeIn(1000)
			.siblings().stop().fadeOut(1000);
		$j_sliderTrundle.children().eq(count).css('backgroundColor', '#000')
			.siblings().css('backgroundColor', '#ccc');
		$j_sliderTrundle.children().eq(count).children().css('backgroundColor', '#ccc')
			.parent().siblings().children().css('backgroundColor', '#000');
	})
	$j_arrowRight.mousedown(function () {
		return false;
	});
	$j_arrowLeft.mousedown(function () {
		return false;
	});	
	// 右箭头的封装
	function arrowRight() {
		if (count === $j_homeBanner.length - 1) {
			count = -1;
		}
		count++;
		$j_homeBanner.eq(count).stop().fadeIn(1000)
			.siblings().stop().fadeOut(1000);
		$j_sliderTrundle.children().eq(count).css('backgroundColor', '#000')
			.siblings().css('backgroundColor', '#ccc');
		$j_sliderTrundle.children().eq(count).children().css('backgroundColor', '#ccc')
			.parent().siblings().children().css('backgroundColor', '#000');
	}
})
