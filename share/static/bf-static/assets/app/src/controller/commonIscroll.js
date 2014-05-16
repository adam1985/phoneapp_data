define(['jquery', './initializeScroll'], function($, initializeScroll){
    return function() {
            var iscroll = initializeScroll({
                onScrollStart : function(){
                    iscroll.refresh();
                }
            });
    };
});