import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'minesweeper';
  rows: number[][]=[];
  isSeen:number[][]=[];
  win:number=-1;
  Time! : number;
  openBox!:number;
  traversalArray:number[][]=[[1,0],[1,-1],[1,1],[0,1],[0,-1],[-1,0],[-1,-1],[-1,1]];
  values!: string;
  size:number=10;
  bomb:number=10;
  totalMoves:number=0
  
  newSize: number=10;
  newBomb:number=10;
  restartGame() {
    if (this.newSize && this.newSize > 0&&this.newBomb&&this.newBomb>0) {
      this.size = this.newSize;
      this.bomb=this.newBomb;
      if(this.bomb<=this.size*this.size)this.startGame();
      else{
        alert("Bombs cant be more the the total cells of the table");
      }
    }
    else{
      alert("Please Provide the correct details");
    }
  }
  startAgainGame() {
    this.startGame();
  }
  constructor(private formBuilder: FormBuilder) {
  this.startGame();
  }

  ngOnInit() {
  }
  startTime(){
    const countdownInterval = setInterval(() => {
      this.Time++;
      if(this.win!=-1)
      clearInterval(countdownInterval);
    }, 1000);
  }
  startGame()
  {
    this.openBox=0
    this.Time=0;
    this.totalMoves=0;
    this.startTime();
    let n = this.size; 
    console.log(this.bomb);
    this.win=-1;
    this.isSeen = Array(n).fill([]).map(() => Array(n).fill(1));
    this.rows = Array(n).fill([]).map((_, i) => Array(n).fill(i));
    

    let count;
    count =0;
    while(count<this.bomb)
    {
      let i=Math.floor(Math.random()*n);
      let j=Math.floor(Math.random()*n);
      if(this.rows[i][j]!=-1)
      {
        this.rows[i][j]=-1;
        count++;
      }

    }
  }


checkMine(i : number , j: number)
{
  this.totalMoves++;
  if(this.win!=-1||this.isSeen[i][j]==0)return
  this.isSeen[i][j]=0;
  this.openBox++;
  const n=this.rows.length;
  if(this.rows[i][j]==-1){this.win=0;alert("Hello! you have died!!");throw("you have died");}
  let mine=0;
  for(let a=0;a<8;a++)
    {
      let x=i+this.traversalArray[a][0];
      let y=j+this.traversalArray[a][1];
      if(x>=0&&x<n&&y>=0&&y<n&&this.rows[x][y]==-1){
      mine++;}
    }
  this.rows[i][j]=mine;

  let queue:[number,number][]=[];
  if(mine==0) {queue.push([i,j]);}    
  
  while(queue.length!=0){
    let [ii,jj]=queue.shift()!;
    mine=0;
    for(let a=0;a<8;a++)
    {
      let x=ii+this.traversalArray[a][0];
      let y=jj+this.traversalArray[a][1];
      if(x>=0&&x<n&&y>=0&&y<n&&this.rows[x][y]==-1){
      mine++;}
    }
    if(mine==0)
    {
      this.rows[ii][jj]=0;
      for(let a=0;a<8;a++){
        let x=ii+this.traversalArray[a][0];
        let y=jj+this.traversalArray[a][1];
        if(x>=0&&x<n&&y>=0&&y<n&&this.isSeen[x][y]==1)queue.push([x,y]);
      }
    }
    if(this.isSeen[ii][jj]!=0){
      this.isSeen[ii][jj]=0;
      this.openBox++;
      this.rows[ii][jj]=mine;
    }
    
  }
  if(this.openBox==(this.size*this.size) -this.bomb){
    this.gameWin();
  }
}
  gameWin(){
    alert("you have win the game");
    this.win=1;

  }

  onRightClick(i:number,j:number, event:MouseEvent)
  { 
    this.totalMoves++;
    if(this.win!=-1)return
    event.preventDefault();
    this.isSeen[i][j]=-1;
  }
}