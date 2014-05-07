define( ['jquery',  'component/iscroll',  'component/tools'],
    function($, iScroll, tools){

    var iscroll;

    return function( config ) {
        var setTouchScroll = function() {

            var layoutContent = $('.layout-content')[0];

            config = config || {};
            config = $.extend({
                scrollbarClass: 'myScrollbar',
                useTransition: false,
                hideScrollbar: true
            }, config);

            if( iscroll ) {
                iscroll.refresh();
            } else {
                iscroll = new iScroll(layoutContent, config);
            }

            setTimeout(function () { layoutContent.style.left = '0'; }, 800);

            document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

            return iscroll;
        };

        $(window).on('orientationchange, resize', setTouchScroll);

        return setTouchScroll();
    };

});