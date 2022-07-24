$(function () {

    const layer = layui.layer

    const form = layui.form

    // 渲染文章类别下拉框
    initCate()

    function initCate() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message || '获取列表失败')
                }


                let cateStr = template('tpl-artCate', res)
                //给文章类别select列表，渲染下拉框
                $('select[name=cate_id]').html(cateStr)

                // 必须重新渲染表单
                form.render()
            }
        })

    }

    // 富文本编辑器
    tinymce.init()


})