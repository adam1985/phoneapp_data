define(['jquery', 'component/template',  'interface/ajax',
    './pullDownUpLoad',  'component/tools', 'conf/config', './miniVideoEntrance'],
    function($, template, ajax, pullDownUpLoad,  tools, config, miniVideoEntrance){

        return function(){

            $(document.body).data('has-list-page', true);

            miniVideoEntrance().done( function(){

                var weishiData = JSON.parse(localStorage.getItem('weishi-data')),
                    loadVideoList = function( start, insertType, callback){
                        start = start || 0;
                        insertType = insertType || 'html';
                        ajax({
                            url: config.vInterface,
                            dataType: 'jsonp',
                            data : {
                                url : "https://open.t.qq.com/api/weishi/timeline",
                                protocol_type : 'wbox',
                                version : '1.0',
                                client_id : config.client_id,
                                access_token : weishiData.access_token,
                                type : 1,
                                tag : '体育',
                                reqnum : 5,
                                start : start
                            },
                            success : function( timeline ) {
                                if( timeline.errcode == 0 ) {
                                    var infos = timeline.data.info, lists = [];
                                    $.each(infos, function(){
                                        lists.push({
                                            id : this.id,
                                            vid : this.video.vid,
                                            picurl : this.video.picurl
                                        });
                                    });

                                    var templateStr = template.render('video-lists-template', {
                                        list : lists
                                    });

                                    $('#video-lists-container')[insertType]( templateStr );

                                }
                            }
                        }).done(function(){
                                callback && callback();
                        });
                    };

                loadVideoList(function(){
                    pullDownUpLoad(function(){
                        loadVideoList();
                    });
                });

            });



        };
});
