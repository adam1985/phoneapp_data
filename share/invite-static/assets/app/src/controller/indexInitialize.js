define(['jquery',  'component/template', 'component/jquery.swiper', 'component/loading',
    'component/superMarquee', './pullDownUpLoad', './playerVideo', 'component/tools', 'conf/config'],
    function($, template, Swiper, loading, superMarquee, pullDownUpLoad, playerVideo, tools, config){

        return function( complete ){
            var mobileLoad = loading();

            $.ajax({
                url: config.base + 'data/index/index-conf.js',
                dataType: 'jsonp',
                jsonpCallback : 'indexConfCallBack',
                beforeSend : function() {
                    mobileLoad.show();
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
                                        sessionStorage.setItem('is-hide-banner', true);

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

                            mobileLoad.hide();

                            var renderBanner = function(){
                                var dtd = $.Deferred();  //在函数内部，新建一个Deferred对象
                                var isShow = !sessionStorage.getItem('is-hide-banner'),
                                    layoutBannerBox = $('.layout-banner-box');

                                // 展现品牌露出

                                if( isShow ) {
                                    layoutBannerBox.slideDown('slow', function(){
                                        // 品牌露出无缝滚动
                                        $('.layout-banner').superMarquee({
                                            isEqual: true,
                                            distance: 30,
                                            time: 10,
                                            direction: 'up'
                                        });

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



                                return dtd.promise(); // 返回promise对象
                            };




                            var focusPictureButtons = $('#focus-picture-buttons').find('a'),
                                foucsPicTureTitles = $('#focus-picture-titles').find('a');

                            // 设置焦点图播放
                            /*TouchSlider('focus-picture-box', {
                                auto: true,
                                speed: 300,
                                timeout: 5000,
                                before: function (index) {
                                    focusPictureButtons.removeClass('on').eq(index).addClass('on');
                                    foucsPicTureTitles.find('a').removeClass('on').eq(index).addClass('on');
                                }
                            });*/

                            $('.swiper-container').swiper({
                                mode:'horizontal',
                                loop: true,
                                autoplay: 5000,
                                onSlideChangeStart : function( swiper) {
                                    var length = swiper.slides.length - 2,
                                        activeIndex = swiper.activeIndex - 2,
                                        nextIndex = activeIndex + 1;

                                    if( nextIndex > length - 1 ) {
                                        nextIndex = 0;
                                    }

                                    focusPictureButtons.removeClass('on').eq( nextIndex ).addClass('on');
                                    foucsPicTureTitles.removeClass('on').eq( nextIndex ).addClass('on');


                                }
                            });

                            /*$('.focus-picture-box').touchSlider({
                                flexible : true,
                                speed : 200,
                                paging : focusPictureButtons,
                                listSelector : '.focus-picture-list',
                                counter : function (e) {
                                    focusPictureButtons.removeClass('on').eq( e.current - 1 ).addClass('on');
                                    foucsPicTureTitles.removeClass('on').eq( e.current - 1 ).addClass('on');
                                }
                            });*/


                            playerVideo();

                            complete && complete();

                            $.when(renderBanner()).done(function(){
                                var focusPictrue = $('#focus-picture'),
                                    firstFocusImgs = $('#focus-picture-box').find('img'),
                                    picWidth = 640, deviceWidth = document.documentElement.clientWidth,
                                    picHeight = ( deviceWidth / picWidth ) * 328;
                                    //    focusPictrue.height( picHeight );
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
                                    //focusPictrue.height( 'auto' );
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