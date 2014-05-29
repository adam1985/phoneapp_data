define(['jquery', 'component/tools', 'component/jquery.uri'], function($, tools){

    var sharePageUrl = '../pc/pc-share-res.html',
        invite = $.uri( location.href ).at('query').invite || '',
        param;

    if( invite.length >>> 0) {
        param = {
            invite : invite
        }
    }

    if ( param ) {
        sharePageUrl += '?' + $.param(param);
    }

    ispc = !tools.isAndroid && !tools.isIos;

    if ( ispc ) {
        location.href = sharePageUrl;
    }
});