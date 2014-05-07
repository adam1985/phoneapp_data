define(['jquery',  'component/template', 'component/jquery.swiper', 'component/loading',
    'component/superMarquee', './pullDownUpLoad', './getFirstPageList', './playerVideo', 'component/tools', 'conf/config'],
    function($, template, Swiper, loading, superMarquee, pullDownUpLoad, getFirstPageList, playerVideo, tools, config){

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
                        var pageIndex = data.latestPage, pageIndexArg = {
                            pageIndex : data.latestPage
                        };
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

                            newsDtd = getFirstPageList(pageIndexArg, 'data/index/', data, 'newsListCallBack', 'news-list-container', 'hot-news-template');

                        $.when(bannerDtd, focusDtd, newsDtd).done(function(){
                            pageIndex = pageIndexArg.pageIndex;

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

                                // 品牌露出外跳浏览器
                                layoutBannerBox.on('tap', 'li', function(e){
                                    e.preventDefault();
                                    var src = $(this).find('a').attr('href');

                                    if( tools.isAndroid ) {
                                        try{
                                            window.worldcup.onVideoDetected( src );
                                        }catch(e){}

                                    } else if( tools.isIos ) {

                                        var data = {
                                            "type":"web",
                                            "message":"0",
                                            "mainUrl":src,
                                            "backUrl":"0"
                                        };

                                        var baseUrl = 'http://worldcup.hotnews/?info=';

                                        if( JSON ) {
                                            window.open( baseUrl + JSON.stringify(data) , '_blank');
                                        }


                                    } else {
                                        window.open( src , '_blank');
                                    }
                                });


                                return dtd.promise(); // 返回promise对象
                            };

                            playerVideo();

                            complete && complete();

                            $.when(renderBanner()).done(function(){
                                var focusPictrue = $('#focus-picture'),
                                    firstFocusImgs = $('#focus-picture-box').find('img'),
                                    picWidth = 640, deviceWidth = document.documentElement.clientWidth,
                                    picHeight = ( deviceWidth / picWidth ) * 328;
                                    //focusPictrue.height( picHeight );

                                var focusPictureButtons = $('#focus-picture-buttons').find('a'),
                                    foucsPicTureTitles = $('#focus-picture-titles').find('a');

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

                                var myScroll = pullDownUpLoad(function(myScroll){
                                    pageIndexArg.pageIndex = data.latestPage;
                                    var refDtd = getFirstPageList(pageIndexArg, 'data/index/', data, 'newsListCallBack', 'news-list-container', 'hot-news-template');

                                    refDtd.done( function(){
                                        pageIndex = pageIndexArg.pageIndex;
                                        myScroll.refresh();
                                    });

                                }, function(myScroll){
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

                                myScroll.refresh();


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