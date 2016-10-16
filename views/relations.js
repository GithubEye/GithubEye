
var echarts = require('echarts');
var chart = echarts.init(document.getElementById('test'), null, {
    alert("!!!");
option = {
    title : {
        text: '人物关系：乔布斯',
        subtext: '数据来自人立方',
        x:'right',
        y:'bottom'
    },
    tooltip : {
        trigger: 'item',
        formatter: '{a} : {b}'
    },
    toolbox: {
        show : true,
        feature : {
            restore : {show: true},
            magicType: {show: true, type: ['force', 'chord']},
            saveAsImage : {show: true}
        }
    },
    legend: {
        x: 'left',
        data:['家人','朋友']
    },
    series : [
        {
            type:'force',
            name : "人物关系",
            ribbonType: false,
            categories : [
                {
                    name: '人物'
                },
                {
                    name: '家人',
                    symbol: 'diamond'
                },
                {
                    name:'朋友'
                }
            ],
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        textStyle: {
                            color: '#333'
                        }
                    },
                    nodeStyle : {
                        brushType : 'both',
                        borderColor : 'rgba(255,215,0,0.4)',
                        borderWidth : 1
                    }
                },
                emphasis: {
                    label: {
                        show: false
// textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                    },
                    nodeStyle : {
//r: 30
                    },
                    linkStyle : {}
                }
            },
            minRadius : 15,
            maxRadius : 25,
            gravity: 1.1,
            scaling: 1.2,
            draggable: false,
            linkSymbol: 'arrow',
            steps: 10,
            coolDown: 0.9,
//preventOverlap: true,
            nodes:[
                {"category":1,"name":"karpathy","value":3},{"category":1,"name":"DanLavine","value":3},{"category":1,"name":"xpqiu","value":3},{"category":1,"name":"taineleau","value":3},{"category":1,"name":"SixSiebenUno","value":3},{"category":1,"name":"splintersu","value":3},
            ],
            links : [{"source":"splintersu","target":"karpathy"},{"source":"splintersu","target":"DanLavine"},{"source":"splintersu","target":"xpqiu"},{"source":"splintersu","target":"taineleau"},{"source":"splintersu","target":"SixSiebenUno"},{"source":"SixSiebenUno","target":"splintersu"},{"source":"taineleau","target":"karpathy"}]
        }
    ]
};
var ecConfig = require('echarts/config');
//myChart.on(ecConfig.EVENT.CLICK, focus)

myChart.on(ecConfig.EVENT.FORCE_LAYOUT_END, function () {
    console.log(myChart.chart.force.getPosition());
});