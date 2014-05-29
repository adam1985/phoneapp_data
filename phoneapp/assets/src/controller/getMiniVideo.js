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
                                    url : "https://open.t.qq.com/api/weishi/getvideourl",
                                    protocol_type : 'wbox',
                                    version : '1.0',
                                    client_id : config.client_id,
                                    access_token : token.data.access_token,
                                    id : 2005523057019372,
                                    vid : '1008_7db34308c718412bbe69dbb7f1eb7f4b',
                                    device : 'android phone-3',
                                    play : 'HTML5-1',
                                    fmt : 'mp4'
                                },
                                success: function( timeline ){
                                    console.log(timeline);
                                }
                            });
                        }
                    });
                }

            });
        };
    }
);