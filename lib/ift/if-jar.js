/**
 * 生成java vo 类
 */
var path = require('path'),
    fs = require('fs'),
    url = require('url'),
    util = require('util'),
    cwd = process.cwd();

/**
 *
 * @param {Object} config 
 * @param {string} json js 路径
 */
function ifJar(opt) {
    var dataDir = opt.dataDir,
        savePath = opt.savePath, 
        spawn = require('child_process').spawn,
        exec = require("child_process").exec;

        // tojavaVo.jar path
        var tojavaVo = __dirname+"./tools/jsonParseVo.jar";

        // 读取目录 数据
        fs.readdir(dataDir, function(err, files){
            var filesAry = filterFile(files),
                length = filesAry.length;

            if(err || !length){
                return;
            }

            parseJavaBean(filesAry);
        });
       

        // 转换java bean文件 
        function parseJavaBean(Things){
            for (var i = Things.length - 1; i >= 0; i--) {
                var fielName = Things[i];

            };

        }
         
        exe(["/c","java","-jar", tojavaVo, "test.js"]);


        fs.readFileSync('demo.js', 'utf-8'); 

        fs.writeFileSync('abc.js', 'abc', 'utf-8'); 



       




         
        function exe(command){            
            var cmd = spawn("cmd", command);
         
            cmd.stdout.setEncoding("utf-8");

            cmd.stdout.on("data", function(data){
                console.log("------------------------------");
                console.log("exec", command);
                console.log("stdout:"+data);
            });
         
            cmd.stderr.on("data",function(data){                
                console.log("------------------------------");
                console.log("stderr:"+data);
            });

            cmd.on("exit",function(code){
                console.log("------------------------------");
                console.log("exited with code:"+code);
            });

            cmd.on('close', function (code) {
                console.log("------------------------------");
                console.log('toJavaBean process exited with code ' + code);
            });
            
            
        };

        // 文件过滤 - 只处理 js文件
        function filterFile (Things) {
            var ary = [],
                reg = /\.js$/g;
            
            for (var i = Things.length - 1; i >= 0; i--) {
                var files = Things[i],
                    isJs = reg.test(files);
                
                if(isJs){
                    ary.push(files);
                }    
            };

            return ary;
        }

}


/**
 * 接口初始化
 *
 * @param {Object} opt
 * @param {Array} opt.root 需要接口初始化的项目的根目录
 */
function ifInit(opt) {
    var root = opt.root;
    var encoding = DEFAULT_ENCODING;

    var demoDirPath = path.join(root, 'demo');
    var dataDirPath = path.join(root, 'demo/data');
    var docDirPath = path.join(root, 'doc');
    var ifConfigPath = path.join(dataDirPath, 'if-config.json');
    var demoDataPath = path.join(dataDirPath, 'demo.js');

    !fs.existsSync(demoDirPath) && fs.mkdirSync(demoDirPath);
    !fs.existsSync(dataDirPath) && fs.mkdirSync(dataDirPath);
    !fs.existsSync(docDirPath) && fs.mkdirSync(docDirPath);
    if (!fs.existsSync(ifConfigPath)) {
        fs.writeFileSync(ifConfigPath, render({
            tplPath: path.join(__dirname, 'tpl/if-config.json.tpl'),
            encoding: encoding
        }), encoding);
    }
    if (!fs.existsSync(demoDataPath)) {
        fs.writeFileSync(demoDataPath, render({
            tplPath: path.join(__dirname, 'tpl/demo.data.js.tpl'),
            encoding: encoding
        }), encoding);
    }

    console.log('[ift] 接口环境初始化完成', root);
}

exports.ifSync = ifSync;
exports.ifInit = ifInit;

exports.ifJar = ifJar;