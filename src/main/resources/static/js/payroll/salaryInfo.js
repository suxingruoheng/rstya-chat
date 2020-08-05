$(function () {
    // 加载基本信息
    loadUserInfo();

    // TAB页切换
    $('.layui-tab-title li').click(function (event) {
        // 点击当前选项卡不继续执行
        if ($(this).hasClass('on')) {
            return;
        }

        var index = $(this).index();
        $(this).addClass('on').siblings('li').removeClass('on');
        $('.change').eq(index).show().siblings('.change').hide();

        if ($(this).attr('id') == 'roleTabLi') {
            loadRoleList();
        } else if ($(this).attr('id') == 'agencyTabLi') {
            loadAgencyList();
        } else if ($(this).attr('id') == 'projTabLi') {
            loadProjectList();
        }

        $('.datagrid-pager').remove();
    });

});

// 加载基本信息
var loadUserInfo = function () {
    if (userId != '') {
        parent.$.messager.progress({
            text: '数据加载中....'
        });
        $.post(sy.contextPath + '/authUser/findById', {
            id: userId
        }, function (data) {
            parent.$.messager.progress('close');
            if (data) {
                $('form').form('load', data);
                $("#isAgencyRestrict").textbox('setValue', data.isAgencyRestrict == 0 ? "否" : "是")
                $("#isProjectRestrict").textbox('setValue', data.isProjectRestrict == 0 ? "否" : "是")
                $("#state").textbox('setValue', data.state == 0 ? "启用" : "禁用")
            }
        }, 'json');
    }
};

// 加载用户关联角色列表
var loadRoleList = function () {
    var rolegrid = $('#rolegrid').datagrid({
        url: sy.contextPath + '/authUser/rolelist?userId=' + (userId == '' ? '0' : userId),
        toolbar: '#toolbar',
        rownumbers: true,
        singleSelect: false,
        pagenation: false,
        columns: [[{
            width: $(this).width() * 0.3,
            title: '角色名称',
            align: 'left',
            field: 'roleName'
        }, {
            width: $(this).width() * 0.3,
            title: '角色编码',
            align: 'left',
            field: 'code'
        }, {
            width: $(this).width() * 0.3,
            title: '创建时间',
            align: 'center',
            field: 'createTime'
        }]]
    });
};

//加载用户所拥有的机构权限
var loadAgencyList = function () {
    var agencygrid = $('#agencygrid').datagrid({
        url: sy.contextPath + '/authUser/agencylist?userId=' + (userId == '' ? '0' : userId),
        toolbar: '#toolbar',
        rownumbers: true,
        singleSelect: false,
        pagenation: false,
        columns: [[{
            width: $(this).width() * 0.14,
            title: '机构名称',
            field: 'agencyName',
            align: 'left'
        }, {
            width: $(this).width() * 0.14,
            title: '机构编码',
            field: 'code',
            align: 'left'
        }, {
            width: $(this).width() * 0.14,
            title: '机构简称',
            field: 'shortName',
            align: 'left'
        }, {
            width: $(this).width() * 0.14,
            title: '法人',
            field: 'legalPerson',
            align: 'left'
        }, {
            width: $(this).width() * 0.14,
            title: '联系电话',
            field: 'phone',
            align: 'left'
        }, {
            width: $(this).width() * 0.14,
            title: '注册时间',
            field: 'registerTime',
            align: 'center'
        }]]
    });
};

//加载用户所拥有的项目权限
var loadProjectList = function () {
    var projgrid = $('#projgrid').datagrid({
        url: sy.contextPath + '/authUser/projectlist?userId=' + (userId == '' ? '0' : userId),
        toolbar: '#toolbar',
        rownumbers: true,
        singleSelect: false,
        pagenation: false,
        columns: [[{
            title: '项目ID',
            field: 'projectId',
            hidden: true
        }, {
            width: $(this).width() * 0.14,
            title: '项目名称',
            field: 'projectName',
            align: 'left'
        }, {
            width: $(this).width() * 0.14,
            title: '项目编码',
            field: 'code',
            align: 'left'
        }, {
            title: '机构ID',
            field: 'agencyId',
            hidden: true
        }, {
            width: $(this).width() * 0.3,
            title: '所属机构',
            field: 'agencyName',
            align: 'left'
        }, {
            width: $(this).width() * 0.14,
            title: '立项时间',
            field: 'createTime',
            align: 'center'
        }]]
    });
};

var submitForm = function ($dialog, $grid, $pjq) {
    $dialog.dialog('destroy');
};
