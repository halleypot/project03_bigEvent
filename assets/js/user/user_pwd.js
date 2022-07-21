$(function () {

const layer = layui.layer

const form = layui.form

// 表单验证
form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
      
      samePwd: function(value){ 
        
        let oldPwd = $('input[name=oldPwd]').val()

        if (value === oldPwd){
          return '新密码不能与旧密码相同'
          
        }
      },

      newPwd: function(value) {
        let newPwd = $('input[name=newPwd]').val()

        if (value !== newPwd) {
            return '两次密码不一致'
            
        }
      }
})



// 发起密码重置请求

$('.layui-form').submit(function(e) {

    e.preventDefault()

    $.ajax( {
        method: 'POST', 
        url: '/my/updatepwd',
        data: $(this).serialize(),
        success: function(res) {
            if (res.status !== 0) {
               return layer.msg(res.message || "重置密码失败")
            }

            layer.msg(res.message)

            // 重置密码
            $('.layui-form')[0].reset()
        }
    })
})


})