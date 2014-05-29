define(['jquery', 'component/tools', 'conf/config'],
    function($, tools, config){
        return function(){
            $.ajax({
                url: config.vConf + 'weishi-conf.js',
                dataType: 'jsonp',
                jsonpCallback : 'weishiConfCallback',
                success: function( conf ){
                    $.ajax({
                        url: config.vInterface + 'interface',
                        dataType: 'jsonp',
                        data : {
                            url : "https://open.t.qq.com/api/auth/token",
                            response_type : 'code',
                            client_id : config.client_id,
                            client_secret : config.client_secret
                        },
                        success: function( token ){
                            $.ajax({
                                url: config.vInterface + 'interface',
                                dataType: 'jsonp',
                                data : {
                                    url : "https://open.t.qq.com/api/weishi/tags",
                                    protocol_type : 'wbox',
                                    version : '1.0',
                                    client_id : config.client_id,
                                    access_token : token.data.access_token
                                },
                                success: function( tags ){
                                    console.log(tags);
                                }
                            });
                        }
                    });
                }

            });
        };
    }
);