define(['jquery',  'component/template', 'template/chatTemplate', 'model/chat-conf', 'component/maskLayer'],
    function ($, template, chatTemplate, chatConf, MaskLayer) {
        return function () {

            // 设置页面标题　
            document.title = chatConf.title;

            // 聊天室欢迎语

            var tipTemplate = template.compile(chatTemplate.tipTemplate);
            $('#chat-room-tip').html( tipTemplate( chatConf ) );

            // 提示框
            (function(){
                var maskLayer = MaskLayer({
                    opacity: 0.5
                });

                maskLayer.show( function(){
                    var templateStr = template.render('chat-alert-template', chatConf), chatAlert = $(templateStr);
                    $(document.body).append( chatAlert );
                    chatAlert.css('margin-top', -chatAlert.outerHeight()/2).fadeIn();

                    $('#chat-alert-btn').on('tap', function(e){
                        e.preventDefault();
                        chatAlert.fadeOut();
                        maskLayer.hide();
                    });
                });
            }());


            // 聊天表情
            (function(){
                var qqface = $('#qqface'), faceNumbers = 75, faces = '';
                for(var i = 0; i < faceNumbers; i++ ) {
                    faces += '<a href="javascript:void(null)" data-face="' + ( i + 1 ) +
                            '"><img src="assets/images/face/' + ( i + 1 ) + '.gif" /></a>'
                }

                qqface.html( faces );

                $('#select-face').on('tap', function(e){
                    e.preventDefault();
                    qqface.show();

                });

                var faceStatus = {};

                qqface.on('tap','a', function(e){
                    e.preventDefault();
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

            }());

        };
    });
