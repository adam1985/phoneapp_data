define( function(){
    return function($){
        var layoutHeader = $('.layout-header:visible'),
            layoutContent = $('.layout-content:visible'),
            layoutFooter = $('.layout-footer:visible'),
            contentHeight = document.documentElement.clientHeight- layoutHeader.height() - layoutFooter.height();
        layoutContent.height(contentHeight);
    };
});