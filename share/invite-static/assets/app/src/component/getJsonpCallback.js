define(function(){
    /**
     * 获取正在执行script对象
     * @returns {element}
     */
    var getCurScript = function() {
        if(document.currentScript) {
            return document.currentScript;
        }
        var head = document.getElementsByTagName('head')[0],
            nodes = head.getElementsByTagName('script'),
            currentScript;
        nodes = this.makeArray( nodes );
        for(var i = 0, len = nodes.length; i < len; i++ ) {
            var node = nodes[i];

            if( node.readyState === 'interactive') {
                currentScript = node;
            }
        }

        return currentScript;
    };

    /**
     * 获取jsonp callback参数
     * @param {string} callback
     * @see http://www.cnblogs.com/rubylouvre/archive/2013/01/23/2872618.html
     * @returns {string}
     */
    return function ( callback ) {
        callback = callback || 'callback';
        var currentScript = getCurScript(),
            stack,
            src,
            callbackVal,
            callbackExp = new RegExp(callback + '=(\\w+)');
        if( currentScript ) {
            src = currentScript.src;
        } else {
            try {
                a.b.c(); // 强制报错,以便捕获e.stack
            } catch(e) { // safari的错误对象只有line,sourceId,sourceURL
                stack = e.stack;
                if(!stack && window.opera){
                    //opera 9没有e.stack,但有e.Backtrace,但不能直接取得,需要对e对象转字符串进行抽取
                    stack = (String(e).match(/of linked script \S+/g) || []).join(' ');
                }
            }
            if(stack) {
                /**e.stack最后一行在所有支持的浏览器大致如下:
                 *chrome23:
                 * at http://113.93.50.63/data.js:4:1
                 *firefox17:
                 *@http://113.93.50.63/query.js:4
                 *opera12:
                 *@http://113.93.50.63/data.js:4
                 *IE10:
                 *  at Global code (http://113.93.50.63/data.js:4:1)
                 */
                stack = stack.split( /[@ ]/g).pop();//取得最后一行,最后一个空格或@之后的部分
                stack = stack[0] == '(' ? stack.slice(1,-1) : stack;
                src = stack.replace(/(:\d+)?:\d+$/i, ''); //去掉行号与或许存在的出错字符起始位置
            }
        }

        if( callbackExp.test(src) ) {
            callbackVal = callbackExp.exec(src)[1];
        }

        if( !callbackVal ) {
            if( currentScript ) {
                callbackVal = currentScript.id.replace(/^id_/, '');
            } else {
                var head = document.getElementsByTagName('head')[0],
                    scripts = head.getElementsByTagName('script');
                scripts = this.makeArray( scripts );
                this.each( scripts, function () {
                    if( this.src === src ) {
                        currentScript = this;
                        return false;
                    }
                });

                if( currentScript ) {
                    callbackVal = currentScript.id.replace(/^id_/, '');
                } else {
                    callbackVal = document.documentElement.getAttribute('data-callback');
                }

            }

        }

        return callbackVal;
    };

});
