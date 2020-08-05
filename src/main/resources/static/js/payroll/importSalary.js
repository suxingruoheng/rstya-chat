$(function () {
//	// 导入类型
//	var importType = [];
//	importType.push({label:'添加',value:'1',selected:true});
//	importType.push({label:'更新',value:'2'});
//	$('#importType').combobox({
//		data : importType,
//		valueField : 'value',
//		textField : 'label',
//		panelHeight : 'auto',
//		editable : false,
//		required : true
//	});

    // 调用OCUpload插件的方法
    $("#uploadExcel").upload({
        action: "/itemSalaryFile/upload", // 表单提交的地址
        onSelect: function () {// 当用户选择了一个文件后触发事件
            this.autoSubmit = false;
            var filePath = $('input[name="file"]')[0].files[0].name;
            $('#fileSelected').html(filePath);
            var regex = /^.*\.(?:xls|xlsx)$/i;
            if (regex.test(filePath)) {
                parent.$.messager.progress({
                    text: '数据导入中....'
                });
                this.submit();
            } else {
                parent.$.messager.w('请上传.xls或.xlsx文件！');
                return;
            }
        },
        onComplete: function (res) { // 提交表单之后
            parent.$.messager.progress('close');
            res = $.parseJSON(res);
            if (res.code == 0) {
                parent.$.messager.i('上传成功，共导入' + res.data + '条数据');
                var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
                parent.layer.close(index);
            } else {
                parent.$.messager.w('上传失败');
            }
        }
    });
});