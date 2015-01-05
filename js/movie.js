function generateGraph(id){

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 600 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    var x = d3.scale.linear()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var svg = d3.select(id).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    x.domain([0,100]);
    y.domain([0,100]);

    svg.append("g")
          .attr("class", "x axis xaxis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

    svg.append("g")
        .attr("class", "y axis yaxis")
        .call(yAxis);
        
    svg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3)
        .attr("cx", function(d) { return x(d.RT); })
        .attr("cy", function(d) { return y(d.Metacritic); })
        .style("fill", function(d) { return scoreToColor(d.IMDB,"IMDB"); })
      .on("mouseover", function(d) {
          tooltip.transition()
               .duration(200)
               .style("opacity", 1);
          tooltip.html(d.Title+"<br>RT: "+d.RT+"<br>MC: "+d.Metacritic+"<br>IMDB: "+d.IMDB)
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY) + "px");
      })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(200)
               .style("opacity", 0);
      });

}

function transitionGraph(xValue,yValue,colorValue){
    console.log(xValue,yValue,colorValue);
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 600 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    var x = d3.scale.linear()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");
    
    if(xValue=="I"){
        var xDomain = [0,10];
    } else {
        var xDomain = [0,100];
    }
    
    if(yValue=="I"){
        var yDomain = [0,10];
    } else {
        var yDomain = [0,100];
    }
    
    x.domain(xDomain);
    y.domain(yDomain);
    
    d3.selectAll(".yaxis")
        .transition().duration(1000)
        .call(yAxis);

    d3.selectAll(".xaxis")
        .transition().duration(1000)
        .call(xAxis);

    d3.selectAll(".dot").transition().duration(1000).attr("cx", function(d) { 
            if(xValue=="R"){
                return x(d.RT);
            } else if(xValue=="M"){
                return x(d.Metacritic);
            } else {
                return x(d.IMDB);
            }
        })
        .attr("cy",  function(d) { 
            if(yValue=="R"){
                return y(d.RT);
            } else if(yValue=="M"){
                return y(d.Metacritic);
            } else {
                return y(d.IMDB);
            }
        })
        .style("fill", function(d) { 
            if(colorValue=="R"){
                return scoreToColor(d.RT,"RT");
            } else if(colorValue=="M"){
                return scoreToColor(d.Metacritic,"Metacritic");
            } else {
                return scoreToColor(d.IMDB,"IMDB");
            }
        });
}

function scoreToColor(score,colorBy){
    var colors = [  "#fff7fb",
                    "#ece7f2",
                    "#d0d1e6",
                    "#a6bddb",
                    "#74a9cf",
                    "#3690c0",
                    "#0570b0",
                    "#045a8d",
                    "#023858",
                    "#012030"];
    if(colorBy=="IMDB"){
        var scaleFactor=10;
    } else {
        var scaleFactor=1;
    }
    score = Math.floor((score*scaleFactor)/10);
    if(score==10){score=9;}
    return colors[score];
}

generateGraph("#movie_graph");
$("#x_selector").on("change",function(){
    transitionGraph($("#x_selector").val(),$("#y_selector").val(),$("#color_selector").val());
});

$("#y_selector").on("change",function(){
    transitionGraph($("#x_selector").val(),$("#y_selector").val(),$("#color_selector").val());
});

$("#color_selector").on("change",function(){
    transitionGraph($("#x_selector").val(),$("#y_selector").val(),$("#color_selector").val());
});