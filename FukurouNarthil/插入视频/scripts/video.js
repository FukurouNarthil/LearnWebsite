window.onload = function(){
        // 获取要操作的元素
        var video = document.getElementById("demo");
        var videoControls = document.getElementById("videoControls");
        var videoContainer = document.getElementById("videoPlayer");
        var controls = document.getElementById("video_controls");
        var play_center = document.getElementById("play");
        var playBtn = document.getElementById("playBtn");
        var fullScreenBtn = document.getElementById("fullScreenBtn");
        var soundControlBtn = document.getElementById("soundControl");
        var progressWrap = document.getElementById("progressWrap");
        var playProgress = document.getElementById("playProgress");
        var fullScreenFlag = false;
        var progressFlag;

        // 创建操作对象，所有操作都在这个对象上。
        var videoPlayer = {
            init: function(){
                var that = this;
                video.removeAttribute("controls");
                bindEvent(video, "loadeddata", videoPlayer.initControls);
                videoPlayer.operateControls();
            },
            initControls: function(){
                videoPlayer.showHideControls();
            },
            showHideControls: function(){
                bindEvent(video, "mouseover", showControls);
                bindEvent(videoControls, "mouseover", showControls);
                bindEvent(video, "mouseout", hideControls);
                bindEvent(videoControls, "mouseout", hideControls);
            },
            operateControls: function(){
                bindEvent(playBtn, "click", play);
                bindEvent(video, "click", play);
                bindEvent(play_center, "click", play);
                bindEvent(play_center, "click", hideButton);
                bindEvent(fullScreenBtn, "click", fullScreen);
                bindEvent(soundControlBtn, "click", mute);
                bindEvent(audioWrap, "click", audioControl);
                bindEvent(progressWrap, "mousedown", videoSeek);
            }
        }

        videoPlayer.init();

        // 原生的JavaScript事件绑定函数
        function bindEvent(ele, eventName, func){
            if(window.addEventListener){
                ele.addEventListener(eventName, func);
            }
            else{
                ele.attachEvent('on' + eventName, func);
            }
        }
        // 显示video的控制面板
        function showControls(){
            videoControls.style.opacity = 1;
        }
        // 隐藏video的控制面板
        function hideControls(){
            videoControls.style.opacity = 0;
        }
        // 控制video的播放
        function play(){
            if ( video.paused || video.ended ){              
                if ( video.ended ){ 
                    video.currentTime = 0;
                    } 
                video.play();
                hideButton();
                //playBtn.innerHTML = "暂停"; 
                progressFlag = setInterval(getProgress, 60);
            } 
            else{ 
                video.pause(); 
                showButton();
                //playBtn.innerHTML = "播放";
                clearInterval(progressFlag);
            } 
        }
        // 控制视频音量
        function mute() {
        	var vol = video.volume;
        	if(vol) {
        		video.volume = 0;
        	}
        	else {
        		video.volume = 1;
        	}
        }
        // 控制video是否全屏，尚未实现
        function fullScreen(){
            var docElm = document.documentElement;
  			if (docElm.requestFullscreen) {
    			docElm.requestFullscreen();
  			} else if (docElm.mozRequestFullScreen) {
    			docElm.mozRequestFullScreen();
  			} else if (docElm.webkitRequestFullScreen) {
    			docElm.webkitRequestFullScreen();
  			} else if (docElm.msRequestFullscreen) {
    			docElm.msRequestFullscreen();
  			}
        }
        function exitFullscreen() {
  			if (document.exitFullscreen) {
    			document.exitFullscreen();
  			} else if (document.mozCancelFullScreen) {
    			document.mozCancelFullScreen();
  			} else if (document.webkitCancelFullScreen) {
    			document.webkitCancelFullScreen();
  			} else if (document.msExitFullscreen) {
    			document.msExitFullscreen();
  			}
		}
        // video的播放条
        function getProgress(){
            var percent = video.currentTime / video.duration;
            var totalTime = transformTime(video.duration);
            var currentTime = transformTime(video.currentTime);
            playProgress.style.width = percent * (progressWrap.offsetWidth) - 2 + "px";
            showProgress.innerHTML = currentTime + '/' + totalTime;
        }
        // 鼠标在播放条上点击时进行捕获并进行处理
        function videoSeek(e){
            if(video.paused || video.ended){
                play();
                enhanceVideoSeek(e);
            }
            else{
                enhanceVideoSeek(e);
            }
        }
        // 调整视频进度条
        function enhanceVideoSeek(e){
            clearInterval(progressFlag);
            var length = e.pageX - progressWrap.offsetLeft - demo.offsetLeft - 100;
            var percent = length / progressWrap.offsetWidth;
            playProgress.style.width = percent * (progressWrap.offsetWidth) + "px";
            video.currentTime = percent * video.duration;
            progressFlag = setInterval(getProgress, 60);
        }
        // 调整音量条
        function audioControl(e) {
        	var length = e.pageX - audioWrap.offsetLeft - demo.offsetLeft - 100;
        	var percent = length / audioWrap.offsetWidth;
            soundWrap.style.width = percent * (audioWrap.offsetWidth) + "px";
            video.volume = percent * 1.0;
        }
        // 把秒数转成分:秒的形式
        function transformTime(num) {
        	var totalSecond = (parseInt(num) % 60).toString();
            if(totalSecond.length < 2) {
            	totalSecond = '0' + totalSecond;
            }
            var totalMinute = (parseInt(num / 60)).toString();
            if(totalMinute.length < 2) {
            	totalMinute = '0' + totalMinute;
            }
            var totalTime = totalMinute + ":" + totalSecond;
            return totalTime;
        }
        // 隐藏中央播放键
        function hideButton(){
			var btn = document.getElementById("play");
			btn.style.display = "none";
		}
		// 显示中央播放键
		function showButton(){
			var btn = document.getElementById("play");
			btn.style.display = "block";	
		}
    //} (this, document)
}