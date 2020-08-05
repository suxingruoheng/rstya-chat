// let menuMap = new Map(); // key:parentId, value:submenus(list)
let menuMap = new Map(); // key:id, value:menu

$(function () {
    // loadMenu();

    loadMenuMap();

    $('#exit-button').click(function () {
        logout();
    });

    $('.submenu .level2').click(function () {
        loadTab($(this).attr('id'));
    });
});

function loadMenu() {
    const menus = JSON.parse(localStorage.getItem("menus"));
    for (let i in menus) {
        loopMenu(menuMap, menus[i]);
    }

    console.log(menuMap);
}

function loadMenuMap() {
    const menus = JSON.parse(localStorage.getItem("menus"));
    for (let i in menus) {
        menuMap.set(menus[i].id, menus[i]);
    }
}

/**
 * 循环取出菜单到menuMap
 * @param menu
 */
function loopMenu(menu) {
    // 取出同一parentId下的menu列表
    let subMenus = new Array(menuMap.get(menu.parentId));
    if (subMenus.length > 0) {
        subMenus.concat(menu);
        menuMap.set(menu.parentId, subMenus);
    } else {
        for (let i in subMenus) {
            loopMenu(subMenus[i]);
        }
    }
}

/**
 * 加载Tab页
 * @param menuId
 */
function loadTab(menuId) {
    let menu = menuMap.get(menuId);
    if (undefined === menu) {
        menu = {};
        menu.id = 'ERR404';
        menu.menuName = '404 Not Found';
        menu.url = '/page/404.html';
    }
    let iframe = '<div class="tab-title active ' + menuId + '" title="' + menu.menuName + '"><iframe allowtransparency="true" src="' + menu.url + '"></iframe></div>';
    $('#tabs').append(iframe);
    $('.tab-title').removeClass('active');
    $('.' + menuId).addClass('active');
}

/**
 * 退出登录
 */
function logout() {
    API.logout(function () {
        localStorage.clear();
        window.location.href = "login.html";
    })
}