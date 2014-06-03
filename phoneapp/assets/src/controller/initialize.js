define(['jquery', 'jquery.mobile',  './commonInitialize',  './indexInitialize',  './listInitialize',
    './articleInitialize', './qaInitialize', './chatRoomInitialize', './videoInitialize', './commonIscroll'],
    function($, mobile, commonInitialize, indexInitialize, listInitialize,
             articleInitialize, qaInitialize, chatRoomInitialize, videoInitialize, commonIscroll){

        $(function(){

            // 初始化公共模板
            commonInitialize();

            //初始化首页模块
            if( $('#index-page').length ) {
                indexInitialize();
            }

            //初始化文章详情页模块
            if( $('#list-page').length ) {
                listInitialize();
            }

            // 初始化文章详情页模块
            if( $('#article-page').length ) {
                articleInitialize();
            }

            // 活动规则
            if( $('#qa-page').length ) {
                qaInitialize();
            }

            // 初始化聊天室
            if( $('#chat-room-page').length ) {
                chatRoomInitialize();
            }

            // 初始化微视视频
            if( $('#video-page').length ) {
                videoInitialize();
            }

            // 渲染滚动条
            if( $('.common-page').length ) {
                commonIscroll();
            }

        });

});