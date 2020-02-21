var localStorage = window.localStorage;
var sessionStorage = window.sessionStorage;

var cookieApi = {
    get: function (name) {
        var strItem = name + '=';
        var cookieArr = document.cookie.split(';');
        for (var i = 0; i < cookieArr.length; i++) {
            let cItem = cookieArr[i];
            if (cItem.charAt(0) === ' ') {
                cItem = cItem.substr(1);
            }
            if (cItem.indexOf(strItem) > -1) {
                return cItem.substr(strItem.length, cItem.length);
            }
        }
        return '';
    },

    set: function (name, value, expire) {
        var cStr = name + '=' + value + ';Path= /;';
        if (!!expire && parseInt(expire)) {
            let time = new Date().getTime() + parseInt(expire) * 1000;
            cStr += 'expires=' + new Date(time).toUTCString();
        }
        document.cookie = cStr;
    },

    remove: function (name) {
        document.cookie = name + '=; Path= /; expires=Thu, 01 Jan 1970 00:00:00 UTC';
    }
};

var storageApi = {
    /* iSessionStorage 指定存储位置 */
    get: function (name, iSessionStorage) {
        var Storage = localStorage;
        var tmpVal = '';
        if (!!iSessionStorage && typeof iSessionStorage === 'boolean') {
            // 从 sessionStorage 取值
            Storage = sessionStorage;
        }
        if (!Storage || !name || typeof name === 'object') {
            return null;
        }
        try {
            tmpVal = Storage.getItem(name);
            return JSON.parse(tmpVal);
        } catch (e) {
            return tmpVal || cookieApi.get(name) || null;
        }
    },

    set: function (name, value, iSessionStorage) {
        var Storage = localStorage;
        if (!!iSessionStorage && typeof iSessionStorage === 'boolean') {
            // 存储在 sessionStorage
            Storage = sessionStorage;
        }
        if (!Storage || !name || name == 'object') {
            return;
        }
        name += '';
        value = typeof value === 'object' ? JSON.stringify(value) : value || null
        try {
            Storage.removeItem(name);
            Storage.setItem(name, value);
        } catch (e) {
            cookieApi.set(name, value, 365 * 24 * 60 * 60);
        }
    },

    remove: function (name) {
        if (!name || typeof name === 'object') {
            return;
        }
        name += '';
        try {
            [cookieApi, localStorage, sessionStorage].forEach(function (item) {
                let fn = item.remove || item.removeItem;
                typeof fn === 'function' ? fn.apply(item, [name]) : '';
            })
        } catch (e) {
        }
    },

    clear: function (iSessionStorage) {
        var Storage = localStorage;
        if (!!iSessionStorage && typeof iSessionStorage === 'boolean') {
            // 存储在 sessionStorage
            Storage = sessionStorage;
        }
        try {
            Storage.clear();
        } catch (e) {
        }
    }
};

export {
    cookieApi,
    storageApi
}
