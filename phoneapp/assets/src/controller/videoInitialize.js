define(['jquery', 'component/template',   'component/loading', './pullDownUpLoad',  'component/tools', 'conf/config'],
    function($, template, loading, pullDownUpLoad,  tools, config){

        return function(){

            var mobileLoad = loading();

            $(document.body).data('has-list-page', true);

            pullDownUpLoad();

        };
});
