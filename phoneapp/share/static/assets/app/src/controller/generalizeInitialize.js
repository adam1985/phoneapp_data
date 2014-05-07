define(['jquery', 'component/tools', './initializeScroll'], function($, tools, initializeScroll){
    return function() {

        var config = {
            onScrollStart : function(){
                iscroll.refresh();
            }
        };

        if( !tools.isPc ) {

            config = $.extend( config, {
                onBeforeScrollStart : function(e){
                    if( e.target.nodeName.id !== 'touch-copy' ){
                        e.preventDefault();
                    }

                }
            })
        }

        var iscroll = initializeScroll( config );


        var ua = navigator.userAgent.toLowerCase(),
            downloadApk = $('.download-apk'),
            download = $('#weixin-download');
            if( /micromessenger/i.test( ua ) ) {
                downloadApk.on('tap', 'a', function(e){
                    e.preventDefault();
                    download.show();
                    iscroll.scrollTo(0, 0);
                    setTimeout( function(){
                        if( download.is(':visible') ) {
                            download.hide();
                        }
                    }, 10 * 1000);
                });
            }

        $('#touch-copy').on('tap', function(){
            //this.select();
        });
    };
});