$(function () {
    const layer = layui.layer

    const options = {
        aspectRatio: 1,
        preview: '.img-preview'
    }

    // 1.1 获取裁剪区域的 DOM 元素
    let $image = $('#image')
    // 创建图片裁剪区域
    $image.cropper(options)

    // 添加点击事件模拟文件上传
    $('#btnChooseImage').click(function () {
        $('#file').click()
    })

    // 为文件选择框绑定 change 事件
    $('#file').on('change', function (e) {
        // 获取用户选择的文件
        let filelist = e.target.files
        if (filelist.length === 0) {
            return layer.msg('请选择照片！')
        }

        // 1. 拿到用户选择的文件
        let file = e.target.files[0]
        // 2. 将文件，转化为路径
        let imgURL = URL.createObjectURL(file)
        // 3. 重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    // 为确定按钮，绑定点击事件
    $('#btnUpload').on('click', function () {
        // 1. 要拿到用户裁剪之后的头像
        let dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        // 2. 调用接口，把头像上传到服务器
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
              avatar: dataURL
            },
            success: function(res) {
              if (res.status !== 0) {
                return layer.msg('更换头像失败！')
              }
              layer.msg( res.message ||'更换头像成功！')
              window.parent.getUserInfo()
              
            }
          })
          
        })















    })