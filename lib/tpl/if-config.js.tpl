var ifSync = require('if-sync').ifSync;
var path = require('path');

ifSync({
    title: '{{这是标题}}',
    extraHtml: '{{这段HTML放置与接口文档正文顶部}}',
    // 生成的接口文档的存放路径
    savePath: path.join(__dirname, '../../doc/api.md'), 
    // 数据文件的根路径
    dataDir: __dirname, 
    // 指定数据文件，无需文件扩展名
    files: [ 
        'demo'
    ]
});