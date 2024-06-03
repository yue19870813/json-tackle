let blacklist = {};

let list = [];

function initBlacklist(blacklistStr) {
    list = blacklistStr?.split("#");
}

function removeBlacklist(diffs) {
    if (list == null) {
        return diffs;
    }
    list.forEach(pattern => {
        // 将通配符 "*" 替换为 ".*"，以创建一个正则表达式
        let regex = new RegExp(pattern.replace("*", ".*"));
        
        // 过滤掉与正则表达式匹配的元素
        diffs = diffs.filter(diff => !regex.test(diff.path));
    });
    return diffs;  // 返回过滤后的数组
}

blacklist.initBlacklist = initBlacklist;
blacklist.removeBlacklist = removeBlacklist;
module.exports = blacklist;