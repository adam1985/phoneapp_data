define(['jquery', 'jquery.mobile',  'component/template', 'component/touchslider',
    'component/superMarquee', './pullDownUpLoad', './playerVideo', 'component/tools', 'conf/config'],
    function($, mobile, template, TouchSlider, superMarquee, pullDownUpLoad, playerVideo, tools, config){

        return function( complete ){

            $.ajax({
                url: config.base + 'data/index/index-conf.js',
                dataType: 'jsonp',
                jsonpCallback : 'indexConfCallBack',
                beforeSend : function() {
                    $.mobile.loading('show');
                },
                success: function( data ){
                    if( data ) {
                        var pageIndex = data.latestPage;
                        var bannerDtd = $.ajax({
                                url: config.base + 'data/index/' + data.bannerSource,
                                dataType: 'jsonp',
                                jsonpCallback : 'bannerConfCallBack',
                                success: function( data ){
                                    var layoutBanner = $('#layout-banner-box');
                                    if( data.length >>> 0) {
                                        var templateStr = template.render('banner-template', {
                                            list : tools.subToArray(data, 5, true),
                                            isShow : !sessionStorage.getItem('is-hide-banner')
                                        });
                                        layoutBanner.html( templateStr );
                                    } else {
                                        layoutBanner.hide();
                                    }
                                }
                            }),

                            focusDtd = $.ajax({
                                url: config.base + 'data/index/' + data.focusSource,
                                dataType: 'jsonp',
                                jsonpCallback : 'focusConfCallBack',
                                success: function( data ){
                                    var focusPicture = $('#focus-picture');
                                    if( data.length >>> 0) {
                                        data = tools.joinAssignSrc( data );
                                        var templateStr = template.render('focus-template', {
                                            list : tools.subToArray(data, 6, true)
                                        });
                                        focusPicture.html( templateStr );
                                    } else {
                                        focusPicture.hide();
                                    }
                                }
                            }),

                            newsDtd = $.ajax({
                                url: config.base + 'data/index/' + data.newsSource + data.latestPage + '.js',
                                dataType: 'jsonp',
                                jsonpCallback : 'newsListCallBack',
                                success: function( data ){
                                    var newsListContainer = $('#news-list-container');
                                    if( data.length >>> 0) {
                                        data = tools.joinAssignSrc( data );
                                        var templateStr = template.render('hot-news-template', {
                                            list : data
                                        });
                                        newsListContainer.html( templateStr );
                                    } else {
                                        newsListContainer.hide();
                                    }
                                }
                            });



                        $.when(bannerDtd, focusDtd, newsDtd).done(function(){

                            $.mobile.loading('hide');

                            var renderBanner = function(){
                                var dtd = $.Deferred();  //在函数内部，新建一个Deferred对象
                                var isShow = !sessionStorage.getItem('is-hide-banner'),
                                    layoutBannerBox = $('.layout-banner-box');

                                // 展现品牌露出

                                if( isShow ) {
                                    layoutBannerBox.slideDown('slow', function(){
                                        dtd.resolve(); // 改变Deferred对象的执行状态
                                    });
                                } else {
                                    dtd.resolve();
                                }

                                var closeBanner = $('.close-banner');

                                // 关闭品牌露出
                                closeBanner.on('click', function(){
                                    sessionStorage.setItem('is-hide-banner', true);
                                    layoutBannerBox.slideUp('slow');
                                });

                                // 品牌露出无缝滚动
                                $('.layout-banner').superMarquee({
                                    isEqual: true,
                                    distance: 30,
                                    time: 10,
                                    direction: 'up'
                                });

                                return dtd.promise(); // 返回promise对象
                            };


                            // 设置焦点图播放
                            TouchSlider('focus-picture-box',{
                                auto: true,
                                speed: 300,
                                timeout: 5000,
                                before: function(index){
                                    $('#focus-picture-buttons').find('a').removeClass('on').eq( index ).addClass('on');
                                    $('#focus-picture-titles').find('a').removeClass('on').eq( index ).addClass('on');
                                }
                            });

                            playerVideo();

                            complete && complete();

                            $.when(renderBanner()).done(function(){
                                var focusPictrue = $('#focus-picture'),
                                    firstFocusImgs = $('#focus-picture-box').find('img');
                                var myScroll = pullDownUpLoad(function(myScroll){
                                    $.ajax({
                                        url: config.base + 'data/index/' + data.newsSource + data.latestPage + '.js',
                                        dataType: 'jsonp',
                                        jsonpCallback : 'newsListCallBack',
                                        success: function( res ){
                                            pageIndex = data.latestPage;
                                            var newsListContainer = $('#news-list-container');
                                            if( res.length >>> 0) {
                                                res = tools.joinAssignSrc( res );
                                                var templateStr = template.render('hot-news-template', {
                                                    list : res
                                                });
                                                newsListContainer.html( templateStr );
                                            }

                                            myScroll.refresh();
                                        }
                                    });
                                }, function(myScroll){
                                    --pageIndex;
                                    if( pageIndex > 0 ) {
                                        $.ajax({
                                            url: config.base + 'data/index/' + data.newsSource + pageIndex + '.js',
                                            dataType: 'jsonp',
                                            jsonpCallback : 'newsListCallBack',
                                            success: function( data ){
                                                var newsListContainer = $('#news-list-container');
                                                if( data.length >>> 0) {
                                                    data = tools.joinAssignSrc( data );
                                                    var templateStr = template.render('hot-news-template', {
                                                        list : data
                                                    });
                                                    newsListContainer.append( templateStr );
                                                }

                                                myScroll.refresh();
                                            }
                                        });
                                        return pageIndex > 1 ;
                                    }
                                    return false;
                                });


                                firstFocusImgs.on('load', function() {
                                    focusPictrue.height( 'auto' );
                                    myScroll.refresh();
                                });


                                $(document).on('touchstart', function(){
                                    myScroll.refresh();
                                });



                            });

                        });
                    }
                }
            });

        };
});