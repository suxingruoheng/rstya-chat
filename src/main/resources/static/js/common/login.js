$(function () {

    $('#login').on("click", function () {
        login();
    });

    $(document).keyup(function (event) {
        if (event.keyCode === 13) {
            login();
        }
    });
});

function login() {
    const account = $("#account").val();
    const password = $("#password").val();
    if (undefined === account || "" === account.trim()) {
        layer.msg("用户名不能为空");
        return;
    }
    if (undefined === password || "" === password.trim()) {
        layer.msg("密码不能为空");
        return;
    }
    layer.msg('登录中...', {
        icon: 16,
        shade: 0.3
    });
    $.ajax({
        type: "POST",
        url: '/login',// 注意路径
        data: {
            "account": account,
            "password": hex_md5(password)
        },
        dataType: "json",
        success: function (res) {
            if (res.code === 1) {
                let resdata = res.data;
                localStorage.setItem("menus", JSON.stringify(resdata.menus));
                localStorage.setItem("userInfo", JSON.stringify(resdata.userInfo));
                localStorage.setItem("token", resdata.token);
                localStorage.setItem("isp", resdata.isp);
                location.href = "layout.html";
            } else {
                layer.msg(res.msg);
            }
        },
        error: function () {
            layer.msg("程序异常，请联系管理员", {icon: 5});
        }
    });
}
