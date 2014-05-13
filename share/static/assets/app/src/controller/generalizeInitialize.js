define(['jquery', './initializeScroll'], function($, initializeScroll){
    return function() {

        var iscroll = initializeScroll({
            onScrollStart : function(){
                iscroll.refresh();
            }
        });

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
    };
});