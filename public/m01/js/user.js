//保存用户的信息
var userInfo = null;

$.ajax({
    url:'/user/queryUserMessage',
    type:'get',
    async:false,
    success:function (res) {
        //判断用户有没有登录
        console.log(res);
        if(res.error && res.error==400){
            location.href='login.html'
        }
        userInfo=res;
    }

});
$(function () {
    // 退出登录
    // 1.获取到退出登录按钮并添加点击事件
    // 2.调用退出登录接口实现 退出登录
    // 3.如果退出成功 跳转到首页

    $('#logout').on('click',function () {

        $.ajax({
            url:'/user/logout',
            type:'get',
            data:{

            },
            success:function (res) {
                console.log(1);
                if(res.success){
                    mui.toast('退出登录成功');
                    setTimeout(function () {
                        location.href='index.html'
                    },2000)
                }
            }
        })
    })

    //拼接模板
    var html=template('userTpl',userInfo);
    $('#userInfoBox').html(html)
})