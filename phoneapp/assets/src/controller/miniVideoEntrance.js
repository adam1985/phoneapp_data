define(['jquery', 'component/tools', 'conf/config', './interfaceCache', 'component/localStorage'],
    function($, tools, config, interfaceCache, localStorage){
        return function(){
            var dtd = $.Deferred();  //在函数内部，新建一个Deferred对象
            var confDtd = interfaceCache.confDtd();
            var tokenDtd = interfaceCache.tokenDtd(),
                weishiData = localStorage.getItem('weishi-data'),
                access_token = $.cookie('access_token');
            if( !weishiData || !access_token ) {

                $.when(confDtd, tokenDtd).done( function(){
                    var weishiConf = JSON.parse(localStorage.getItem('weishiConf')),
                        access_token = $.cookie('access_token'),
                        data = {
                            title : weishiConf.title,
                            src : 'video.html',
                            imgSrc : weishiConf.imgSrc,
                            info : weishiConf.info,
                            position : weishiConf.position,
                            access_token : access_token
                        };

                    localStorage.setItem('weishi-data', JSON.stringify(data));

                    dtd.resolve(); // 改变Deferred对象的执行状态
                });
            } else {
                dtd.resolve(); // 改变Deferred对象的执行状态
            }

            return dtd.promise(); // 返回promise对象
        };
    }
);