define(['jquery', './initializeScroll'], function($, initializeScroll){

    return function() {

            var iscroll = initializeScroll({
                onScrollStart : function(){
                    iscroll.refresh();
                }
            });

            var setOffsetTop = function( obj ) {
                var top = obj.getBoundingClientRect().top + $(obj).height(),
                    se = document.documentElement.clientHeight,
                    offsetTop = top - se ;
                if( offsetTop > 0 ) {
                    iscroll.scrollTo(0, iscroll.y - offsetTop);
                }
            };


            var qaTitle = $('.qa-title'), timeout1, timeout2;
            qaTitle.on('tap', function(){
                var $this = $(this),
                    self = this,
                    qaList = $this.next('.qa-list'),
                    isShow = qaList.is(':visible'),
                    toggleSlide = $this.find('a');

                if( timeout1 ){
                    clearTimeout( timeout1 );
                    clearTimeout( timeout1 );
                    timeout1 = null;
                } else {
                    timeout1 = setTimeout( function(){
                        qaList.slideToggle(function(){
                            iscroll.refresh();
                            setOffsetTop(self);
                            clearTimeout( timeout1 );
                            timeout1 = null;
                        });

                        toggleSlide[0].className = isShow ? 'toggle-slide-down' : 'toggle-slide-up';
                    }, 200);
                }

            });

            $('.qa-item').on('tap', 'a', function(e){
                e.stopPropagation();
                var $this = $(this);
                if( timeout2 ){
                    clearTimeout( timeout2 );
                    timeout2 = null;
                } else {
                    timeout2 = setTimeout( function(){
                        $this.next('.qa-answer').slideToggle( function(){
                            iscroll.refresh();
                            setOffsetTop(this);
                            clearTimeout( timeout2 );
                            timeout2 = null;
                        });
                    }, 200);
                }

            });


    };

});