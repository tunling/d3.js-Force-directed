//相关内部函数

//根据名称获取节点索引
function getNodeIndex(name){
    for(var i=0;i<nodes.length;i++){
        if(nodes[i].name==name){
            return i;
        }
    }
    return -1;
}
//判断node_list中是否包含node
function haveNodes(node, node_list){
    for(var i=0;i<node_list.length;i++){
        if(node_list[i].name==node.name){
            return true;
        }
    }
    return false;
}
//判断edge_list（node_list是相应的节点数组）中是否包含edge（起点为list_name,终点为list_tname）
function haveEdges(edge, list_sname, list_tname, edge_list, node_list){
    for(var i=0;i<edge_list.length;i++){
        var sname=getSName(node_list, edge_list[i]);
        var tname=getTName(node_list, edge_list[i]);
        if((list_sname==sname && list_tname==tname ||
            list_sname==tname && list_tname==sname) &&
            edge_list[i].relation == edge.relation && Math.abs(edge_list[i].value-edge.value) < 1e-5){
            return true;
        }
    }
    return false;
}
//更新节点数据（保证已有节点不变，增加这一时刻没有的节点，删除下一时刻没有的节点）
function update_nodes(){
    for(var i=0;i<nodes_list[forward].length;i++){
        if(!haveNodes(nodes_list[forward][i], nodes)){
            add_node(nodes_list[forward][i].name);
        }
    }
    for(var i=0;i<nodes.length;i++){
        if(!haveNodes(nodes[i], nodes_list[forward])){
            delete_node(nodes[i].name);
        }
    }
}
//更新边数据（保证已有边不变，增加这一时刻没有的边，删除下一时刻没有的边）
function update_edges(){
    var len=edges_list[forward].length;
    for(var i=0;i<len;i++){
        var list_sname=getSName(nodes_list[forward], edges_list[forward][i]);
        var list_tname=getTName(nodes_list[forward], edges_list[forward][i]);
        if(!haveEdges(edges_list[forward][i], list_sname, list_tname, edges, nodes)){
            var s=getNodeIndex(list_sname);
            var t=getNodeIndex(list_tname);
            var relations=edges_list[forward][i].relation;
            var weight=edges_list[forward][i].value;
            add_edge(s, t, relations, weight);
        }
    }
    for(var i=0;i<edges.length;i++){
        var list_sname=edges[i].source.name;
        var list_tname=edges[i].target.name;
        if(!haveEdges(edges[i], list_sname, list_tname, edges_list[forward], nodes_list[forward])){
            delete_edge(list_sname, list_tname);
            i--;	//！！！删除之后 i 退一
        }
    }
}
//获得起点名，由于绑定前与绑定后edges的数据结构发生变化，故用此方法
function getSName(node_list, edge_list){
    if(Object.keys(edge_list).length!=4){
        return edge_list.source.name;
    }else{
        return node_list[edge_list.source].name;
    }
}
//获得终点名，由于绑定前与绑定后edges的数据结构发生变化，故用此方法
function getTName(node_list, edge_list){
    if(Object.keys(edge_list).length!=4){
        return edge_list.target.name;
    }else{
        return node_list[edge_list.target].name;
    }
}

//拖拽开始
function started(d){
    if(!d3.event.active){
        forceSimulation.alphaTarget(0.4).restart();
    }
    d.fx = d.x;
    d.fy = d.y;
}
//拖拽中
function dragged(d){
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}
//拖拽结束
function ended(d){
    if(!d3.event.active){
        forceSimulation.alphaTarget(0);
    }
    d.fx = null;
    d.fy = null;
}