var grid;
var leftQueryTimes;

$(function () {
    init();
    checkLeftQueryTimes();
    loadList();
});


var init = function () {

    var myDate = new Date();
    var thisYear = myDate.getFullYear();
    var year = thisYear;
    var thisMonth = myDate.getMonth();

    var payYear = [];
    for (year; year > year - 30; year--) {
        if (parseInt(year) < 2018) {
            break;
        }
        var flag = false;
        if (year == thisYear) {
            flag = true;
        }
        payYear.push({label: year, value: year, selected: flag});
    }

    $('#payYear').combobox({
        data: payYear,
        valueField: 'value',
        textField: 'label',
        panelHeight: 'auto',
        editable: false,
        required: true,
        onChange: function () {
            checkLeftQueryTimes();
        }
    });

    var payMonth = [];
    for (var i = 1; i <= 12; i++) {
        var flag = false;
        if (i == thisMonth) {
            flag = true;
        }
        payMonth.push({label: formatNum(i), value: formatNum(i), selected: flag});
    }

    $('#payMonth').combobox({
        data: payMonth,
        valueField: 'value',
        textField: 'label',
        panelHeight: 'auto',
        editable: false,
        required: true,
        onChange: function () {
            checkLeftQueryTimes();
        }
    });

};

var checkLeftQueryTimes = function () {
    if ($('#payYear').combobox('getValue') != '' && $('#payMonth').combobox('getValue') != '') {
        $.post(sy.contextPath + '/itemSalary/checkLeftQueryTimes', {
            payYear: $('#payYear').combobox('getValue'),
            payMonth: $('#payMonth').combobox('getValue')
        }, function (data) {
            leftQueryTimes = data;
            $('#leftQueryTimes em').text(data);
        }, 'json');
    }
};

var searchForm = function () {
    if ($('#payYear').combobox('getValue') == '' || $('#payMonth').combobox('getValue') == '') {
        parent.$.messager.w('请指定要查询的年月');
        return;
    }
    if (leftQueryTimes <= 0) {
        parent.$.messager.w('该计发年月的查询次数已消耗完');
        return;
    }
    var obj = sy.serializeObject($('#searchForm'));
    obj.isRefresh = 1;// 0表示刷新，1表示主动查询
    grid.datagrid('load', obj);
};

var loadList = function () {
    grid = $('#grid').datagrid({
        url: sy.contextPath + '/itemSalary/mySalary',
        toolbar: '#toolbar',
        rownumbers: true,
        fitColumns: false,
        pagenation: false,
        onDblClickRow: function (rowIndex, rowData) {
            // showFun();
        },
        onLoadSuccess: function (data) {
            $('a').removeClass('l-btn-plain');
            var data = $("#grid").datagrid('getData');
            if (data.total > 0) {
                var rows = data.rows;
                leftQueryTimes = 5 - rows[0].queryTimes;
                $('#leftQueryTimes em').text(leftQueryTimes);
            }
        },
        frozenColumns: [[{
            width: '100',
            field: 'id',
            align: 'center',
            checkbox: true
        }, {
            width: $(this).width() * 0.06,
            title: '员工名称',
            align: 'left',
            field: 'employeeName',
        }, {
            width: $(this).width() * 0.06,
            title: '员工工号',
            align: 'left',
            field: 'employeeCode'
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
            width: $(this).width() * 0.06,
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
            width: $(this).width() * 0.06,
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
            width: $(this).width() * 0.06,
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
            width: $(this).width() * 0.06,
            title: '考核奖',
            align: 'right',
            field: 'appraiseReward',
            formatter: function (value, row, index) {
                return accounting.formatMoney(value, "", 2);
            }
        }, {
            width: $(this).width() * 0.06,
            title: '职位补贴',
            align: 'right',
            field: 'positionAllowance',
            formatter: function (value, row, index) {
                return accounting.formatMoney(value, "", 2);
            }
        }, {
            width: $(this).width() * 0.06,
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
            width: $(this).width() * 0.06,
            title: '加班费',
            align: 'right',
            field: 'overtimePay',
            formatter: function (value, row, index) {
                var overtimePay = row.overtimeWeekdayPay + row.overtimeHolidayPay;
                return accounting.formatMoney(overtimePay, "", 2);
            }
        }, {
            width: $(this).width() * 0.06,
            title: '中夜班津贴',
            align: 'right',
            field: 'dayNightAllowance',
            formatter: function (value, row, index) {
                return accounting.formatMoney(value, "", 2);
            }
        }, {
            width: $(this).width() * 0.06,
            title: '值班费',
            align: 'right',
            field: 'dutyAllowance',
            formatter: function (value, row, index) {
                return accounting.formatMoney(value, "", 2);
            }
        }, {
            width: $(this).width() * 0.06,
            title: '餐补费',
            align: 'right',
            field: 'messAllowance',
            formatter: function (value, row, index) {
                return accounting.formatMoney(value, "", 2);
            }
        }, {
            width: $(this).width() * 0.06,
            title: '过江补贴',
            align: 'right',
            field: 'trafficAllowance',
            formatter: function (value, row, index) {
                return accounting.formatMoney(value, "", 2);
            }
        }, {
            width: $(this).width() * 0.06,
            title: '补发工资',
            align: 'right',
            field: 'supplementSalary',
            formatter: function (value, row, index) {
                return accounting.formatMoney(value, "", 2);
            }
        }, {
            width: $(this).width() * 0.06,
            title: '病事假',
            align: 'right',
            field: 'personalLeaveDeduction',
            formatter: function (value, row, index) {
                return accounting.formatMoney(value, "", 2);
            }
        }, {
            width: $(this).width() * 0.06,
            title: '代扣税',
            align: 'right',
            field: 'individualIncomeTax',
            formatter: function (value, row, index) {
                return accounting.formatMoney(value, "", 2);
            }
        }, {
            width: $(this).width() * 0.06,
            title: '扣款',
            align: 'right',
            field: 'otherDeduction',
            formatter: function (value, row, index) {
                return accounting.formatMoney(value, "", 2);
            }
        }, {
            width: $(this).width() * 0.06,
            title: '工会费',
            align: 'right',
            field: 'unionFund',
            formatter: function (value, row, index) {
                return accounting.formatMoney(value, "", 2);
            }
        }, {
            width: $(this).width() * 0.06,
            title: '失业保险',
            align: 'right',
            field: 'unemploymentInsurance',
            formatter: function (value, row, index) {
                return accounting.formatMoney(value, "", 2);
            }
        }, {
            width: $(this).width() * 0.06,
            title: '养老保险',
            align: 'right',
            field: 'endowmentInsurance',
            formatter: function (value, row, index) {
                return accounting.formatMoney(value, "", 2);
            }
        }, {
            width: $(this).width() * 0.06,
            title: '医疗保险',
            align: 'right',
            field: 'medicalInsurance',
            formatter: function (value, row, index) {
                return accounting.formatMoney(value, "", 2);
            }
        }, {
            width: $(this).width() * 0.06,
            title: '住房公积金',
            align: 'right',
            field: 'housingFund',
            formatter: function (value, row, index) {
                return accounting.formatMoney(value, "", 2);
            }
        }]]
    });

}

var confirm = function () {
    var rows = grid.datagrid('getSelections');
    if (rows.length != 1) {
        parent.$.messager.w('请选择一条需要确认的记录！');
        return;
    }

    if (rows[0].confirmStatus == 1 || rows[0].confirmStatus == 2) {
        parent.$.messager.w('该记录已确认过，请勿重复确认！');
        return;
    }

    layer.open({
        title: '确认薪资',
        content: '<center>请确认薪资信息是否无误</center>',
        btn: ['确认无误', '我有疑问'],
        btnAlign: 'c',
        shadeClose: true,
        closeBtn: 1,
        yes: function (index, layero) {
            layer.closeAll('dialog');
            $.post('/itemSalary/confirm', {
                id: rows[0].id,
                confirmStatus: 1
            }, function (data) {
                if (data.code == 0) {
                    parent.$.messager.i('确认成功');
                    var obj = sy.serializeObject($('#searchForm'));
                    obj.isRefresh = 0;// 0表示刷新，1表示主动查询
                    grid.datagrid('load', obj);

                }
            }, 'json');
        },
        btn2: function (index, layero) {
            $.post('/itemSalary/confirm', {
                id: rows[0].id,
                confirmStatus: 2
            }, function (data) {
                if (data.code == 0) {
                    parent.$.messager.i('请于10号到15号前往人资说明情况');
                    var obj = sy.serializeObject($('#searchForm'));
                    obj.isRefresh = 0;// 0表示刷新，1表示主动查询
                    grid.datagrid('load', obj);
                }
            }, 'json');
        },
        cancel: function (index, layero) {
            // 取消操作，点击右上角的X
        }
    });
}

var formatNum = function (val) {
    return val > 9 ? val : '0' + val;
}