
define(['./jquery', './slider', './jquery.uri'], function($){
        $(function(){
            var invite = $.uri( location.href ).at('query').invite,
                myInviteCode = $('#my-invite-code');

            if( invite ){
                myInviteCode.closest('.my-invite-box').show();
                myInviteCode.html( invite );
            }

            $('#focus-wrapper').sPlayer({
                wrap : '#focus-box',
                diyTag : '.focus-item',
                prev : '#play-prev',
                next : '#play-next',
                type : 'fade',
                className : 'active',
                speed : 'slow'
            });
    });
});