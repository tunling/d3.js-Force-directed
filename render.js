//绘制函数
//d3.js v5写法
function render(){
    //力导向图
    forceSimulation = d3.forceSimulation()
            .force("link",d3.forceLink())
            .force("charge",d3.forceManyBody().strength(-500).distanceMax(250))
            .force("center",d3.forceCenter().x(width/2).y(height/2))
            .nodes(nodes);
    //边长度
    forceSimulation.force("link")
                .links(edges)
                .distance((d) => d.value*30);
    //边
    links=g.selectAll("line")
        .data(edges, d => d)
        .join(
            enter => enter.append("line")
                .attr("stroke",(d,i) => colorScale(i))
                .attr("stroke-width",2),
            update => update
                .attr("stroke",(d,i) => colorScale(i))
                .attr("stroke-width",2),
            exit => exit
                .remove()
        );
    //边文字
    linksText=g.selectAll("text")
        .data(edges, d => d)
        .join(
            enter => enter.append("text")
                .text((d) => d.relation),
            update => update
                .text((d) => d.relation),
            exit => exit
                .remove()
        );
    //节点组
    gs=g.selectAll("g")
        .data(nodes, d => d)
        .join(
            enter => enter.append("g")
                .attr("transform", (d) => "translate("+d.x+","+d.y+")")
                .call(d3.drag()
                    .on("start",started)
                    .on("drag",dragged)
                    .on("end",ended)
                ),
            update => update
                .attr("transform", (d) => "translate("+d.x+","+d.y+")")
                .call(d3.drag()
                    .on("start",started)
                    .on("drag",dragged)
                    .on("end",ended)
                ),
            exit => exit
                .remove()
        );
    //节点
    gs.append("circle")
        .attr("r",10)
        .attr("fill",(d,i) => colorScale(i));
    //节点文字
    gs.append("text")
        .attr("x",-10)
        .attr("y",-20)
        .attr("dy",10)
        .text((d) => d.name);

    forceSimulation.on("tick", () => {
        links
            .attr("x1",(d) => d.source.x)
            .attr("y1",(d) => d.source.y)
            .attr("x2",(d) => d.target.x)
            .attr("y2",(d) => d.target.y);
        linksText
            .attr("x", (d) => (d.source.x+d.target.x)/2)
            .attr("y", (d) => (d.source.y+d.target.y)/2),
        gs
            .attr("transform", (d) => "translate("+d.x+","+d.y+")");
    });
}