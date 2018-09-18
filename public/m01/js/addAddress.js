$(function(){
    var isEdit=Number(getParamsByUrl(location.href,'isEdit'));
    if(isEdit){
        //编辑页面操作
        var address=JSON.parse(localStorage.getItem('editAddress'));

        var html=template('editTpl',address);
        $('#editForm').html(html);
    }else {
        var html=template('editTpl',{})
        $('#editForm').html(html);
    }
//创建picker选择器 传的参数是一个三级联动参数
    var picker=new mui.PopPicker({layer:3});
//为picker选择器添加数据
    picker.setData(cityData);

    //为用户点击文本框的时候添加点击事件
    $('#selectCity').on('tap',function () {
        
        //显示picker选择器
        picker.show(function (selectItems) {
            $('#selectCity').val(selectItems[0].text + selectItems[1].text + selectItems[2].text)
        })
    })


    $('#addAddress').on('tap',function () {
        console.log(1);
        var username=$("[name='username']").val().trim()
        var postCode=$("[name='postCode']").val().trim()
        var city=$("[name='city']").val().trim()
        var detail=$("[name='detail']").val().trim()

        var data={
            address: city,
            addressDetail: detail,
            recipients: username,
            postcode: postCode
        };
        if(isEdit){
            //编辑操作
            var url='/address/updateAddress';
            data.id=address.id;
        }else {
            //添加操作
            var url='/address/addAddress';
        }

        $.ajax({
            url:url,
            type:'post',
            data:data,
            success:function (res) {
                console.log(res);
                if(res.success){
                    if(isEdit){
                        mui.toast("地址修改成功");
                    }else{
                        mui.toast("地址添加成功");
                    }
                    setTimeout(function () {
                        location.href='adress.html'
                    },2000)
                }
            }
        })

    })
})