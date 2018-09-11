$(function(){
    let WIDTH = 560;
    let HEIGHT = 560;
    let SNAKEWIDTH = 5;
    let FOODWIDTH = 5;
    let FOODNUM = 5;
    
    let food_arr = [];  //食物位置数组
    //jQuery获取canvas元素
    //let context = $("#canvas")[0].getContext("2d");
    let canvas = document.getElementById("canvas"); //获取canvas元素
    let context = canvas.getContext("2d"); //获取上下文的环境
    init();
    //初始化
    function init(){
        createGrid();
        initSnake();
        createFood();
    }
    //创建画布
    function createGrid(){
        //设置宽高
        canvas.width = WIDTH ;
        canvas.height = HEIGHT ;
        context.strokeStyle = 'black';
        //绘制矩形边框
        context.strokeRect(0,0,WIDTH,HEIGHT); //(x,y,w,h)     
    }
    $("#begin").click(function(){
        //initSnake();
        context.clearRect(WIDTH/2,HEIGHT/2, SNAKEWIDTH, 10);

    })
    //初始化蛇身
    function initSnake(){
        context.fillStyle="#FF0000";
        context.fillRect(WIDTH/2,HEIGHT/2,SNAKEWIDTH,15);
    }
    //随机生成食物
    function createFood(){
        
        while((FOODNUM--)>0){
            let x = parseInt(Math.random()*(WIDTH-FOODWIDTH));
            let y = parseInt(Math.random()*(WIDTH-FOODWIDTH));
            context.fillStyle="green";
            context.fillRect(x,y,FOODWIDTH,FOODWIDTH);
            let pos = position(x,y)
            food_arr.push(pos);
        }
        console.log(food_arr);
  
    }

    function position(x,y){
        return { x:x ,y:y }
    }
})