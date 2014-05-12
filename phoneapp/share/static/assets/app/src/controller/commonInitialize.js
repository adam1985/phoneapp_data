define(['jquery',   'component/fastclick'], function($, FastClick){
        return function() {
            FastClick.attach(document.body);
        };
});