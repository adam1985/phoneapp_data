define(['jquery', 'component/tools', 'conf/config', 'interface/ajax',  'component/localStorage',  'component/jquery.cookie'],
    function($, tools, config, ajax, localStorage){

        var confDtd = function() {
            var dtd = $.Deferred();  //在函数内部，新建一个Deferred对象

            var weishiConf = localStorage.getItem('weishiConf');

            if( !weishiConf ) {
                ajax({
                    url: config.vConf + 'weishi-conf.js',
                    dataType: 'jsonp',
                    jsonpCallback : 'weishiConfCallback',
                    success: function( conf ){
                        localStorage.setItem('weishiConf', JSON.stringify(conf));
                        dtd.resolve(); // 改变Deferred对象的执行状态
                    }
                });
            } else {
                dtd.resolve(); // 改变Deferred对象的执行状态
            }
            return dtd.promise(); // 返回promise对象
        };

        var tokenDtd = function(){
            var dtd = $.Deferred();  //在函数内部，新建一个Deferred对象
            var access_token = $.cookie('access_token');
            if( !access_token ) {
                ajax({
                    url: config.vInterface,
                    dataType: 'jsonp',
                    data : {
                        url : "auth/token",
                        response_type : 'code',
                        client_id : config.client_id,
                        client_secret : config.client_secret
                    },
                    success: function( token ){
                        if( token.ret == 0 ) {
                            var expires = new Date();
                            expires.setTime(+expires + config.timeout * 60 * 1000);

                            $.cookie('access_token', token.data.access_token, {
                                expires : expires,
                                domain : '.baofeng.net'
                            });
                            dtd.resolve(); // 改变Deferred对象的执行状态
                        }
                    }
                });
            } else {
                dtd.resolve(); // 改变Deferred对象的执行状态
            }
            return dtd.promise(); // 返回promise对象
        };

        var tagsDtd = function(){
            var dtd = $.Deferred();  //在函数内部，新建一个Deferred对象
            var totalTags = localStorage.getItem('total-tags');
            if( !totalTags ) {
                tokenDtd().done(function(){
                    var access_token = $.cookie('access_token');
                    ajax({
                        url: config.vInterface,
                        dataType: 'jsonp',
                        data : {
                            url : "weishi/tags",
                            protocol_type : 'wbox',
                            version : '1.0',
                            client_id : config.client_id,
                            access_token : access_token
                        },
                        success: function( tags ){
                            //console.log(tags);
                            if( tags.ret == 0 ) {
                                localStorage.setItem('total-tags', JSON.stringify(tags.data.info));
                                dtd.resolve(); // 改变Deferred对象的执行状态
                            }
                        }
                    });
                });
            } else {
                dtd.resolve(); // 改变Deferred对象的执行状态
            }
            return dtd.promise(); // 返回promise对象
        };

        var playerDtd = function(id ,vid, client_id, access_token) {
            var dtd = $.Deferred();  //在函数内部，新建一个Deferred对象

            var doc = $(document), playerHistorySave = doc.data('player-history-cookie'),
                playerHistorySaveObj = {};

            if( playerHistorySave ) {
                playerHistorySaveObj = JSON.parse(playerHistorySave);
            }

            var playerHistory = doc.data('player-history'),
                playerHistoryObj = {};

            if( playerHistory ){
                playerHistoryObj = JSON.parse(playerHistory);
            }


            if( !playerHistorySave || !playerHistorySaveObj[vid] || !playerHistory || !playerHistoryObj[vid] ) {

                ajax({
                    url: config.vInterface,
                    dataType: 'jsonp',
                    data : {
                        url : "weishi/getvideourl",
                        protocol_type : 'wbox',
                        version : '1.0',
                        client_id : client_id,
                        access_token : access_token,
                        id : id,
                        vid : vid,
                        device : 'android phone-3',
                        play : 'HTML5-1',
                        fmt : 'mp4'
                    },
                    success: function( res ){
                        if( res.ret == 0 ) {
                            var url = [];

                            $.each(res.data.url, function(i, v){
                                url.push( v );
                            });

                            playerHistoryObj[vid] = url;
                            playerHistorySaveObj[vid] = 1;
                            doc.data('player-history', JSON.stringify(playerHistoryObj));

                            doc.data('player-history-cookie', JSON.stringify(playerHistorySaveObj));

                        }
                        dtd.resolve(); // 改变Deferred对象的执行状态
                    }
                });
            } else {
                dtd.resolve(); // 改变Deferred对象的执行状态
            }

            return dtd.promise(); // 返回promise对象

        };

        return {
            confDtd : confDtd,
            tokenDtd : tokenDtd,
            tagsDtd : tagsDtd,
            playerDtd : playerDtd
        };
    }
);