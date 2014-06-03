define(['jquery', 'component/tools', 'conf/config', './interfaceCache'],
    function($, tools, config, interfaceCache){
        return function(){
            var dtd = $.Deferred();  //在函数内部，新建一个Deferred对象
            var confDtd = interfaceCache.confDtd();
            var tagsDtd = interfaceCache.tagsDtd(),
                weishiData = localStorage.getItem('weishi-data');

            if( !weishiData ) {
                $.when(confDtd, tagsDtd).done( function(){
                    var weishiConf = JSON.parse(localStorage.getItem('weishiConf')),
                        access_token = $.cookie('access_token'),
                        totalTags = JSON.parse(localStorage.getItem('total-tags')),
                        data = {
                            title : weishiConf.title,
                            src : 'video.html',
                            imgSrc : weishiConf.imgSrc,
                            info : weishiConf.info,
                            position : weishiConf.position
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