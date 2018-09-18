$(function () {
    // 修改密码
    // 1.获取修改密码按钮并添加点击事件
    // 2.获取用户输入的信息
    // 3.对用户输入的信息做校验
    // 4.调用修改密码接口 实现修改密码功能
    // 5.跳转到登录页面 重新登录


    $('#modify-btn').on('tap',function () {
        //原密码
        var originPass=$("[name='originPass']").val().trim();
        //新密码
        var newPass=$("[name='newPass']").val().trim();
        //确认密码
        var confirmNewPass=$("[name='confirmNewPass']").val().trim();
        //认证码
        var vCode=$("[name='vCode']").val().trim();

        if(!originPass){
            mui.toast('请输入原密码');
            return;
        }
        if(newPass!=confirmNewPass){
            mui.toast('两次输入的密码不一致');
            return;
        }

        //发送修改密码请求
        $.ajax({
            url:'/user/updatePassword',
            type:'post',
            data:{
                oldPassword: originPass,
                newPassword: newPass,
                vCode: vCode
            },
            success:function (res) {
                if(res.success){
                    mui.toast('修改密码成功')
                    setTimeout(function () {
                        location.href='login.html'
                    },2000)
                }
            }
        })
    });

    $('#getCode').on('tap',function () {
        $.ajax({
            url:'/user/vCodeForUpdatePassword',
            type:'get',
            success:function (res) {
                console.log(res.vCode);
            }
        })
    })



});