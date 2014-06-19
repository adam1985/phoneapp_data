define(['jquery', 'component/template',  'interface/ajax',
    './pullDownUpLoad',  'component/tools', 'conf/config', './interfaceCache', 'component/localStorage',
    './miniVideoEntrance', 'component/fullScreen',  'component/jquery.lazyload'],
    function($, template, ajax, pullDownUpLoad,  tools, config, interfaceCache,localStorage, miniVideoEntrance, fullScreen, lazyload){

        return function(){

            $(document.body).data('has-list-page', true);
            miniVideoEntrance().done( function(){

                var weishiData = JSON.parse(localStorage.getItem('weishi-data')),
                    layoutContent = $('.layout-content'),
                    pageSize = 5,
                    pageIndex = 0,
                    loadVideoList = function(settings){
                        settings = settings || {};
                        settings = $.extend({
                            start : pageIndex,
                            insertType : 'html',
                            callback : $.noop
                        }, settings);

                        ajax({
                            url: config.vInterface,
                            dataType: 'jsonp',
                            data : {
                                url : "weishi/timeline",
                                protocol_type : 'wbox',
                                version : '1.0',
                                client_id : config.client_id,
                                access_token : weishiData.access_token,
                                type : 1,
                                tag : '巴西最前线',
                                reqnum : pageSize,
                                start : settings.start
                            },
                            success : function( timeline ) {
                                if( timeline.errcode == 0 && timeline.data.info) {
                                    var infos = timeline.data.info, lists = [];
                                    if( timeline.data.info < pageSize ) {
                                        $(document.body).data('has-list-page', false);
                                    }
                                    $.each(infos, function(){
                                        lists.push({
                                            id : this.id,
                                            vid : this.video.vid,
                                            picurl : this.video.picurl,
                                            className : tools.isIos ? 'player-btn' : 'player-btn player-btn-animate'
                                        });
                                    });

                                    var templateStr = template.render('video-lists-template', {
                                        list : lists
                                    });

                                    $('#video-lists-container')[settings.insertType]( templateStr );

                                    //document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
                                    settings.callback(lists, infos);

                                }
                            }
                        });
                    },
                    imgLazyload = function(myScroll){
                        // 延时加载图片
                        $('.video-max-pic').lazyload({
                            container: layoutContent,
                            effect      : 'fadeIn',
                            "threshold": 200,
                            load : function(){
                                myScroll.refresh();
                            }
                        });
                    };

                loadVideoList({
                    callback : function(lists, infos){

                        var videoLists = lists;

                        pageIndex += pageSize;

                        // 上拉加载分页，下拉刷新
                        var myScroll = pullDownUpLoad(function(myScroll){
                            loadVideoList({
                                start : 0,
                                callback: function(lists){
                                    pageIndex = pageSize;
                                    videoLists = lists;
                                    imgLazyload(myScroll);
                                    myScroll.refresh();

                                }
                            });
                        }, function(myScroll){
                            loadVideoList({
                                start : pageIndex,
                                insertType : 'append',
                                callback: function(lists){
                                    videoLists = lists;
                                    pageIndex += pageSize;
                                    imgLazyload(myScroll);
                                    myScroll.refresh();

                                }
                            });
                        }, function(myScroll){
                            myScroll.refresh();
                            layoutContent.trigger('scroll');
                        });

                        layoutContent.on('mousewheel DOMMouseScroll', function(event) {
                            event.stopPropagation();
                            event.preventDefault();
                            layoutContent.trigger('scroll');
                        });

                        // 播放报数
                        var playReport = function( idinfos ) {
                            ajax({
                                url: config.vInterface,
                                dataType: 'jsonp',
                                data : {
                                    url : "weishi/playReport",
                                    protocol_type : 'wbox',
                                    qtype : 'POST',
                                    version : '1.0',
                                    client_id : config.client_id,
                                    appid : config.client_id,
                                    access_token : weishiData.access_token,
                                    idinfos : idinfos,
                                    platform : tools.isIos ?  1 : 2,
                                    imei : '3C51D696-E584-423E-A474-97C6137E7887',
                                    appversion : '百万猜球v2.0'
                                },
                                success : function( res ){
                                    if( res.errcode == 0 ){
                                        //console.log(res.data);
                                    }

                                }
                            }, true);

                        };


                        //点击播放
                        var videoListsBox = $('#video-lists-container'),
                            startPlayer = function( element, callback ) {
                                var self = element,
                                    id = self.attr('data-id'),
                                    vid = self.attr('data-vid'),
                                    index = self.attr('data-index'),
                                    videoListItem = self.closest('.video-list-item'),
                                    videoThumb = videoListItem.find('.video-thumb'),
                                    videoPlayBox = videoThumb.find('.video-play-box'),
                                    playerBtn = videoThumb.find('.player-btn'),
                                    videoElemnet = videoThumb.find('video'),
                                    videoEle = videoElemnet[0],
                                    videoLists = $('.video-element'),
                                    isLoadVideo = videoElemnet.data('is-load-video'),
                                    myPlayer = _V_(videoEle);


                                videoLists.each(function(){
                                    _V_(this).pause();
                                });

                                if( isLoadVideo ){
                                    myPlayer.play();
                                } else {
                                    interfaceCache.playerDtd(id, vid, config.client_id, weishiData.access_token).done(function(){

                                        var playerHistoryObj = $(document).data('player-history');

                                        var templateStr = template.render('video-play-template', {
                                            src : playerHistoryObj[vid]
                                        });

                                        //videoElemnet.html(templateStr);

                                        videoElemnet.attr('src', playerHistoryObj[vid][0]);

                                        videoElemnet.attr('width',tools.isIos ? 1 : videoThumb.width() );
                                        videoElemnet.attr('height',tools.isIos ? 1 : videoThumb.height() );
                                        myPlayer.width(tools.isIos ? 1 : videoThumb.width());
                                        myPlayer.height(tools.isIos ? 1 : videoThumb.height());

                                        videoPlayBox.show();

                                        if( !tools.isIos ) {
                                            self.hide();
                                        } else {
                                            //playerBtn.find('.player-icon').attr('src', 'assets/images/player_on_btn.png')
                                            playerBtn.addClass('player-btn-animate');
                                            videoPlayBox.css({
                                                position : 'absolute',
                                                left : -9999,
                                                top : -9999
                                            });
                                        }

                                        myPlayer.play();
                                        myPlayer.on("click", function(){
                                            myPlayer.play();
                                        });
                                        myPlayer.on("ended", function(){
                                            myPlayer.currentTime(0);
                                        });

                                        var video_type = infos[index].video.video_type,
                                            count = 1,
                                            source = 'tag', //世界杯 巴西最前线
                                            sContent = '5be06KW/5pyA5YmN57q/'; //5LiW55WM5p2v 5be06KW/5pyA5YmN57q/

                                        videoElemnet.on('play', function(){
                                            var idinfos = [id, video_type, count, source, sContent];
                                            playReport(idinfos.join(':'));
                                            count++;
                                        });

                                        videoElemnet.data('is-load-video', 1);

                                        callback && callback( videoElemnet );
                                    });

                                }
                            },
                            fullScreenPlayer = function( video ){
                                if(window.fullScreenApi.supportsFullScreen){
                                    window.fullScreenApi.requestFullScreen(video);
                                }
                            };

                        videoListsBox.on('click', function(e){
                            var target = $(e.target), element = target.closest('.video-thumb').find('.player-video');
                            startPlayer( element );
                        });


                        //视频全屏播放

                        videoListsBox.on('click', '.toggle-full-screen', function(){
                            var self = $(this),
                                videoElement = self.closest('.video-list-item').find('video');
                            if( videoElement.length ) {
                                fullScreenPlayer(videoElement[0]);
                            } else {
                                startPlayer( this, function(video){
                                    fullScreenPlayer(video);
                                });
                            }
                        });

                        imgLazyload(myScroll);

                    }
                });

            });

        };
});
