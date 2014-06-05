define(['jquery', 'jquery.mobile', 'component/template',
    './commonInitialize',  './commonIscroll', './generalizeInitialize', 'conf/config'],
    function($, mobile, template, commonInitialize,  commonIscroll, generalizeInitialize, config){

        $(function(){

            // 初始化公共模板
            commonInitialize();

            if( $('#generalize-page').length ) {
                generalizeInitialize();
            }

            var random = Math.floor( Math.random() * 4),
                superV = config.superList[random];

            var templateStr = template.render('my-invite-template', superV);

            $('#my-share-invite').html( templateStr );


        });

});