define(['jquery', 'component/template', 'component/slider', 'component/window', 'component/superMarquee', 'conf/config', 'interface/ajax'],
    function($, template, slider, singlepopWindow, superMarquee, config, ajax){
        $(function(){

            ajax({
                url : 'static/bf-static/assets/pc2/src/conf/focus-conf.js',
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

                var readRankTeam = $('#read-rank-team');

                readRankTeam.click(function(){
                    singlepopWindow({
                        title : '全部球队支持排行榜',
                        templateId : 'rank-top-template'
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