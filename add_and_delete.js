//添加、删除连线与节点数据
function add_edge(s, t, relations, weight){
    if(s!=-1&&t!=-1&&relations!=""&&weight>0){
        var found=0;
        for(var i=0;i<edges.length;i++){
            if(edges[i].source.name==nodes[s].name&&edges[i].target.name==nodes[t].name
            ||edges[i].target.name==nodes[s].name&&edges[i].source.name==nodes[t].name){
                found=1;
            }
        }
        if(found==0){
            forceSimulation.stop();
            edges.push({source:s, target:t, relation:relations, value:weight});
            render();
        }
    }
}
function delete_edge(node1, node2){
    if(getNodeIndex(node1)!=-1&&getNodeIndex(node2)!=-1){
        var found=0;
        for(var i=0;i<edges.length;i++){
            if(edges[i].source.name==node1&&edges[i].target.name==node2
            ||edges[i].target.name==node1&&edges[i].source.name==node2){
                found=1;
                edges.splice(i,1);
            }
        }
        g.selectAll("line").each(function(d){
            if(d.source.name==node1&&d.target.name==node2
            ||d.target.name==node1&&d.source.name==node2){
                d3.select(d).remove();
            }
        });
        if(found==1){
            forceSimulation.stop();
            render();
        }
    }
}
function delete_node(node3){
    var node3Index=getNodeIndex(node3);
    if(node3Index!=-1){
        nodes.splice(node3Index,1);
        var len=edges.length;
        for(var i=0;i<len;i++){
            if(edges[i].source.name==node3|| edges[i].target.name==node3){
                edges.splice(i,1);
                i--;
                len--;
            }
        }
        forceSimulation.stop();
        render();
    }
}
function add_node(node3){
    forceSimulation.stop();
    if(node3!="" && !haveNodes({name:node3}, nodes)){
        nodes.push({name:node3});
        render();
    }
}
