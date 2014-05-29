define(['jquery',   'component/fastclick', 'component/tools'], function($, FastClick, tools){
        return function() {
            FastClick.attach(document.body);

            var title = $('.layout-header').find('h1');

            if( tools.isIos ) {
                title.css({
                    'margin' : 'auto',
                    'text-align': 'center'
                });
            }

            title.show();

        };
});