/**
 * 数据接口
 *
 * @author luics (guidao)
 * @version 1.0.0
 * @date 5/20/13 5:22 PM
 */

/**
 * 兼容node和browser环境
 */
if (typeof exports === 'undefined') {
    exports = {};
}

exports.config = {
    "name": "这是接口名",
    "desc": "这是接口的详细描述"
};

exports.request = {
    "id": "1000"   // 查询字段 
};

exports.response = {
    "success": true,
    "model": {
        "title": "abc",
        "list": [// 列表数据
            {// 单条记录
                "id": "1000",
                "name": "name-123"
            }
        ]
    }
};

exports.responseError = {
    "success": false,
    "model": {
        "error": "Error message"
    }
};

