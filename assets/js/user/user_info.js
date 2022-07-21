$( function() {
    
    const form = layui.form
    const layer = layui.layer
// 表单验证
    form.verify( {

        nickname: [
            /^[\S]{3,6}$/
            ,'nickname必须3到6位，且不能出现空格'
          ] 
    })

// 初始化表单
formInit()

function formInit() {
    $.ajax( {
        method: "GET",
        url: '/my/userinfo',
        // headers已经在baseAPI.js中设置
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message || "获取用户信息失败")
            }

            form.val('formUserInfo', res.data)
        }
    })
}


// 表单重置
$("#btnReset").click(function(e) {
    e.preventDefault()

    formInit()
})

// 更新用户信息
$('.layui-form').submit(function(e) {
    e.preventDefault()

    $.ajax( {
        method: "POST",
        url: '/my/userinfo',
        data: $(this).serialize(),
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message||"更新失败")
            }

            layer.msg(res.message || "update successfully")
            // 调用父页面中的方法，重新渲染用户资料
            window.parent.getUserInfo()
        }
    })
})








    
})