var Tools = {};

Tools.getIEVersion = function () {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion === 7) {
            return 7;
        } else if (fIEVersion === 8) {
            return 8;
        } else if (fIEVersion === 9) {
            return 9;
        } else if (fIEVersion === 10) {
            return 10;
        } else {
            return 6;//IE版本<=7
        }
    } else if (isEdge) {
        return 'edge';//edge
    } else if (isIE11) {
        return 11; //IE11
    } else {
        return -1;//不是ie浏览器
    }
};

/**
 * 获取浏览器版本号
 * 这个方法不行，Firefox获取不到名称和版本号，而且IE10以下的版本都被当成了360兼容模式
 * @returns {string}
 */
Tools.browserVersion = function () {
    var browserName = 'Runing';
    var strStart = 0;
    var strStop = 0;
    var temp = '';

    var userAgent = window.navigator.userAgent; //包含以下属性中所有或一部分的字符串：appCodeName,appName,appVersion,language,platform

    // FireFox浏览器
    if (userAgent.indexOf('Firefox') !== -1) {
        strStart = userAgent.indexOf('Firefox');
        temp = userAgent.substring(strStart);
        browserName = temp.replace('/', '版本号')
    }

    // Edge浏览器
    if (userAgent.indexOf('Edge') !== -1) {
        strStart = userAgent.indexOf('Edge');
        temp = userAgent.substring(strStart);
        browserName = temp.replace('/', '版本号');
    }

    // IE浏览器
    if (userAgent.indexOf('NET') !== -1 && userAgent.indexOf("rv") !== -1) {
        strStart = userAgent.indexOf('rv');
        strStop = userAgent.indexOf(')');
        temp = userAgent.substring(strStart, strStop);
        browserName = temp.replace('rv', 'IE').replace(':', '版本号');
    }

    // 360极速模式可以区分360安全浏览器和360极速浏览器
    if (userAgent.indexOf('WOW') !== -1 && userAgent.indexOf("NET") < 0 && userAgent.indexOf("Firefox") < 0) {
        if (navigator.javaEnabled()) {
            browserName = '360安全浏览器-极速模式';
        } else {
            browserName = '360极速浏览器-极速模式';
        }
    }

    // 360兼容模式
    if (userAgent.indexOf('WOW') !== -1 && userAgent.indexOf("NET") !== -1 && userAgent.indexOf("MSIE") !== -1 && userAgent.indexOf("rv") < 0) {
        browserName = '360兼容模式';
    }

    // Chrome浏览器
    if (userAgent.indexOf('WOW') < 0 && userAgent.indexOf("Edge") < 0) {
        strStart = userAgent.indexOf('Chrome');
        strStop = userAgent.indexOf(' Safari');
        temp = userAgent.substring(strStart, strStop);
        browserName = temp.replace('/', '版本号');
    }

    return browserName;
};