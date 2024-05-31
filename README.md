# json-tackle
json compare and so on.

## 运行项目
下载完项目后，进入到根目录，执行如下操作：
```
npm i
或
npm i --registry=https://mirrors.cloud.tencent.com/npm/
```
下载依赖包完成后在项目根目录可通过命令行执行项目：
```
// 打开应用：
npm start
```

## 命令行工具
npm start --
l[left]='D:\test\left.json'
r[right]='D:\test\right.json'
b[blacklist]='*type*|repository/type'

example:
npm start -- left=/Users/yue/web/json-tackle/test/left.json right=/Users/yue/web/json-tackle/test/right.json b=*type*