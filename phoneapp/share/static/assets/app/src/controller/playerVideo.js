define(['jquery'], function($){
        return function(){
                var layoutContent = $('.layout-content'),
                    isAndroid = (/android/gi).test(navigator.appVersion),
                    isIos = (/iphone|ipad/gi).test(navigator.appVersion);

            layoutContent.on('tap', 'a', function(e){
                var $this = $(this),
                    isAppInstall = false,
                    assignTypeStr = $this.attr('data-params'),
                    assignType = {};
                    if( assignTypeStr ) {
                        assignType = JSON.parse( assignTypeStr );
                    }

                    if( assignType.type === 'video' ) {
                        e.preventDefault();

                        if ( isAndroid ) {

                            try{
                                isAppInstall = window.worldcup.isAppInstall();
                            }catch(e){
                                isAppInstall = false;
                            }

                            if( isAppInstall ) {
                                try{
                                    window.worldcup.onVideoDetected( assignType.mainUrl );
                                }catch(e){
                                    window.open( assignType.backUrl, '_blank');
                                }
                            } else {
                                window.open( assignType.backUrl, '_blank');
                            }
                        }

                        if( isIos ) {

                            var baseUrl = 'http://worldcup.hotnews/?info=';
                            // http://storm.baofeng.net/?c=
                            window.open( baseUrl + assignTypeStr , '_blank');

                        }

                    } else if ( assignType.type === 'article' ) {
                        location.href = assignType.src;
                    }
            });

        };
});