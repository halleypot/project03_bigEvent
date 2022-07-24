$(function () {

    const layer = layui.layer

    const form = layui.form

    const laypage = layui.laypage

    // 配置文章列表请求参数
    let options = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: '',
    }

    //render article lists
    renderArtList()

    // 渲染文章筛选UI
    initCate()

    function renderArtList() {

        $.ajax({
            url: '/my/article/list',
            data: options,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {

                    return layer.msg(res.message || "failed to get article list")
                }

                let htmlStr = template('tpl-artList', res)

                console.log(htmlStr);
                $('tbody').html(htmlStr)

                renderPage(res.total)
            }
        })
    }

    // 定义时间格式美化的过滤器
    template.defaults.imports.dateFormat = function (time) {

        let dt = new Date(time)

        let y = dt.getFullYear()
        let m = padZero(dt.getMonth() + 1)
        let d = padZero(dt.getDay())

        let hr = padZero(dt.getHours())
        let mm = padZero(dt.getMinutes())
        let ss = padZero(dt.getMinutes())

        return y + "-" + m + '-' + d + ' ' + hr + ':' + mm + ':' + 'ss'
    }

    // 定义补零函数
    function padZero(n) {
        return n < 10 ? '0' + n : n
    }



    function initCate() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message || "获取列表失败")
                }

                let cateStr = template('tpl-cate', res)
                // 给分类下拉框添加标签结构
                $('select[name=cate_id]').html(cateStr)

                // layui中的动态表格需要重新渲染UI
                form.render()

            }
        })
    }

    // 为帅选表单绑定submit event
    $('#art_filter').on('submit', function (e) {
        e.preventDefault()

        // 根据 cate_id, state， 重新渲染文章列表
        let cate_id = $('select[name=cate_id]').val()
        let state = $('select[name=state]').val()

        options.cate_id = cate_id
        options.state = state

        //render article lists
        renderArtList()


    })


    
        // 页面标签渲染功能
        function renderPage(total) {

            laypage.render({
              elem: 'page', // @param:page 对应标签ID
              count: total, //数据总数，从服务端得到
              limit: options.pagesize, // 每页显示几条数据
              curr: options.pagenum, // 设置默认被选中的分页
              layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
              limits: [2, 3, 5, 10],

              jump: function(obj, first){
                //obj包含了当前分页的所有参数，比如：
                options.pagenum = obj.curr
                
                //首次不执行
                if(!first){
                    renderArtList()
                }
              }
            });
        }
      

        

})