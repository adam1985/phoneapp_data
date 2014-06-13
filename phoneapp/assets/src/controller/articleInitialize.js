define(['jquery', 'component/template',  'component/loading',  './initializeScroll',
    'component/jquery.lazyload', 'component/jquery.uri', 'conf/config'],
    function($, template, loading, initializeScroll, lazyload, uri, config){
        return function( complete ){

            var aid = $.uri( location.href ).at('query').aid;

            var mobileLoad = loading();

            $.ajax({
                url: config.base + 'data/article/' + aid + '.js',
                dataType: 'jsonp',
                jsonpCallback : 'articleCallBack',
                beforeSend : function() {
                    mobileLoad.show();
                },
                success: function( data ){
                    mobileLoad.hide();
                    var layoutArticle = $('#layout-article');
                    if( data ) {
                        var templateStr = template.render('article-template', data);
                        layoutArticle.html( templateStr );
                    } else {
                        layoutArticle.hide();
                    }

                    complete && complete();

                    var layoutContent = $('.layout-content');

                    var iscroll = initializeScroll({
                        zoom: true,
                        scrollX: true,
                        scrollY: true,
                        mouseWheel: true,
                        wheelAction: 'zoom',
                        onBeforeScrollMove : function(){
                            layoutContent.trigger('scroll');
                        },
                        onScrollStart : function(){
                            iscroll.refresh();
                            layoutContent.trigger('scroll');
                        },
                        onScrollMove : function(){
                            iscroll.refresh();
                            layoutContent.trigger('scroll');
                        }
                    });

                    layoutArticle.find('img').lazyload({
                        container: layoutContent,
                        effect      : 'fadeIn',
                        "threshold": 200,
                        load : function(){
                            iscroll.refresh();
                        }
                    });


                    $(document).on('touchstart', function(){
                        iscroll.refresh();
                    });

                },
                error : function(){
                    alert('文章数据格式可能有误，请检查文章内容中换行是否加了\\换行符!');
                }
            });

            // 返回上一页
            /*$('.layout-goback-icon').on('tap', function(e){
                e.preventDefault();
                history.go(-1);
                return false;
            });*/

        };

});