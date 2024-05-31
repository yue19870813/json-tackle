let cmd_line = {};

// 命令行参数列表
cmd_line.param = {
    left : null,    // 左侧json文件地址
    right : null,   // 右侧json文件地址
    blacklist : null,   // 黑名单
};

function init(argv) {
    argv.forEach(arg => {
        let parts = arg.split('=');  // 分割每个参数
        // 检查参数是否是 key=value 形式的
        if (parts.length === 2) {
            let key = parts[0];  // 参数的键
            let value = parts[1];  // 参数的值
            // 检查键是否是 cmd_line.param 的一个属性
            if (key in cmd_line.param) {
                cmd_line.param[key] = value;  // 更新相应的属性
            }
        }
    });
}
// let content = [
//     '/Users/yue/dist/Electron.app/Contents/MacOS/Electron',
//     '.',
//     'left=/Users/yue/web/json-tackle/test/left.json',
//     'right=/Users/yue/web/json-tackle/test/right.json',
//     'blacklist=*type*'
// ]
// init(content);

cmd_line.init = init;

module.exports = cmd_line;