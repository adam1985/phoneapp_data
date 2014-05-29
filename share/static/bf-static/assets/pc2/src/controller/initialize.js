define(['jquery', 'component/template','component/tools', 'component/slider', 'component/loading',  'component/window', 'component/superMarquee', 'conf/config', 'interface/ajax'],
    function($, template, tools, slider, loading, singlepopWindow, superMarquee, config, ajax){
        $(function(){

            var loadings = loading();

            loadings.show();

            // 焦点图
            var focusDtd = ajax({
                url : config.dataDir + 'focus-conf.js',
                jsonpCallback : 'focusConfCallback',
                success : function( data ){

                    var focusTemplate = template.render('focus-template', {
                            list : data
                        }),
                        slideUlTemplate = template.render('slide-ul-template', {
                            list : data
                        });

                    var  slideUl = $('#slide-ul');

                    $('#slide-content').html( focusTemplate );
                    slideUl.html( slideUlTemplate );

                    $('#slide-box').sPlayer({
                        wrap : '#slide-content',
                        diyTag : '.slide-item',
                        type : 'fade',
                        className : 'active',
                        buttons : '#slide-ul',
                        buttonTag : 'li',
                        speed : 'slow'
                    });

                    slideUl.superMarquee({
                        isMarquee : true,
                        time : 1,
                        direction: 'up',
                        controlBtn:{
                            up:'#slide-up',
                            down:'#slide-down'
                        }
                    });

                }
            }, true);


            var webInfoDtd = ajax({
                    url : config.pageDir + 'web_info',
                    jsonpCallback : 'guessCallback',
                    success : function( res ){
                        if( res && res.success ) {
                            var data = res.data;

                            //console.log( data );

                            // 奖池
                            (function(){
                                var allWage = data.coupon,
                                    totalWage = allWage.total,
                                    dayWage = allWage.today;

                                    if( dayWage >= 1e4 ) {
                                        dayWage -=  1e4;
                                        totalWage += 1e4;
                                    }

                                var wageTemplate = template.render('wages-template', {
                                    totalWage : totalWage.toString(),
                                    dayWage : dayWage
                                });


                                $('#total-wages-box').html( wageTemplate );

                            }());

                            // 球队支持排行榜
                            (function(){
                                var allTeams = data.team;

                                if( allTeams.length >>>0 ) {
                                    allTeams.sort(function(a, b){
                                        return b.count - a.count;
                                    });

                                    $.each(allTeams, function(i, v){
                                        v.src = config.teamIcon + v.tid + '.png';
                                    });

                                    var rankTops = allTeams.slice(0, 3);

                                    var rankTemplate = template.render('team-rank-template', {
                                        list : rankTops
                                    });
                                    $('#rank-item-box').html( rankTemplate );

                                    var readRankTeam = $('#read-rank-team');

                                    readRankTeam.click(function(){
                                        singlepopWindow({
                                            title : '全部球队支持排行榜',
                                            data : {
                                                list : allTeams
                                            },
                                            templateId : 'rank-top-template'
                                        }).show();
                                    });

                                }

                            }());

                            // 参与大厅
                            (function(){
                                var userShares = data.share;

                                if( userShares.length >>> 0 ) {
                                    var shareTemplate = template.render('partake-template', {
                                        list : userShares
                                    });
                                    $('#partake-box').html( shareTemplate );
                                }
                            }());

                            // 世界杯时间表
                            (function(){
                                var gameTeams = data.match, list = [];

                                if( gameTeams.length >>> 0 ) {
                                    $.each(gameTeams, function() {
                                        list.push({
                                            time : tools.formatTime(this.match_time),
                                            teamA : tools.tidToTeam( this.a_tid ),
                                            teamB : tools.tidToTeam( this.b_tid ),
                                            teamAsrc : config.teamIcon + this.a_tid + '.png',
                                            teamBsrc : config.teamIcon + this.b_tid + '.png'
                                        });
                                    });

                                    var timeTemplate = template.render('worldcup-template', {
                                        list : list
                                    });

                                    $('#worldcup-box').html( timeTemplate );

                                }
                            }());

                        }
                    }
            }, true);

            $.when(focusDtd, webInfoDtd).done(function(){
                loadings.hide();
            });

            // 弹窗
            (function(){
                var readStatement = $('#read-statement');
                readStatement.click(function(){
                    singlepopWindow({
                            title : '免责声明',
                            templateId : 'disclaimer-template'
                    }).show();
                });

                var totalGameTimes = $('#total-game-times');
                totalGameTimes.click(function(){
                    singlepopWindow({
                        title : '全部时间表',
                        templateId : 'total-time-template'
                    }).show();
                });


            }());

            var partakeBox = $('#partake-box');

            partakeBox.superMarquee({
                isEqual: true,
                isMarquee : true,
                time : 1,
                direction: 'up'
            });

        });
});