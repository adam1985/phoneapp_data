define(['jquery', 'component/tools', './initializeScroll'], function($, tools, initializeScroll){
    return function() {


        var ua = navigator.userAgent.toLowerCase(),
            downloadApk = $('.download-apk'),
            download = $('#weixin-download');

            downloadApk.on('tap', 'a', function(e){
                var href = $(this).attr('data-href');
                if( /micromessenger/i.test( ua ) ) {
                    e.preventDefault();
                    download.show();
                    document.body.scrollTop = 0;
                    setTimeout( function(){
                        if( download.is(':visible') ) {
                            download.hide();
                        }
                    }, 10 * 1000);
                } else if( href ) {
                    window.open(href, '_blank');
                }
            });

        $('#touch-copy').on('tap', function(){
            //this.select();
        });
    };
});