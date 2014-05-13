define( ['jquery',  'component/iscroll',  'component/tools'],
    function($, iScroll, tools){

    var myScroll,
        pullDownEl, pullDownOffset,
        pullUpEl, pullUpOffset,
        generatedCount = 0;

    return function( pullDownAction, pullUpAction) {

        //设置滚动条
        var setTouchScroll = function() {

            pullDownEl = document.getElementById('pullDown');

            pullUpEl = document.getElementById('pullUp');
            pullDownEl.style.display = 'block';
            pullUpEl.style.display = 'block';
            pullDownOffset = pullDownEl.offsetHeight;
            pullUpOffset = pullUpEl.offsetHeight;

            var layoutContent = $('.layout-content')[0], isVaildDate = true;

            if( myScroll ) {
                myScroll.refresh();
            } else {
                myScroll = new iScroll(layoutContent, {
                    useTransition: false,
                    topOffset: pullDownOffset,
                    hideScrollbar: true,
                    scrollbarClass: 'myScrollbar',
                    onRefresh: function () {
                        if (pullDownEl.className.match('loading')) {
                            pullDownEl.className = '';
                            pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
                            pullUpEl.querySelector('.pullUpIcon').style.display = 'block';
                            pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                            isVaildDate = true;
                        } else if (pullUpEl.className.match('loading')) {
                            pullUpEl.className = '';
                            pullUpEl.querySelector('.pullUpIcon').style.display = isVaildDate ? 'block' :  'none';
                            pullUpEl.querySelector('.pullUpLabel').innerHTML =
                                isVaildDate ? '上拉加载更多...' : '亲，已经没有了哦';
                        }
                    },
                    onScrollMove: function () {

                        if (this.y > 5 && !pullDownEl.className.match('flip')) {
                            pullDownEl.className = 'flip';
                            pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
                            this.minScrollY = 0;
                        } else if (this.y < 5 && pullDownEl.className.match('flip')) {
                            pullDownEl.className = '';
                            pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
                            this.minScrollY = -pullDownOffset;
                        } else if (isVaildDate && this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                            pullUpEl.className = 'flip';
                            pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
                        } else if (isVaildDate && this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                            pullUpEl.className = '';
                            pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                            this.maxScrollY = pullUpOffset;
                        }
                    },
                    onScrollEnd: function () {
                        if (pullDownEl.className.match('flip')) {
                            pullDownEl.className = 'loading';
                            pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
                            pullDownAction && pullDownAction( myScroll);
                        } else if (isVaildDate && pullUpEl.className.match('flip')) {
                            pullUpEl.className = 'loading';
                            pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
                            if ( pullUpAction ) {
                                isVaildDate = pullUpAction( myScroll );
                            }

                        }
                    }
                });
            }

            setTimeout(function () { layoutContent.style.left = '0'; }, 800);


            document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

            return myScroll;
        };


        $(window).on('orientationchange, resize', setTouchScroll);

        return setTouchScroll();


    };
});