define(['jquery',  'component/template', 'conf/config', 'component/jquery.uri',
    'template/chatTemplate', 'model/chat-conf', 'component/maskLayer', './chatMutual'],
    function ($, template, config, uri, chatTemplate, chatConf, MaskLayer, chatMutual) {
        return function () {

            // 设置页面标题　
            document.title = chatConf.title;

            // 聊天室欢迎语

            var tipTemplate = template.compile(chatTemplate.tipTemplate);
            $('#chat-room-tip').html( tipTemplate( chatConf ) );

            var maskLayer = MaskLayer({
                opacity: 0.5
            });

            // 提示框
            (function(){

                maskLayer.show( function(){
                    var templateStr = template.render('chat-alert-template', chatConf), chatAlert = $(templateStr);
                    $(document.body).append( chatAlert );
                    chatAlert.css('margin-top', -chatAlert.outerHeight()/2).fadeIn();

                    $('#chat-alert-btn').on('tap', function(e){
                        e.preventDefault();

                        chatAlert.fadeOut(function(){
                            chatMutual();
                        });

                        maskLayer.hide();
                    });
                });
            }());


            // 聊天表情
            (function(){
                var qqface = $('#qqface'), faceNumbers = 75, faces = '';
                for(var i = 0; i < faceNumbers; i++ ) {
                    faces += '<a href="javascript:void(null)" data-face="' + ( i + 1 ) +
                            '"><img src="' + config.path + 'assets/images/face/' + ( i + 1 ) + '.gif" /></a>'
                }

                qqface.html( faces );

                $('#select-face').on('tap', function(e){
                    e.preventDefault();
                    qqface.show();

                });

                var faceStatus = {};

                qqface.on('tap','a', function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    var $this = $(this),
                        faceIndex = $this.attr('data-face'),
                        faceStr = '[em_' + faceIndex + ']',
                        inputMsg = $('#input-chat-msg')[0];
                    if( !faceStatus[faceIndex] ) {
                        inputMsg.value += faceStr;
                        faceStatus[faceIndex] = 1;
                    }

                    qqface.hide();

                });

                $('.layout-content').on('tap', function(){
                    qqface.hide();
                });

            }());






        };
    });
