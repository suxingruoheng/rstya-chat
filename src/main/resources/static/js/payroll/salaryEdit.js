$(function () {
    // 加载基本信息
    loadSalaryInfo();
});

// 加载基本信息
var loadSalaryInfo = function () {
    if (id != '') {
        parent.$.messager.progress({
            text: '数据加载中....'
        });
        $.post(sy.contextPath + '/itemSalary/findById', {
            id: id
        }, function (data) {
            parent.$.messager.progress('close');
            if (data) {
                $('form').form('load', data);
            }
        }, 'json');
    }
};

var submitForm = function ($dialog, $grid, $pjq) {
    if ($('form').form('validate')) {
        $pjq.messager.progress({
            text: '数据保存中....'
        });
        var url = sy.contextPath + '/itemSalary/save';
        var obj = sy.serializeObject($('form'));
        $.post(url, obj, function (ret) {
            $pjq.messager.progress('close');
            if (ret.code == 0) {
                $pjq.messager.i('保存成功');
                $grid.datagrid('load');
                $dialog.dialog('destroy');
            } else {
                $pjq.messager.w(ret.msg);
            }
        }, 'json');
    }
};
