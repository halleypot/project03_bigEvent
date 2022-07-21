$(function () {

    getUserInfo()
    const layer = layui.layer
    // 给退出按钮绑定退出确认框
    $('#btn_logout').click(function () {
        

        layer.confirm('Confirm to Exit?', { icon: 3, title: 'Tip' }, function (index) {
            //remove token and relocate to login page
            localStorage.removeItem('token')

            location.href = '15_大事件案例/login.html'

            layer.close(index);
        });
    })


    


})

// 获取用户信息，从而渲染头像或退出首页
function getUserInfo() {

    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        success: function (res) {
            // check login status === 0 ?
            if (res.status !== 0) {
                // if failed to log in
                return layui.layer.msg(res.message || 'failed to get users information')

            }

            renderAvatar(res.data)
        }
    })
}

function renderAvatar(info) {
    // render users' avatar based on upladed image
    let name = info.nickname || info.username
    $('#welcome').html('Welcome ' + name)

    if (info.user_pic) {
        $('.text-avatar').hide()

        $('.layui-nav-img').attr('src', info.user_pic).show()
    } else {
        $('.layui-nav-img').hide()

        $('.text-avatar').html(name[0].toUpperCase()).show()
    }
}

