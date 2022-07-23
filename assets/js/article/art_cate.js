$(function () {

    const layer = layui.layer

    const form = layui.form
    // 渲染表格
    initTable()

    function initTable() {

        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                // if failed to request data
                if (res.status !== 0) {
                    return layer.msg(res.message || "获取文章列表失败")
                }

                let htmlStr = template('tpl-table', res)

                $('tbody').html(htmlStr)
            }
        })


    }

    // @cateStr: 文章分类 str
    let cateStr = template('tpl-artCate')
    let indexCate = null

    $('#btnAddCate').click(function () {
        indexCate = layer.open({
            type: 1,
            title: "添加文章分类",
            // 获取文章分类模板
            content: $('#tpl-artCate').html(),
            area: ['500px', '250px']
        })
    })

    // 通过代理方式给btnAdd绑定添加事件
    $('body').on('submit', '#formAddCate', function (e) {
        e.preventDefault()

        $.ajax({
            method: "POST",
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {

                if (res.status !== 0) {
                    return layer.msg(res.message || "新增分类失败")
                }

                layer.msg(res.message)
                // 渲染表格
                initTable()

                layer.close(indexCate)
            }
        })
    })

    // 给编辑按钮添加点击事件
    let indexEdit = null

    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({

            type: 1,
            title: "修改文章分类",
            // 获取文章编辑层模板
            content: $('#updateCate').html(),
            area: ['500px', '250px']
        })

        // 点击edit按钮，获取id, 发送请求
        let eidtId = $(this).attr('edit-id')

        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + eidtId,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message || "获取分类数据失败")
                }

                // 获取原表单的填充值
                form.val('form-edit', res.data)

            }
        })
    })


    // 给确确认修改按钮添加代委托事件
    $('body').on('submit', '#cate-edit', function (e) {
        e.preventDefault()

        $.ajax({
            method: "POST",
            url: '/my/article/updatecate',
            data: form.val('form-edit'),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message || "更新失败")
                }

                layer.msg(res.message)

                layer.close(indexEdit)

                // 重新渲染表格
                initTable()
            }
        })

    })

    // 给删除按钮添加事件

    $('tbody').on('click', '.btn-delete', function () {
        
        let del_id = $(this).attr('delete-id')

        layer.confirm('Confirm to delete?', { icon: 3, title: 'Danger' }, function (index) {

            $.ajax({
                url: '/my/article/deletecate/' + del_id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message || '删除失败')
                    }

                    layer.msg(res.message)

                    // 重新渲染表格
                    initTable()
                }
            })

            layer.close(index);
        })

    })














})