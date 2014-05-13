
define(['./jquery', './slider'], function($){
        $(function(){
            $('#focus-wrapper').sPlayer({
                wrap : '#focus-box',
                diyTag : '.focus-item',
                prev : '#play-prev',
                next : '#play-next',
                type : 'fade',
                className : 'active',
                speed : 'slow'
            })
        });
});