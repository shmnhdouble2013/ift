/**
 * 生成接口服务器
 */
var http = require('http');
var path = require('path');
var url = require('url');
var PORT = 9999;

/**
 *
 * @param {Object} opt 服务器根目录
 * @param {string} opt.root 服务器根目录
 * @param {number} opt.port 端口
 */
function ifServer(opt) {
    var root = opt.root;
    var port = opt.port || PORT;

    http.createServer(
        function(req, res) {
            try {
                var absPath = path.join(root, url.parse(req.url).pathname);
                res.end(JSON.stringify(require(absPath).response));
            } catch (e) {
                res.writeHead(500);
                res.end('[500] ' + e);
            }
        }
    ).listen(//监听
        port,
        function() {
            console.log('接口服务器在端口[' + port + ']启动');
        }
    );

}

exports.ifServer = ifServer;