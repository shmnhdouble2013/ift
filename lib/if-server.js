/**
 * 生成接口服务器
 */
var http = require('http');
var path = require('path');
var url = require('url');
var PORT = 9999;

/**
 *
 * @param {string} root 服务器根目录
 * @param {number} port 端口
 */
function ifServer(root, port) {
    port = port || PORT;

    http.createServer(
        function(req, res) {
            var absPath = path.join(root, url.parse(req.url).pathname);

            try {
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