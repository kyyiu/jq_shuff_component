function shuff(pics,width,height){
	width = width || 600
	height = height || 400
	
	// 指示器
	let t = 0
	$('#shuffling').append('<ul id="imgList"></ul>').append('<ul id="imgListNode"></ul>')
	
	for(let i = 0 ;i<pics.length;i++){
		$('#imgList').append('<li><img/></li>')
		// 设置每个点的index，data-index
		$('#imgListNode').append('<li data-index='+i+'></li>')
		$('#imgList img:eq('+ i +')').attr('src',pics[i])
	}
	
	// 设置css
	
	$('#shuffling').css({
		'width': width+'px',
		'height': height+'px',
	})
	
	// 因为设置了li设置了display:none，所以先显示第一张图片
	$('#shuffling #imgList li').eq(0).show()
	$('#shuffling #imgListNode li').eq(0).addClass('current')
	
	// 设置定时器
	let timer = null
	timer = setInterval(autoPlay,3000)
	function autoPlay(){
		t+=1 // 指示器放第一行，不然第一张图片会在第二次执行定时器时更换
		t = t>=pics.length? 0: t // 边界判断，如果大于等于最后一张图的索引，则回到第0即第一张
		shuffAnima(t)
	}
	
	// 点击轮播点 切换 图片
	$('#shuffling #imgListNode li').click(function(){
		let index = Number($(this)[0].dataset.index)
		shuffAnima(index)
		t = index
	})
	
	// 淡入淡出及索引点的动画
	function shuffAnima(index){
		$('#shuffling #imgListNode li').eq(index).addClass('current')
		$('#shuffling #imgListNode li').eq(index).siblings().removeClass('current')
		$('#shuffling #imgList li').eq(index).fadeIn(500)
		$('#shuffling #imgList li').eq(index).siblings().fadeOut(500)
	}
	
	$('#shuffling').hover(function(){ // 移进图片区，停止轮播
		clearInterval(timer)
	}, function(){ // 移出图片区继续轮播
		timer = setInterval(autoPlay,3000)
	})
	
	// 监听浏览器是否是当前页面，如果在继续轮播，不在则清除timer
	document.addEventListener('visibilitychange',function(){
		if(this.hidden){
			clearInterval(timer)
		}else{
			timer = setInterval(autoPlay,3000)
		}
	})
}