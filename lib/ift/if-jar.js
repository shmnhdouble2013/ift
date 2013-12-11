/**
 * 生成java vo 类
 */
var path = require('path'),
    fs = require('fs'),
    url = require('url'),
    util = require('util'),
    cwd = process.cwd();

var DEFAULT_ENCODING = 'utf-8';  



/**
 * 接口文件java vo类 渲染
 *
 * @param {Object} opt
 * @param {string} opt.dataDir 数据文件(if-data)所在目录
 * @param {Array} opt.files
 * @param {string} opt.title
 * @param {string} opt.savePath 生成的接口文档的保存路径
 * @param {string} [opt.extraHtml]
 */
function ifSync(opt) {
    var encoding = DEFAULT_ENCODING;
    var extraHtml = opt.extraHtml || '';

    //生成数据接口文件
    var dataInc = [];
    var REQ_TOKEN = 'exports.request = ';
    var RES_TOKEN = 'exports.response = ';
    var RES_ERR_TOKEN = 'exports.responseError = ';

    for (var i = 0; i < opt.files.length; ++i) {
        var dataPath = opt.files[i] + '.js';
        var dataAbsPath = path.join(opt.dataDir, dataPath);
        var data = fs.readFileSync(dataAbsPath, encoding);

        var dataFormatter = require(dataAbsPath);
        var req = dataFormatter.request;
        var cfg = dataFormatter.config || {};
        var method = cfg.method || [];
        for (var j = 0; j < method.length; j++) {
            method[j] = method[j].toUpperCase();
        }

        var isPost = !method.length || method.indexOf('POST') > -1;
        var p = '/' + dataPath.replace(/\\/g, '/').replace(/\.js$/, ''); //windows path seprator
        var url = fm('%s %s', cfg.method ? cfg.method.join(',') : 'POST', cfg.url || p);
        if (!isPost) {
            var qs = [];
            for (var q in req) if (req.hasOwnProperty(q)) {
                qs.push(fm('%s=%s', q, encodeURIComponent(req[q])));
            }
            url += (qs.length ? '?' + qs.join('&') : '');
        }

        /**
         * remove trail, add intent, remove last colon
         */
        function filter(src) {
            return src
                .replace(/^\s*|\s*$/g, '')
                //.replace(/\n/g, '\n    ')
                .replace(/\s*;$/g, '');
        }

        var end;
        end = data.indexOf(RES_TOKEN);
        var reqTxt = filter(data.substring(data.indexOf(REQ_TOKEN) + REQ_TOKEN.length, end > -1 ? end : data.length));
        end = data.indexOf(RES_ERR_TOKEN);
        var resTxt = filter(data.substring(data.indexOf(RES_TOKEN) + RES_TOKEN.length, end > -1 ? end : data.length));
        var resErrTxt = '';
        end = data.length;
        if (data.indexOf(RES_ERR_TOKEN) > -1) {
            resErrTxt = filter(data.substring(data.indexOf(RES_ERR_TOKEN) + RES_ERR_TOKEN.length, end));
        }
        var otherUrl = [];
        cfg.urlDaily && otherUrl.push(fm('* 日常: %s', cfg.urlDaily));
        cfg.urlPrepub && otherUrl.push(fm('* 预发: %s', cfg.urlPrepub));

        var template = [];
        if (cfg.template) {
            template.push('#### Template');
            template.push('');
            for (var t in cfg.template) {
                //template.push(fm('* `%s`: %s', t, cfg.template[t].toLowerCase() === 'response' ? 'Success' : 'Error'));
                template.push(fm('* `%s`: %s', t, cfg.template[t]));
            }
        }
        //console.log(req, res);

        dataInc.push(render({
            tplPath: path.join(__dirname, 'tpl/data.inc.tpl'),
            data: {
                path: p,
                name: cfg.name || '-',
                desc: cfg.desc || '',
                request: reqTxt,
                response: resTxt,
                responseError: resErrTxt,
                requestUrl: url,
                otherUrl: otherUrl.join('\n'),
                template: template.join('\n')
            },
            encoding: encoding
        }));
    }

    var DATA_TPL = path.join(__dirname, 'tpl/data.tpl');
    var content = render({
        tplPath: DATA_TPL,
        data: {
            title: opt.title,
            extraHtml: extraHtml,
            content: dataInc.join('')
        },
        encoding: encoding
    })

    fs.writeFileSync(opt.savePath_vo, content, encoding);
    console.log('[ifJar] 已生成java vo类接口文档', opt.savePath_vo);
}



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

       

	// 转换java bean文件 
	function parseJavaBean(Things){
		for (var i = Things.length - 1; i >= 0; i--) {
			var fielName = Things[i];

		};

	}
	 
	var javaVoStr = exe(["/c","java","-jar", tojavaVo, "test.js"]);


	fs.readFileSync('demo.js', 'utf-8'); 

	fs.writeFileSync('abc.js', 'abc', 'utf-8'); 



       




    // 运行 jar 文件进行转换     
	function exeJar(command){            
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

        // 读取js文件 获取相关 既定字段
        function getIndexStr(){

        }

        // 循环文件名 进行 转换处理
        function coverVo(){
            var files = getJsFiles();

            for (var i = files.length - 1; i >= 0; i--) {
                var fileName = files[i],
                    pathStr = path.join(dataDir, fileName);

                fs.readFile(fileName, function(err, data){
                    if(err){
                       throw err;  
                    }

                    JSON.stringify )和反序列(  
                    JSON.parse(data);
                });

            };
        }


        // 读取目录js文件 数组 数据
        function getJsFiles(dataDir){
            var jsfiles = [];

            fs.readdir(dataDir, function(err, files){
                var filesAry = filterFile(files),
                    length = filesAry.length;

                if(err || !length){
                    return;
                }

                return jsfiles = filesAry;
            });

            return jsfiles;
        }

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
 * 1、写入版权信息
 * 2、模板文件渲染
 * 3、替换符格式
 * 模板实例: {#keyword}
 *
 * @param {Object} opt
 * @param {string} opt.tplPath
 * @param {string} [opt.encoding]
 * @param {Object} [opt.data]
 * @returns {string}
 */
function render(opt) {
    var data = opt.data || {},
        encoding = opt.encoding || DEFAULT_ENCODING,
        tplPath = opt.tplPath;

    //版权信息
    data.ersync = data.ersync || 'Generated by ifJar';
    data.author = data.author || '水木年华double<huangjia2015@gmail.com>';
    data.date = data.date || new Date();
    data.copyright = data.copyright || 'Copyright (c) 2013 水木年华double';

    // 获取模板文件
    var source = fs.readFileSync(tplPath, encoding);

    return source.replace(/\{#(.+?)\}/g, function(match, key) {
        var replacer = data[key];

        return ('undefined' == typeof replacer ? '' : replacer);
    });
}


exports.ifJar = ifJar;

