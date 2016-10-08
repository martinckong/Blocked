"use strict"

	var fun;
	var fun2;
	var lives = 3;
	var score = 0;
	var hiscore = 0;

	function track(event){
		var winx = $(window).width();
		var mousex = event.clientX - ((winx-500)/2) - 10;
		var mousey = event.clientY - 8 - 60;
		if(mousey>=480){
			mousey = 480;
		}else if(mousey<=0){
			mousey = 0;
		}
		if(mousex>=480){
			mousex = 480;
		}else if(mousex<=0){
			mousex = 0;
		}
		var b = $("#cursor")[0];
		b.style.top = mousey + "px";
		b.style.left = mousex + "px";
	}
	function stop(){
		clearInterval(fun);
		clearInterval(fun2);
		document.getElementById("page").setAttribute("onmousemove", "");
		var srt = $("#start");
		if(lives!=0){
			srt[0].setAttribute("onclick", "run2()");
			srt[0].innerHTML = "Resume";
		}else{
			srt.text("Start");
			srt[0].setAttribute("onclick", "reset()");
		}
	}
	function reset(){
		lives = 3;
		var objss = document.getElementsByClassName("obj");
		var ii;
		for(ii=0; ii<objss.length; ii++){
			objss[ii].parentNode.removeChild(objss[ii]);
			ii--;
		}
		clearInterval(fun);
		clearInterval(fun2);
		make();
		document.getElementById("cursor").style.top = "480px";
		document.getElementById("cursor").style.left  = "240px";
		score = 0;
		run2();
	}
	function make(){
		var d = document.createElement("DIV");
		d.setAttribute("class", "obj");
		if(document.getElementsByClassName("obj").length==0){
			d.setAttribute("yax", "0.5");
			d.setAttribute("xax", "0.5");
		}else{
			d.setAttribute("yax", (Math.random().toFixed(2)).toString());
			d.setAttribute("xax", (Math.random().toFixed(2)).toString());
		}
		d.style.backgroundColor = "green";
		d.style.height = "20px";
		d.style.width = "20px";
		d.style.position = "absolute";
		d.style.left = "240px";
		document.getElementById("back").appendChild(d);
	}
	function run2(){
		document.getElementById("start").setAttribute("onclick", "stop()");
		document.getElementById("start").innerHTML = "Pause";
		var y = 0;
		document.getElementById("page").setAttribute("onmousemove", "track(event)");
		fun = setInterval(run, 5);
		fun2 = setInterval(make, 1000);
		var hit = 0;

		function run(){
			var objs = document.getElementsByClassName("obj");
			var i;
			var rem;
			var redx;
			var redy;
			var objx;
			var objy;
			for(i=0; i<objs.length; i++){
				y = Number(objs[i].style.top.replace("px", ""));
				y += Number(objs[i].getAttribute("yax"));
				objs[i].style.top = y + "px";
				if(y>=480 || y<=0){
					objs[i].setAttribute("yax", (-1 * Number(objs[i].getAttribute("yax"))).toString());
				}
				y = Number(objs[i].style.left.replace("px", ""));
				y += ((Number(objs[i].getAttribute("xax"))*2)-1);
				objs[i].style.left = y + "px";
				if(y>=480 || y<=0){
					objs[i].setAttribute("xax", (1 - (Number(objs[i].getAttribute("xax"))) ).toString());
				}
				
				if(hit==0){
					redx = Number(document.getElementById("cursor").style.left.replace("px", ""));
					redy = Number(document.getElementById("cursor").style.top.replace("px", ""));
					objx = Number(objs[i].style.left.replace("px", ""));
					objy = Number(objs[i].style.top.replace("px", ""));
					if(objy>=redy && objy<=(redy+20) && objx>=redx && objx<=(redx+20)){
							lives--;
							hit = 1000;
					}else if((objy+20)>=redy && (objy+20)<=(redy+20) && objx>=redx && objx<=(redx+20)){
							lives--;
							hit = 1000;
					}else if(objy>=redy && objy<=(redy+20) && (objx+20)>=redx && (objx+20)<=(redx+20)){
							lives--;
							hit = 1000;
					}else if((objy+20)>=redy && (objy+20)<=(redy+20) && (objx+20)>=redx && (objx+20)<=(redx+20)){
							lives--;
							hit = 1000;
					}
				}else{
					hit--;
				}
				if(lives==0){
					stop();
					break;
				}
			}
			document.getElementById("lives").innerHTML = "Lives: " + lives.toString();
			score++;
			document.getElementById("score").innerHTML = "Score: " + score;
			if(hiscore<=score){
				document.getElementById("high").innerHTML = "High score: " + score;
				hiscore = score;
			}
			var b = $("#cursor")[0];
			if(lives==3){
				b.style.backgroundColor = "red";
			}else if(lives==2){
				b.style.backgroundColor = "magenta";
			}else if(lives==1){
				b.style.backgroundColor = "#b30000";
			}
		}
	}