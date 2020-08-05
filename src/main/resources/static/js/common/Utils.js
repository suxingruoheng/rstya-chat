var Utils = {};

Utils.post = function (url, data, successCallback, errorCallback) {
    $.ajax({
            url: url,
            type: 'post',
            dateType: 'json',
            headers: {
                'Content-Type': 'application/json;charset=utf8',
                'token': localStorage.getItem("token")
            },
            data: JSON.stringify(data),
            success: successCallback,
            error: errorCallback
        }
    );
};

Utils.list2tree = function (list) {

};

// 状态
Utils.states = new Map();
Utils.states.set(1, "<span class='state-span state-enabled'>启用</span>");
Utils.states.set(0, "<span class='state-span state-disabled'>禁用</span>");
Utils.states.set(-1, "<span class='state-span state-deleted'>删除</span>");