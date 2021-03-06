var keyword =getParamsByUrl(location.href,'keyword');
//当前页
var page=1;
//页面中的数据
var html="";
//价格排序规则 升序
var priceSort = 1;

var This=null;

$(function () {

    console.log(keyword);
    mui.init({
        pullRefresh : {
            container: '#refreshContainer',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
            up : {
                height:50,//可选.默认50.触发上拉加载拖动距离
                auto:true,//可选,默认false.自动上拉加载一次
                contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });

    $('#priceSort').on('tap',function () {
        alert(1)
        //更改价格排序条件
        priceSort = priceSort == 1 ? 2 : 1;
        //对之前的配置进行初始化
        html="";
        page=1;
        mui('#refreshContainer').pullRefresh().refresh(true);
        getData();
    })

});
function getParamsByUrl(url,name) {
    var params=url.substr(url.indexOf('?')+1);
    var param=params.split('&');
    for (var i = 0; i < param.length; i++) {
        //console.log(param[i]);
        var current=param[i].split('=');
        if(current[0]==name){
            return current[1]
        }

    }
    return null
}

function getData(){
    if(!This){
        This=this;
    }
    $.ajax({
        url:'/product/queryProduct',
        type:'get',
        data:{
            page:page++,
            pageSize:3,
            proName:keyword,
            price:priceSort
        },
        success:function (response) {
            if(response.data.length>0){
                html+=template('searchTpl',response);
                $('#search-box').html(html)

                //告诉上拉加载数据加载完毕
                This.endPullupToRefresh(false);
            }else {
                //true就表示没有更多的数据了
                This.endPullupToRefresh(true);
            }
        }
    })
}