/**
 * 生成java vo 类
 */
var path = require('path'),
    fs = require('fs'),
    url = require('url'),
    util = require('util'),
    PORT = 9999;

/**
 *
 * @param {Object} config 
 * @param {string} json js 路径
 */
function ifJar(opt, jsonLib) {
    var root = opt.root,
        port = opt.port || PORT,
        spawn = require('child_process').spawn;

        // tojavabean jar file folder

        // var toolPath = posix2dos(ori);
         
        // tojavaVo.jar path
        var tojavaVo = __dirname+"./tools/tojavaVo.jar";

         
        exe(["/c","java","-jar", tojavaVo, "test.js"]);

         
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

        function posix2dos(path){
            /*
              /cygdrive/d/att -> d:\\att
             */
            var re = new RegExp(/^\/cygdrive\/(\w)/);
         
            path = path.replace(re,function(match,drive){
                //console.log(drive);
                return drive+":";
            }).replace(/\//g,'\\');

            return path;
        }

}

exports.ifJar = ifJar;