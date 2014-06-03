define(['jquery',  'conf/config'], function ($, config) {

    /**
     * 获取数组中后几条数据
     * @param data 待处理数据
     * @param size 几条数据
     * @param isReverse 是否反转数组
     * @returns {array}
     */
    var subToArray = function (data, size, isReverse) {
            if ($.isArray(data)) {
                if (isReverse) {
                    data.reverse();
                }
                return $.grep(data, function (n, i) {
                    return i < size;
                });
            }
            return [];
        },

        joinAssignSrc = function (data) {

            (function (data) {
                var arg = arguments;
                if ($.isArray(data)) {
                    $.each(data, function () {
                        var self = this,
                            assignType = {
                                type: 'article'
                            };
                        if (self.aid) {
                            self.src += '?aid=' + self.aid;
                            assignType = $.extend(assignType, {
                                src: self.src
                            });
                        } else if (self.player) {
                            assignType = $.extend(assignType, {
                                type: 'video',
                                message: self.title,
                                mainUrl: self.videoSrc,
                                backUrl: self.src
                            });
                        }
                        self.assignType = JSON.stringify(assignType);
                        if (self.list && $.isArray(self.list)) {
                            arg.callee(self.list);
                        }
                    });
                }

            }(data));

            return data;
        },

        // 判断浏览器是否为webkit
        isWebkit = (function () {
            var UA = navigator.userAgent.toLowerCase(), _isWebkit = false;
            if (/webkit/i.test(UA)) {
                _isWebkit = true;
            }
            return _isWebkit;
        }()),

        isAndroid = (function(){
            return (/android/gi).test(navigator.appVersion);
        }()),

        isIos = (function(){
                return (/iphone|ipad/gi).test(navigator.appVersion);
        }()),

        isIE6  = window.ActiveXObject &&  !window.XMLHttpRequest,

        formatTime = function( sDate ){
            var date;

            var preZero = function ( num ) {
                num = parseInt( num );
                return ( num < 10 ? '0' : '' ) + num;
            };

            if( sDate instanceof Date ) {
                date = sDate;
            } else {
                if( /\d{9,10}/.test(sDate) ) {
                    date = new Date(parseInt(sDate) * 1000 );
                } else {
                    sDate = sDate.replace(/-/g, '/');
                    date = new Date(sDate);
                }
            }

            return preZero(date.getMonth() + 1) + '月' + preZero(date.getDate()) + '日  ' + preZero(date.getHours()) + ':' + preZero(date.getMinutes());
        },

        tidToTeam = function ( tid ) {
            if( config.teams.length >>>0 ) {
                var team;
                $.each( config.teams, function() {
                    if( this.tid == tid ) {
                        team = this.name;
                        return false;
                    }
                });
                return team;
            }

        };


    return {
        subToArray: subToArray,
        isWebkit: isWebkit,
        joinAssignSrc: joinAssignSrc,
        isAndroid: isAndroid,
        isIos : isIos,
        isIE6 : isIE6,
        formatTime : formatTime,
        tidToTeam : tidToTeam
    };

});
