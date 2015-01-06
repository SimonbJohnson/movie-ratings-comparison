var rtmc_chart = dc.scatterPlot('#rtmc_graph');
var mcim_chart = dc.scatterPlot('#mci_graph');
var imrt_chart = dc.scatterPlot('#irt_graph');

var rt_chart = dc.barChart('#rt_dist');
var mc_chart = dc.barChart('#mc_dist');
var im_chart = dc.barChart('#i_dist');

var cf = crossfilter(data);

cf.rtmc = cf.dimension(function(d){ return [d.RT,d.Metacritic]; });
cf.mcim = cf.dimension(function(d){ return [d.Metacritic,d.IMDB]; });
cf.imrt = cf.dimension(function(d){ return [d.IMDB,d.RT]; });


cf.rt = cf.dimension(function(d){
    var value = Math.floor(d.RT/5)*5;
    if(value==100){value=95;}
    return value;
});
cf.mc = cf.dimension(function(d){
    var value = Math.floor(d.Metacritic/5)*5;
    if(value==100){value=95;}
    return value;
});
cf.im = cf.dimension(function(d){ return Math.floor(d.IMDB*2)/2;});

var rtmc_group = cf.rtmc.group();
var mcim_group = cf.mcim.group();
var imrt_group = cf.imrt.group();

var rt_group = cf.rt.group();
var mc_group = cf.mc.group();
var im_group = cf.im.group();

var all = cf.groupAll();

dc.dataCount("#count-info")
	.dimension(cf)
	.group(all);

rtmc_chart
    .width(300)
    .height(250)
    .x(d3.scale.linear().domain([0,100]))
    .y(d3.scale.linear().domain([0,100]))
    .symbolSize(8)
    .opacity(0.1)
    .yAxisLabel("Metacritic Score")
    .xAxisLabel("Rotten Tomato Score")
    .dimension(cf.rtmc)
    .group(rtmc_group)
    .brushOn(false);
    
mcim_chart
    .width(300)
    .height(250)
    .x(d3.scale.linear().domain([0,100]))
    .y(d3.scale.linear().domain([0,10]))
    .symbolSize(8)
    .opacity(0.1)
    .yAxisLabel("IMDB Score")
    .xAxisLabel("Metacritc Score")    
    .dimension(cf.mcim)
    .group(mcim_group)
    .brushOn(false);
    
imrt_chart
    .width(300)
    .height(250)
    .x(d3.scale.linear().domain([0,10]))
    .y(d3.scale.linear().domain([0,100]))
    .symbolSize(8)
    .opacity(0.1)
    .yAxisLabel("Rotten Tomato Score")
    .xAxisLabel("IMDB Score")  
    .dimension(cf.imrt)
    .group(imrt_group)
    .brushOn(false);
    
rt_chart.width(260)
    .height(150)
    .margins({top: 10, right: 10, bottom: 20, left: 40})
    .x(d3.scale.linear().domain([0, 100]))
    .dimension(cf.rt)
    .group(rt_group)
    .elasticY(true)
    .yAxisLabel("Count of Movies")
    .gap(-8);
    
mc_chart.width(260)
    .height(150)
    .margins({top: 10, right: 10, bottom: 20, left: 40})
    .x(d3.scale.linear().domain([0, 100]))
    .dimension(cf.mc)
    .group(mc_group)
    .elasticY(true)
    .yAxisLabel("Count of Movies")
    .gap(-8);
        
im_chart.width(260)
    .height(150)
    .margins({top: 10, right: 10, bottom: 20, left: 40})
    .x(d3.scale.linear().domain([0, 10]))
    .dimension(cf.im)
    .group(im_group)
    .elasticY(true)
    .yAxisLabel("Count of Movies")
    .gap(12);
    
dc.dataTable("#data-table")
    .dimension(cf.im)                
    .group(function (d) {
        return d.Title;
    })
    .size(650)
    .columns([
        function(d){
            return d.Title; 
        },
        function(d){
            return d.RT; 
        },
        function(d){
            return d.Metacritic; 
        },
        function(d){
            return d.IMDB; 
        }
    ])
    .renderlet(function (table) {
        table.selectAll(".dc-table-group").classed("info", true);
    });

dc.renderAll();