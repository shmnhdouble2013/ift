# ift

> Interface Toolkit, 接口同步工具

by 鬼道（[luics](luics.xu@gmail.com)）

## 安装

```
npm install -g ift
```

MAC 用户请使用`sudo npm install -g ift`

## 1. 初始化

> 请使用 `ift -h` 查看所有命令

请在项目根目录下运行

```
ift -i
```

or

```
ift --init
```

会影响的文件结构为

```
demo/
--data/
----demo.js
----if-config.json
doc/
```

### 数据文件

`ift -i` 生成的 [demo.js](http://gitlab.alibaba-inc.com/luics/if/blob/master/demo/data/demo.js) 是一个 IF 数据文件，即可以作为调试数据使用（`ift -e`），又能生成接口文档（`ift -s`）。
下面显示了重要的配置信息：

```javascript
exports.config = {
    "name": "这是接口名",
    "desc": "这是接口的详细描述",
    // 线上地址
    "url": "http://example.com/demo",
    // 日常地址
    "urlDaily": "http://daily.example.net/demo",
    // 预发地址
    "urlPrepub": "http://example.com/demo",
    // 支持的 Method 集合
    "method": ['GET', 'POST'],
    // 响应与模板的映射关系
    "template":{
        "response": "tpl1.php",
        "responseError": "tpl2.php"
    }
};
```


## 2. 文档生成

用于将数据文件 [demo.js](http://gitlab.alibaba-inc.com/luics/if/blob/master/demo/data/demo.js) 生成接口文档

请在项目根目录下运行

```
ift -s
```

or

```
ift --sync
```

该命令默认读取的配置文件位于 `demo/data/if-config.json`，所有数据文件均位于 `demo/data/`

默认生成的接口文档为 `doc/api.md`（查看 [api.md 文档](http://gitlab.alibaba-inc.com/luics/if/blob/master/doc/api.md)）

```
doc/
--api.md
```

### if-config.json
 [if-config.json](http://gitlab.alibaba-inc.com/luics/if/blob/master/demo/data/if-config.json) 是接口文档配置文件

```javascript
{
    "title": "接口文档",
    "extraHtml": "<h3>额外的html片段</h3>",
    "savePath": "../../doc/api.md",
    "files": [
        "demo"
    ]
}
```

0. `savePath` 设置保存接口文档的相对路径
0. `files` 指定接口文件，无需文件扩展名

## 3. 接口服务器

请在项目根目录下运行

```
ift -e -p 9999
```

or

```
ift --server --port 9999
```

浏览器中访问 `http://localhost:9999/demo.js`，`demo.js` 可替换为合适的值