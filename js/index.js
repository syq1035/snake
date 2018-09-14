$(function(){
    let WIDTH = 560;
    let HEIGHT = 560;
    let SNAKEWIDTH = 5;
    let FOODWIDTH = 5;
    let FOODNUM = 5;
    
    let food_arr = [];  //食物位置坐标数组
    let snakeBody_arr = []; //蛇身位置数组
    let currentDirection = 38;

    let canvas = document.getElementById("canvas"); //获取canvas元素
    let context = canvas.getContext("2d"); //获取上下文的环境

    init();
    //初始化
    function init(){
        createGrid();
        initSnake();
        createFood();
        controlDir();
    }
    //点击开始按钮蛇就移动起来
    $("#begin").click(function(){
        let t = window.setInterval(function(){
            context.fillStyle = "#FF0000";
            let lastPoint = snakeBody_arr[snakeBody_arr.length-1];
            let firstPoint = snakeBody_arr[0];
            // keycode   37 = Left ,38 = Up , 39 = Right,  40 = Down
            switch(currentDirection){
                case 37 :
                    if(!includesPoint(firstPoint.x-FOODWIDTH ,firstPoint.y)){
                        snakeBody_arr.pop();
                        context.clearRect(lastPoint.x ,lastPoint.y , FOODWIDTH, FOODWIDTH);
                    }else{
                        food_arr.splice(indexofFoodArr(firstPoint.x-FOODWIDTH ,firstPoint.y),1);
                    }
                    snakeBody_arr.unshift(position(firstPoint.x-FOODWIDTH ,firstPoint.y))
                    context.fillRect(snakeBody_arr[0].x,snakeBody_arr[0].y ,FOODWIDTH,FOODWIDTH);
                    break;
                case 38 :
                    if(!includesPoint(firstPoint.x ,firstPoint.y-FOODWIDTH)){
                        snakeBody_arr.pop();
                        context.clearRect(lastPoint.x ,lastPoint.y , FOODWIDTH, FOODWIDTH);
                    }else{
                        food_arr.splice(indexofFoodArr(firstPoint.x ,firstPoint.y-FOODWIDTH),1);
                    }
                    snakeBody_arr.unshift(position(firstPoint.x ,firstPoint.y-FOODWIDTH))
                    context.fillRect(snakeBody_arr[0].x,snakeBody_arr[0].y ,FOODWIDTH,FOODWIDTH);
                    break;
                case 39 :
                    if(!includesPoint(firstPoint.x+FOODWIDTH ,firstPoint.y)){
                        snakeBody_arr.pop();
                        context.clearRect(lastPoint.x ,lastPoint.y , FOODWIDTH, FOODWIDTH);
                    }else{
                        food_arr.splice(indexofFoodArr(firstPoint.x+FOODWIDTH ,firstPoint.y),1);
                    }
                    snakeBody_arr.unshift(position(firstPoint.x+FOODWIDTH ,firstPoint.y))
                    context.fillRect(snakeBody_arr[0].x,snakeBody_arr[0].y ,FOODWIDTH,FOODWIDTH);
                    break;
                case 40 :
                    if(!includesPoint(firstPoint.x ,firstPoint.y+FOODWIDTH)){
                        snakeBody_arr.pop();
                        context.clearRect(lastPoint.x ,lastPoint.y , FOODWIDTH, FOODWIDTH);
                    }else{
                        food_arr.splice(indexofFoodArr(firstPoint.x ,firstPoint.y+FOODWIDTH),1);
                    }
                    snakeBody_arr.unshift(position(firstPoint.x ,firstPoint.y+FOODWIDTH))
                    context.fillRect(snakeBody_arr[0].x,snakeBody_arr[0].y ,FOODWIDTH,FOODWIDTH);
                    break;
            }
            if(food_arr.length < FOODNUM){
                let x = parseInt(Math.random()*(WIDTH/FOODWIDTH))*FOODWIDTH;
                let y = parseInt(Math.random()*(WIDTH/FOODWIDTH))*FOODWIDTH;
                context.fillStyle="green";
                context.fillRect(x,y,FOODWIDTH,FOODWIDTH);
                let pos = position(x,y)
                food_arr.push(pos);
            }
            if(gameOver()){
                window.clearInterval(t);
                alert("gameOver");
            }    
        },200);
        //重新开始 初始化数据
        if(snakeBody_arr.length>3){
            window.clearInterval(t);
            food_arr.splice(0) ;  
            snakeBody_arr.splice(0) ; 
            currentDirection = 38;
            init();
        }

    })
        //创建画布
    function createGrid(){
        //设置宽高
        canvas.width = WIDTH ;
        canvas.height = HEIGHT ;
        context.strokeStyle = 'black';
        //绘制矩形边框
        context.strokeRect(0,0,WIDTH,HEIGHT); //(x,y,w,h)     
    }
    //初始化蛇身
    function initSnake(){
        context.fillStyle = "#FF0000";
        snakeBody_arr = [position(WIDTH/2,HEIGHT/2) ,position(WIDTH/2,HEIGHT/2+5) ,position(WIDTH/2,HEIGHT/2+10)];
        for(let point of snakeBody_arr){
            context.fillRect(point.x,point.y,SNAKEWIDTH,SNAKEWIDTH);
        }
    }
    //随机生成食物
    function createFood(){
        
        while(food_arr.length < FOODNUM){
            let x = parseInt(Math.random()*(WIDTH/FOODWIDTH))*FOODWIDTH;
            let y = parseInt(Math.random()*(WIDTH/FOODWIDTH))*FOODWIDTH;
            context.fillStyle="green";
            context.fillRect(x,y,FOODWIDTH,FOODWIDTH);
            let pos = position(x,y)
            food_arr.push(pos);
        }
        //console.log(food_arr);
    }
    //坐标
    function position(x,y){
        return { x:x ,y:y }
    }
    function includesPoint(x,y){
        for(let point of food_arr){
            if((point.x==x) && (point.y==y)){
                return true;
            }
        }
        return false;
    }
    function indexofFoodArr(x,y){
        for(let point of food_arr){
            if((point.x==x) && (point.y==y)){
                return food_arr.indexOf(point);
            }
        }
        //return -1;
    }
    //方向控制，不能向与当前方向相反的方向改变
    function controlDir(){
        let canChangeDir = true;
        // keycode   37 = Left ,38 = Up , 39 = Right,  40 = Down
        $(document).keydown(function(e){ 
            switch (currentDirection) {
                case 38 :
                    if(e.keyCode == 40){
                        canChangeDir = false;
                    }
                    break;
                case 40 :
                    if(e.keyCode == 38){
                        canChangeDir = false;
                    }
                    break;
                case 37 :
                    if(e.keyCode == 39){
                        canChangeDir = false;
                    }
                    break;
                case 39 :
                    if(e.keyCode == 37){
                        canChangeDir = false;
                    }
                    break; 
            }
            if(canChangeDir){
                currentDirection = e.keyCode;
            }
        }); 
    
    }
    //结束判断
    function gameOver(){
        //边框碰撞
        if((snakeBody_arr[0].x==0)||(snakeBody_arr[0].y==0)||(snakeBody_arr[0].x==WIDTH-5)||(snakeBody_arr[0].y==HEIGHT-5)){
            return true;
        }
        //触碰身体
        for(let i=1;i<snakeBody_arr.length;i++){
            if((snakeBody_arr[0].x == snakeBody_arr[i].x)&&(snakeBody_arr[0].y == snakeBody_arr[i].y)){
                return true;
            }
        }
        return false;
    }

})