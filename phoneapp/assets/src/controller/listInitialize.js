define(['jquery', 'component/template',   'component/loading', './pullDownUpLoad', 'component/jquery.uri',  './getFirstPageList', './playerVideo', 'component/tools', 'conf/config'],
    function($, template, loading, pullDownUpLoad, uri, getFirstPageList, playerVideo, tools, config){

        return function( complete ){

            var category = $.uri( location.href ).at('query').category;

            var mobileLoad = loading();


            $.ajax({
                url: config.base + 'data/list/' + category + '/list-conf.js',
                dataType: 'jsonp',
                jsonpCallback : 'listConfCallBack',
                beforeSend : function() {
                    mobileLoad.show();
                },
                success : function( data) {

                    if( data ) {
                        document.title = data.title;
                        var pageIndex = data.latestPage, pageIndexArg = {
                            pageIndex : data.latestPage
                        };
                        var templateStr = template.render('lists-title-template', {
                            title : data.title
                        });

                        $('#news-lists-title').html( templateStr );

                        var dtd = getFirstPageList(pageIndexArg,  'data/list/' + category + '/', data, 'newsListsCallBack', 'news-lists-container', 'news-lists-template');

                        $.when( dtd ).done( function(){
                            mobileLoad.hide();
                            pageIndex = pageIndexArg.pageIndex;
                            playerVideo();
                            complete && complete();

                            pullDownUpLoad(function(myScroll){
                                pageIndexArg.pageIndex = data.latestPage;
                                var refDtd = getFirstPageList(pageIndexArg,  'data/list/' + category + '/', data, 'newsListsCallBack', 'news-lists-container', 'news-lists-template');
                                refDtd.done( function(){
                                    pageIndex = pageIndexArg.pageIndex;
                                    myScroll.refresh();
                                });

                            }, function(myScroll){

                                if( pageIndex > 0 ) {
                                    $.ajax({
                                        url: config.base + 'data/list/' + category + '/' + data.newsSource + pageIndex + '.js',
                                        dataType: 'jsonp',
                                        jsonpCallback : 'newsListsCallBack',
                                        success: function( data ){
                                            var newsListsContainer = $('#news-lists-container');
                                            if( data.length >>> 0) {
                                                data = tools.joinAssignSrc( data );
                                                var templateStr = template.render('news-lists-template', {
                                                    list : data
                                                });
                                                newsListsContainer.append( templateStr );
                                            }

                                            --pageIndex;

                                            if( pageIndex < 1 ) {
                                                $(document.body).data('has-list-page', false);
                                            }


                                            myScroll.refresh();
                                        }
                                    });
                                } else {
                                    $(document.body).data('has-list-page', false);
                                }

                            });

                        });
                    }

                }
            });

        };
});
