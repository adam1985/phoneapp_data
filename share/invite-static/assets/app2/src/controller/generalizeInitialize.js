define(['jquery', 'component/tools', 'component/jquery.uri'], function($, tools){
    return function() {


        var ua = navigator.userAgent.toLowerCase(),
            downloadApk = $('.download-apk'),
            download = $('#weixin-download'),
            invite = $.uri( location.href ).at('query').invite,
            myInviteCode = $('#my-invite-code');

            if( invite ){
                myInviteCode.closest('.invite-number').show();
                myInviteCode.html( invite );
            }

            downloadApk.on('tap', 'a', function(e){
                var href = $(this).attr('data-href');
                if( /micromessenger/i.test( ua ) ) {
                    e.preventDefault();
                    download.show();
                    document.documentElement.scrollTop = 0;
                    setTimeout( function(){
                        if( download.is(':visible') ) {
                            download.hide();
                        }
                    }, 10 * 1000);
                } else if( href ) {
                    window.open(href, '_blank');
                }
            });

    };
});