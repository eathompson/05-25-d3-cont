'use strict'; //strict mode: catch silly errors

//the data!
var dataList = [
   {id:1, name:'A', sleep:1},
   {id:2, name:'B', sleep:3},
   {id:3, name:'C', sleep:6},
]; //create list of objs

function update(dataList){
var svg = d3.select('svg'); //select svg element, store it in a vbl

var rectList = svg.selectAll('rect'); //reference all rects in the svg

var dataJoin = rectList.data(dataList);
 //connect the two lists

dataJoin.enter().append('rect') //append things in dataset, but not DOM
dataJoin.exit().remove(); //get list of things that have rect in DOM but no data
 
dataJoin //for each thing in the dataJoin set
  .on('click', function(item){
  item.sleep +=1;
  update(dataList);
  })
  .on('mouseover', function(item){
d3.select(this).attr('fill', 'yellow'); 
})
  .on('mouseout', function(item){
d3.select(this).attr('fill', 'blue'); 
})
   .transition()
  .attr({x:10, height:40}) //specify standard height and x-position for every rect
	.attr('y', function(dataItem){ //take dataItem, do {this stuff} to it
		return dataItem.id*50;//multiply by 50
	})
	.attr('width', function(item){ //specify width as function of the item (sleep)
		return item.sleep*20;
	}) //done modifying
//.attr('fill', 'blue');
.attr('fill', function(item){
  if(item.sleep<=4){
    return 'red';
      }
      else{
        return 'blue'
      }
});





}//end update

update(dataList);




/** Button Handlers **/
$('#addButton').click(function(){
  var lastId = 0; //last person's id
  if(dataList.length > 0){
    lastId = dataList[dataList.length-1].id;
  }

  //add new person at end
  dataList.push({
    id:lastId+1, //increment id
    name:'New',
    sleep: Math.floor(Math.random()*24) //random sleep (integer)
  })
    console.log(dataList);
  update(dataList);
});

$('#remButton').click(function(){
  //remove first person
  dataList.shift();
  console.log(dataList);
  update(dataList);
});

$('#moreButton').click(function(){
  dataList[0].sleep += 1; //increase first guy
   console.log(dataList);
    update(dataList);
});

$('#lessButton').click(function(){
  //decrease first guy; min 0
  dataList[0].sleep = Math.max(dataList[0].sleep - 1, 0);
    console.log(dataList);
    update(dataList);
});

$('#resetButton').click(function(){
  dataList = [
    {id:1, name:'A', sleep:1},
    {id:2, name:'B', sleep:3},
    {id:3, name:'C', sleep:6},
  ];
    console.log(dataList);
    update(dataList);
});