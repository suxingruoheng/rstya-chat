$(function () {
    loadTable();
});

/**
 * 加载表格数据
 */
function loadTable() {
    layui.use('table', function () {
        let table = layui.table;
        //第一个实例
        table.render({
            elem: '#datagrid'
            , url: '/user/list' //数据接口
            , page: true //开启分页
            , method: 'post'
            , code: "1"
            , headers: {
                'token': localStorage.getItem("token")
            }
            , request: {
                pageName: 'page',
                limitName: 'rows'
            }
            , where: {
                'username': $('#username').val(),
                'account': $('#account').val()
            }
            , response: {
                statusName: 'code' //规定数据状态的字段名称，默认：code
                , statusCode: 1 //规定成功的状态码，默认：0
                , msgName: 'msg' //规定状态信息的字段名称，默认：msg
                , countName: 'total' //规定数据总数的字段名称，默认：count
                , dataName: 'rows' //规定数据列表的字段名称，默认：data
            }
            // , skin: 'line' //行边框风格
            , even: true
            , cols: [[ //表头
                {field: 'id', title: 'ID', width: '5%', fixed: 'left'}
                , {field: 'username', title: '用户名称', width: '11%'}
                , {field: 'account', title: '用户账号', width: '11%'}
                , {field: 'mobile', title: '手机号码', width: '15%'}
                , {
                    field: 'state', title: '状态', width: '6%', templet: function (data) {
                        return Utils.states.get(data.state);
                    }
                }
                , {field: 'email', title: '电子邮箱', width: '20%'}
                , {field: 'loginTime', title: '最近登录时间', width: '16%', sort: true}
                , {field: 'createTime', title: '创建时间', width: '16%', sort: true}
            ]]
        })
        ;
    });
}