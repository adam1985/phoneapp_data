define(['jquery', 'component/template', 'component/tools', 'component/jquery.uri' , 'conf/config'],
    function($, template, tools, uri, config){
        $(function(){
            var invite = $.uri( location.href ).at('query').invite,
                myInviteCode = $('#my-invite-code');

            if( invite ){
                myInviteCode.closest('.my-invite-box').show();
                myInviteCode.html( invite );
            }

            var random = Math.floor( Math.random() * 4),
                superV = config.superList[random];

            var templateStr = template.render('my-invite-template', superV);

            $('#my-share-invite').html( templateStr );


        });
});