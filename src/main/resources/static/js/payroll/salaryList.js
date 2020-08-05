var grid;

$(function () {
    var myDate = new Date();
    var year = myDate.getFullYear();

    var payYear = [];
    for (year; year > year - 30; year--) {
        if (parseInt(year) < 2018) {
            break;
        }
        payYear.push({label: year, value: year});
    }

    $('#payYear').combobox({
        data: payYear,
        valueField: 'value',
        textField: 'label',
        panelHeight: 'auto',
        editable: false
    });

    var payMonth = [];
    for (var i = 1; i <= 12; i++) {
        payMonth.push({label: formatNum(i), value: formatNum(i)});
    }
    $('#payMonth').combobox({
        data: payMonth,
        valueField: 'value',
        textField: 'label',
        panelHeight: 'auto',
        editable: false
    });

    // 输入框回车事件
    searchTextBox('employeeName');
    searchTextBox('employeeCode');
    // 下拉框更换事件
    searchComboBox('payYear');
    searchComboBox('payMonth');

    // 加载列表数据
    loadList();
});

var searchTextBox = function (id) {
    $('#' + id).textbox('textbox').keypress(function (e) {
        var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
        if (eCode == 13) {
            grid.datagrid('load', sy.serializeObject($('#searchForm')));
        }
    });
}

var searchComboBox = function (id) {
    $('#' + id).combobox({
        onSelect: function () {
            grid.datagrid('load', sy.serializeObject($('#searchForm')));
        }
    });
}

var loadList = function () {
    grid = $('#grid').datagrid({
        url: sy.contextPath + '/itemSalary/list',
        toolbar: '#toolbar',
        rownumbers: true,
        singleSelect: false,
        fitColumns: false,
        fit: true,
        pageSize: pageSize,
        pageList: [10, 20, 50, 100, 200, 500],
        showFooter: true,
        onDblClickRow: function (rowIndex, rowData) {
            showFun();
        },
        onLoadSuccess: function (data) {
            $('a').removeClass('l-btn-plain');
        },
        frozenColumns: [[{
            width: '100',
            field: 'id',
            align: 'center',
            checkbox: true
        }, {
            field: 'isManager',
            hidden: true
        }, {
            width: $(this).width() * 0.05,
            title: '员工名称',
            align: 'left',
            field: 'employeeName',
        }, {
            width: $(this).width() * 0.06,
            title: '员工工号',
            align: 'left',
            field: 'employeeCode'
        }, {
            width: $(this).width() * 0.08,
            title: '所属部门',
            align: 'left',
            field: 'departmentName',
            hidden: true
        }, {
            width: $(this).width() * 0.05,
            title: '计发年月',
            align: 'center',
            field: 'payYearmonth'
        }, {
            title: '确认状态',
            field: 'confirmStatus',
            hidden: true
        }, {
            width: $(this).width() * 0.05,
            title: '确认状态',
            align: 'center',
            field: 'confirmStatusStr',
            formatter: function (value, row, index) {
                if (typeof row.confirmStatus != 'undefined') {
                    if (0 == row.confirmStatus) {
                        return '未确认';
                    } else if (1 == row.confirmStatus) {
                        return '<span style="color:green;">已确认</span>';
                    } else if (2 == row.confirmStatus) {
                        return '<span style="color:red;">有疑问</span>';
                    }
                }
            }
        }, {
            width: $(this).width() * 0.05,
            title: '标准工资',
            align: 'right',
            field: 'salaryStandard',
            formatter: function (value, row, index) {
                return accounting.formatMoney(value, "", 2);
            },
            styler: function (value, row, index) {
                return 'background-color:orange';
            }
        }, {
            width: $(this).width() * 0.05,
            title: '应发工资',
            align: 'right',
            field: 'totalPay',
            formatter: function (value, row, index) {
                return accounting.formatMoney(value, "", 2);
            },
            styler: function (value, row, index) {
                return 'background-color:pink';
            }
        }, {
            width: $(this).width() * 0.05,
            title: '实发合计',
            align: 'right',
            field: 'netPay',
            formatter: function (value, row, index) {
                return accounting.formatMoney(value, "", 2);
            },
            styler: function (value, row, index) {
                return 'background-color:#1ab394;color:white;';
            }
        }]],
        columns: [[{
            width: $(this).width() * 0.06,
            title: '职级职等津贴',
            align: 'right',
            field: 'positionRankAllowance',
            formatter: function (value, row, index) {
                return accounting.formatMoney(value, "", 2);
            }
        }, {
            width: $(this).width() * 0.04,
            title: '考核奖',
            align: 'right',
            field: 'appraiseReward',
            formatter: function (value, row, index) {
                return accounting.formatMoney(value, "", 2);
            }
        }, {
            width: $(this).width() * 0.05,
            title: '职位补贴',
            align: 'right',
            field: 'positionAllowance',
            formatter: function (value, row, index) {
                return accounting.formatMoney(value, "", 2);
            }
        }, {
            width: $(this).width() * 0.04,
            title: '岗贴',
            align: 'right',
            field: 'postAllowance',
            formatter: function (value, row, index) {
                return accounting.formatMoney(value, "", 2);
            }
        }, {
            field: 'overtimeWeekdayPay',
            hidden: true
        }, {
            field: 'overtimeHolidayPay',
            hidden: true
        }, {
            width: $(this).width() * 0.04,
            title: '加班费',
            align: 'right',
            field: 'overtimePay',
            formatter: function (value, row, index) {
                var overtimePay = row.overtimeWeekdayPay + row.overtimeHolidayPay;
                return accounting.formatMoney(overtimePay, "", 2);
            }
        }, {
            width: $(this).width() * 0.05,
            title: '中夜班津贴',
            align: 'right',
            field: 'dayNightAllowance',
            formatter: function (value, row, index) {
                return accounting.formatMoney(value, "", 2);
            }
        }, {
            width: $(this).width() * 0.04,
            title: '值班费',
            align: 'right',
            field: 'dutyAllowance',
            formatter: function (value, row, index) {
                return accounting.formatMoney(value, "", 2);
            }
        }, {
            width: $(this).width() * 0.04,
            title: '餐补费',
            align: 'right',
            field: 'messAllowance',
            formatter: function (value, row, index) {
                return accounting.formatMoney(value, "", 2);
            }
        }, {
            width: $(this).width() * 0.05,
            title: '过江补贴',
            align: 'right',
            field: 'trafficAllowance',
            formatter: function (value, row, index) {
                return accounting.formatMoney(value, "", 2);
            }
        }, {
            width: $(this).width() * 0.05,
            title: '补发工资',
            align: 'right',
            field: 'supplementSalary',
            formatter: function (value, row, index) {
                return accounting.formatMoney(value, "", 2);
            }
        }, {
            width: $(this).width() * 0.04,
            title: '病事假',
            align: 'right',
            field: 'personalLeaveDeduction',
            formatter: function (value, row, index) {
                return accounting.formatMoney(value, "", 2);
            }
        }, {
            width: $(this).width() * 0.04,
            title: '代扣税',
            align: 'right',
            field: 'individualIncomeTax',
            formatter: function (value, row, index) {
                return accounting.formatMoney(value, "", 2);
            }
        }, {
            width: $(this).width() * 0.04,
            title: '扣款',
            align: 'right',
            field: 'otherDeduction',
            formatter: function (value, row, index) {
                return accounting.formatMoney(value, "", 2);
            }
        }, {
            width: $(this).width() * 0.04,
            title: '工会费',
            align: 'right',
            field: 'unionFund',
            formatter: function (value, row, index) {
                return accounting.formatMoney(value, "", 2);
            }
        }, {
            width: $(this).width() * 0.05,
            title: '失业保险',
            align: 'right',
            field: 'unemploymentInsurance',
            formatter: function (value, row, index) {
                return accounting.formatMoney(value, "", 2);
            }
        }, {
            width: $(this).width() * 0.05,
            title: '养老保险',
            align: 'right',
            field: 'endowmentInsurance',
            formatter: function (value, row, index) {
                return accounting.formatMoney(value, "", 2);
            }
        }, {
            width: $(this).width() * 0.05,
            title: '医疗保险',
            align: 'right',
            field: 'medicalInsurance',
            formatter: function (value, row, index) {
                return accounting.formatMoney(value, "", 2);
            }
        }, {
            width: $(this).width() * 0.05,
            title: '住房公积金',
            align: 'right',
            field: 'housingFund',
            formatter: function (value, row, index) {
                return accounting.formatMoney(value, "", 2);
            }
        }]]
    });

}

var resetpwd = function () {
    var rows = grid.datagrid('getSelections');
    if (rows.length != 1) {
        parent.$.messager.w('请选择一条记录！');
        return;
    }
    if (rows[0].isManager == 0) {
        parent.$.messager.w('管理员账户不可操作！');
        return;
    }
    parent.$.messager.confirm('询问', '您确定要重置该用户的密码？', function (r) {
        if (r) {
            var ids = [];
            for (var i = 0, l = rows.length; i < l; i++) {
                var r = rows[i];
                ids.push(r.id);
            }
            var id = ids.join(',');

            $.post(sy.contextPath + '/authUser/resetPasswd', {
                id: id
            }, function () {
                $.messager.i("重置密码成功！");
                rows.length = 0;// 必须，否则有bug
                grid.datagrid('reload');
            }, 'json');
        }
    });
};

var addFun = function () {
    var width = 1050;
    var height = 600;
    var dialog = parent.sy.modalDialog({
        title: '添加工资记录',
        width: width,
        height: height,
        url: sy.contextPath + '/go?path=/salary/salaryEdit',
        buttons: [{
            id: 'dialogsave',
            text: '保存',
            handler: function () {
                dialog.find('iframe').get(0).contentWindow.submitForm(dialog, grid, parent.$);
            }
        }]
    });
};

var editFun = function () {
    var width = 1050;
    var height = 600;
    var rows = grid.datagrid('getSelections');
    if (rows.length != 1) {
        parent.$.messager.w('请选择一条记录进行编辑！');
        return;
    }
    if (rows[0].isManager == 0) {
        parent.$.messager.w('管理员账户不可操作！');
        return;
    }
    var dialog = parent.sy.modalDialog({
        title: '编辑工资记录',
        width: width,
        height: height,
        url: sy.contextPath + '/go?path=/salary/salaryEdit&id=' + rows[0].id,
        buttons: [{
            id: 'dialogsave',
            text: '保存',
            handler: function () {
                dialog.find('iframe').get(0).contentWindow.submitForm(dialog, grid, parent.$);
            }
        }]
    });
};

var showFun = function () {
    var width = 1050;
    var height = 600;
    var rows = grid.datagrid('getSelections');
    if (rows.length != 1) {
        parent.$.messager.w('请选择要查看的一条记录！');
        return;
    }
    var dialog = parent.sy.modalDialog({
        title: '工资条详情',
        width: width,
        height: height,
        url: sy.contextPath + '/go?path=/salary/salaryInfo&id=' + rows[0].id,
        buttons: [{
            text: '关闭',
            iconCls: 'icon-cancel',
            handler: function () {
                dialog.find('iframe').get(0).contentWindow.submitForm(dialog, grid, parent.$);
            }
        }]
    });
};

var delFun = function () {
    var rows = grid.datagrid('getSelections');
    if (rows.length == 0) {
        parent.$.messager.w('请选择需要删除的记录！');
        return;
    }
    parent.$.messager.confirm('询问', '您确定要删除此记录？', function (r) {
        if (r) {
            var ids = [];
            for (var i = 0, l = rows.length; i < l; i++) {
                var r = rows[i];
                ids.push(r.id);
            }
            var id = ids.join(',');

            $.post(sy.contextPath + '/itemSalary/del', {
                id: id
            }, function () {
                parent.$.messager.i('删除成功');
                grid.datagrid('clearSelections');
                grid.datagrid('reload');
            }, 'json');
        }
    });
};

var importSalary = function () {
    var width = 550;
    var height = 300;
    var dialog = parent.sy.modalDialog({
        title: '工资记录批量导入',
        width: width,
        height: height,
        url: sy.contextPath + '/go?path=/salary/importSalary',
        onClose: function () {
            grid.datagrid('reload');
        }
    });
};

//导出
var expFunc = function () {
    if ($('#payYear').textbox('getValue') == '' || $('#payMonth').textbox('getValue') == '') {
        parent.$.messager.w('请选择要导出的计发年月');
        return;
    }

    var url = "/itemSalary/exportExcel";
    var data = {
        payYear: $('#payYear').textbox('getValue'),
        payMonth: $('#payMonth').textbox('getValue')
    }

    sy.downLoadFile({
        url: sy.contextPath + url,
        data: data
    });
};

var formatNum = function (val) {
    return val > 9 ? val : '0' + val;
};