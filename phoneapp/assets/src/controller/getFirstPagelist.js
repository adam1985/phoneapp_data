define(['jquery','component/template', 'component/tools', 'conf/config', './miniVideoEntrance', 'component/localStorage'],
    function($, template, tools, config, miniVideoEntrance, localStorage ){
        return function(pageIndexArg, path, data, jsonpCallback, boxId, templateId){
            var dtd = $.Deferred();  //在函数内部，新建一个Deferred对象
            var totalRow = 0, maxRow = 6, ajaxNumber = 0,
                pageIndex = pageIndexArg.pageIndex,
                newsListContainer = $('#' + boxId);
                $(document.body).data('has-list-page', true);
            (function(){
                var arg = arguments;
                if( pageIndex > 0 ) {
                    $.ajax({
                        url: config.base + path + data.newsSource + pageIndex + '.js',
                        dataType: 'jsonp',
                        jsonpCallback : jsonpCallback,
                        success: function( data ){
                            if( data.length >>> 0) {
                                ajaxNumber++;
                                totalRow += data.length;
                                data = tools.joinAssignSrc( data );
                                var templateConf = {
                                    list : data,
                                    video : {
                                        show : false,
                                        index : -1
                                    }
                                }, templateStr, videoEntranceDtd;

                                    if( ajaxNumber > 1 ) {
                                        templateStr = template.render(templateId, templateConf);
                                        newsListContainer.append( templateStr );
                                    } else {
                                        if( $('#index-page').length) {

                                            videoEntranceDtd = miniVideoEntrance();

                                            videoEntranceDtd.done( function(){

                                                var weishiData = JSON.parse(localStorage.getItem('weishi-data'));

                                                templateConf.video = {
                                                    show : true,
                                                    title : weishiData.title,
                                                    src : weishiData.src,
                                                    imgSrc : weishiData.imgSrc,
                                                    info : weishiData.info,
                                                    index : weishiData.position
                                                };

                                                templateStr = template.render(templateId, templateConf);
                                                newsListContainer.html( templateStr );
                                            }).fail(function(){
                                                templateStr = template.render(templateId, templateConf);
                                                newsListContainer.html( templateStr );
                                            });

                                        } else {
                                            templateStr = template.render(templateId, templateConf);
                                            newsListContainer.html( templateStr );
                                        }
                                    }
                            }

                            --pageIndex;


                            if( pageIndex < 1 ) {
                                $(document.body).data('has-list-page', false);
                            }

                            if( totalRow < maxRow ) {
                                arg.callee();
                            } else {
                                pageIndexArg.pageIndex = pageIndex;
                                if( videoEntranceDtd ) {
                                    videoEntranceDtd.done(function () {
                                        dtd.resolve();
                                    }).fail(function(){
                                        dtd.resolve();
                                    });
                                } else {
                                    dtd.resolve();
                                }

                            }

                        }
                    });
                } else {
                    $(document.body).data('has-list-page', false);
                    pageIndexArg.pageIndex = pageIndex;
                    dtd.resolve(); // 改变Deferred对象的执行状态
                }

            }());

            return dtd.promise(); // 返回promise对象

        };
    }
);