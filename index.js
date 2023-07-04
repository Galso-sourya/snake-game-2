//first we are targeting canvas which is created in html fileCreatedDate
const canvas=document.getElementById('canvas');
//now we are defining context
const ctx=canvas.getContext('2d');
//console.log(ctx);
class SnakeGame{
	constructor(ctx,width,height,noOfColumns,noOfRows){
		this.ctx=ctx;
		this.ctx.canvas.width=width;
		this.ctx.canvas.height=height;
		this.noOfColumns=noOfColumns;
		this.noOfRows=noOfRows;
		this.columnSize=width/noOfColumns;
		this.rowSize=height/noOfRows;
		this.direction="left";
		this.foodAvailable=undefined;
		this.snakeCoordinates=[{x:1,y:3},{x:1,y:4},{x:1,y:5},{x:1,y:6}];
	}
	drawBackground(color="yellow"){
		this.ctx.fillStyle=color;
		//below line will start coloring from 0 coordinate to last part. 
		this.ctx.fillRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
	}
	drawBlock(x,y,color="red"){
	this.ctx.fillStyle=color;
	//below line contains 4 parameters. one is starting point of width and 3rd one is ending point of the width. the 2nd one is starting point of height and 4th one is 
	//ending point of the height to fill. the small blocks.
	this.ctx.fillRect(x*this.columnSize,y*this.rowSize,x+1*this.columnSize,y+1*this.rowSize);
	//console.log(x*this.columnSize,y*this.rowSize,x+1*this.columnSize,y+1*this.rowSize);
	}
	drawSnake(){
		for(const coordinate of this.snakeCoordinates){
		this.drawBlock(coordinate.x,coordinate.y);//we are iterating through the positions of the snake coordinates like 1,3 ....1,4......	
		}
	}
	moveSnake(){
		const head=Object.assign({},this.snakeCoordinates[this.snakeCoordinates.length-1]);
		//console.log(this.direction);
		//console.log(this.foodAvailable);
		//console.log(this.foodAvailable,head.x);
		//console.log(head);
		//if(this.foodAvailable && this.foodAvailable.x===head.x && head.y=this.foodAvailable.y){
		//this.foodAvailable=undefined;	//once food is consumed, it become undefined
		//}else{
		//this.snakeCoordinates.shift();	
		//}
		this.snakeCoordinates.shift(); //do not include this line in final project here. it will be on upper else statement only. not here
		if(this.direction==="bottom"){
			head.y+=1;
			head.y %=this.noOfRows;
		}
		//console.log(this.direction)
		if(this.direction==="right"){
			head.x+=1;
			head.x %=this.noOfColumns;
		}
		if(this.direction==="top"){
			head.y -=1;
			if(head.y===-1){
			head.y=this.noOfRows-1;	
			}
		}
		if(this.direction==="left"){
		head.x -=1;	
		if(head.x===-1){
		head.x=this.noOfColumns-1;	
		}
		}
		this.snakeCoordinates.push(head);
	}
	//to generate food, we have to forst generate random coordinates
	getRandomCoordinates(min,max){//it will generate random numbers in between max and min points
		return Math.floor(Math.random()*(max-min+1))+min;
	}
	generateFood(){
	this.foodAvailable={
		//the next 2 lines are commented as it will not work in browser.
	//	x:this.getRandomCoordinates(0,this.noOfRows-1);
	//	y:this.getRandomCoordinates(0,this.noOfColumns-1);
	}	
	}
	start(){
		const interval=setInterval(()=>{
		this.drawBackground();
		this.drawSnake();
		this.moveSnake();
		if(!this.foodAvailable){
			//console.log("generated",this.foodAvailable);//to test the function through console
			this.generateFood();
		}
		this.drawBlock(this.foodAvailable.x,this.foodAvailable.y,"green")
		},500);
	}
}
const snakeGame=new SnakeGame(ctx,600,600,20,20);

//snakeGame.drawBlock(0,0);
//snakeGame.drawBlock(19,19);
//snakeGame.drawBlock(1,2);
//snakeGame.drawBlock(1,3);
//snakeGame.drawBlock(1,4);


snakeGame.start();
//keydown is ised when we click any key or press
window.addEventListener('keydown',(e)=>{
	//39 is for right click
	if(e.keyCode===39){
		snakeGame.direction="right";//direction will be changed if we press the key
	}
	if(e.keyCode===40){
		snakeGame.direction="bottom";//direction will be changed if we press the key
		console.log("moving");//only shown in console if the bottom button is clicked. this is how to check.
	}
	if(e.keyCode===38){
		snakeGame.direction="top";//direction will be changed if we press the key
	}
	if(e.keyCode===37){
		snakeGame.direction="left";//direction will be changed if we press the key
	}
})
