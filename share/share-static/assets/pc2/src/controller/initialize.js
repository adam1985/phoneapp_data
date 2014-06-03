define(['jquery', 'component/template', 'component/tools', 'component/jquery.uri' , 'conf/config'],
    function($, template, tools, uri, config){
        $(function(){
            var stmp = $.uri( location.href ).at('query').stmp,
                picPath = 'http://static.worldcup.baofeng.com/share/static/images/',
                stmps = stmp.split(/\|/),
                len = stmps.length,
                picSrc = stmps[0],
                user = stmps[1],
                joinPicPath = picPath + stmps[len-1] + '/' + picSrc + '.jpg',
                topStr = picSrc.substr(picSrc.length-2,2) + picSrc.substr(picSrc.length-4,2),
                topArr = topStr.split(''),
                topObj = {},
                random = Math.ceil(3 * Math.random());
                $.each(topArr, function(index, val){
                    topObj['top' + ( index + 1 ) ] = tools.tidToTeam(val);
                });

            var shareText = template.render('share-text-template' + random, topObj);

            var myShareTeamplate = template.render('my-share-template', {
                shareTxt : shareText,
                sharePic : joinPicPath,
                user : user
            });

            $('#my-share-detail').html(myShareTeamplate);
            $('#my-invite-code').html(stmps[2]);

        });
});