define(['jquery', 'component/template', 'conf/config', 'component/jquery.uri',
    'template/chatTemplate', 'model/chat-conf', 'component/tools', 'component/loading','./initializeScroll',  'interface/ajax'],
    function ($, template, config, uri, chatTemplate, chatConf, tools, loading, initializeScroll, ajax) {
        return function () {

            var mobileLoad = loading();

            var iscroll = initializeScroll();

            // 聊天室数据交互
            (function () {
                var token = $.uri(location.href).at('query').token,
                    chatWrap = $('#chat-wrap'),
                    layoutContent = $('.layout-content'),
                    chatRoomTip = $('#chat-room-tip'),
                    isBlockWord = function( str , blockWord){
                        var isBlockWord_ = false;
                        $.each(blockWord, function(){
                            var exp = new RegExp('(' + this + ')', 'g');
                            if(exp.test(str)) {
                                isBlockWord_ = true;
                                return false
                            }

                        });

                        return isBlockWord_;
                    },
                    ubbReplace = function (str, blockWord){
                        var faceExp = /\[em_([0-9]+)\]/g;

                        if( blockWord.length >>> 0 ) {
                            $.each(blockWord, function(){
                                var exp = new RegExp('(' + this + ')', 'g');
                                if(exp.test(str)) {
                                    str = str.replace( exp, function( $, $1){
                                        var index = str.indexOf($1),
                                            preStr = str.substring(0, index),
                                            nextStr = str.substring(index + 1);
                                        if(  !( preStr.indexOf('[') !== -1 &&  nextStr.indexOf(']') !== -1 )) {
                                            return $1.replace(/[\w\W]/g, '*');
                                        }
                                        return $1;
                                    });

                                }
                            });
                        }

                        str = str.replace(faceExp,'<img src="' + config.path + 'assets/images/face/$1.gif" border="0" />');


                        return str;
                    },
                    refreshIscroll = function( content ){
                        chatWrap.append(content);
                        iscroll.refresh();
                        if( chatWrap.height() >= layoutContent.height() - chatRoomTip.outerHeight() ) {
                            var item = chatWrap.find('.chat-item').last()[0];
                           iscroll.scrollToElement(item);
                        }
                    },
                    getMessage = function (token, name, uid, blockWord) {

                        return (function () {
                            var arg = arguments;
                            return ajax({
                                url: '/getMessage',
                                timeout: 60 * 1000,
                                data: {
                                    token: token,
                                    time: 60
                                },
                                success: function (getMessage) {

                                    if (getMessage.success) {
                                        var
                                            messageData = getMessage.data,
                                            data = {
                                                list: []
                                            };
                                        if (messageData.length >>> 0) {
                                            $.each(messageData, function () {
                                                if( this.id != uid ) {
                                                    var messages = {
                                                        user: name,
                                                        me : false,
                                                        time: tools.formatTime(this.time),
                                                        content: ubbReplace(this.message, blockWord)
                                                    };
                                                    data.list.push(messages);
                                                }
                                            });

                                            var contentTemplate = template.compile(chatTemplate.contentTemplate);
                                            refreshIscroll(contentTemplate(data));

                                            arg.callee();

                                        } else {
                                            arg.callee();
                                        }
                                    } else {
                                        arg.callee();
                                    }

                                },
                                error: function (XMLHttpRequest, textStatus) {
                                    //if(textStatus=="timeout"){
                                        arg.callee();
                                    //}
                                }
                            }, true);
                        }());


                    };

                    ajax({
                        url: '/joinChat',
                        data: {
                            token: token
                        },
                        success: function (joinChat) {
                            if (joinChat.success) {
                                ajax({
                                    url : 'http://fjc1.pop.baofeng.net/popv5/static/phoneapp/assets/src/model/blockWord.js',
                                    dataType: 'jsonp',
                                    jsonpCallback : 'blockWordCallBack',
                                    success: function( blockWord ){
                                        getMessage(token, joinChat.name, joinChat.data.id, blockWord);

                                        // 发送消息
                                        var inputChatMsg = $('#input-chat-msg'),
                                            postChatMsg = $('#post-chat-msg'),
                                            disabledCls = 'disabled-post-chat-btn',
                                            timeout;

                                        postChatMsg.on('tap', function(){
                                            var message = inputChatMsg.val(),
                                                _isBlockWord = isBlockWord(message, blockWord),
                                                data, messages, contentTemplate;
                                            if( message ) {
                                                if( _isBlockWord ) {
                                                    data = {
                                                        list: []
                                                    };
                                                    messages = {
                                                        user: "我: ",
                                                        me : true,
                                                        time: tools.formatTime(new Date())
                                                    };

                                                    messages.content =  ubbReplace( message, blockWord);

                                                    data.list.push( messages );

                                                    contentTemplate = template.compile(chatTemplate.contentTemplate);
                                                    refreshIscroll(contentTemplate(data));

                                                } else  if( !postChatMsg.hasClass(disabledCls) ){
                                                    postChatMsg.addClass(disabledCls);
                                                    timeout && clearTimeout(timeout);
                                                    ajax({
                                                        url : '/sendMessage?token=' + token,
                                                        type : 'post',
                                                        data : {
                                                            message : message
                                                        },
                                                        success : function( res ){
                                                            var data = {
                                                                list: []
                                                            };
                                                            var messages = {
                                                                user: "我: ",
                                                                me : true,
                                                                time: tools.formatTime(res.time)
                                                            };
                                                            if( res.success ) {
                                                                messages.content = ubbReplace( message, blockWord );
                                                            } else {
                                                                messages.content = '<em class="post-msg-err">消息发送失败</em> <a class="renew-post-btn" href="javascript:void(null)">重新发送</a>'
                                                            }
                                                            data.list.push( messages );

                                                            var contentTemplate = template.compile(chatTemplate.contentTemplate);
                                                            refreshIscroll(contentTemplate(data));
                                                        }
                                                    }, true);

                                                    timeout = setTimeout(function(){
                                                        timeout && clearTimeout(timeout);
                                                        postChatMsg.removeClass(disabledCls);
                                                    }, 3000);

                                                } else {
                                                    data = {
                                                        list: []
                                                    };
                                                    messages = {
                                                        user: "我: ",
                                                        me : true,
                                                        time: tools.formatTime(new Date())
                                                    };

                                                    messages.content = '<em class="post-msg-err">防止灌水，发消息间隔不少于3秒</em>';

                                                    data.list.push( messages );

                                                    contentTemplate = template.compile(chatTemplate.contentTemplate);
                                                    refreshIscroll(contentTemplate(data));
                                                }
                                            }

                                        });

                                        inputChatMsg.on('keydown', function(e){
                                            if( e.keyCode === 13 ) {
                                                postChatMsg.trigger('tap');
                                            }
                                        });

                                        // 重新发送
                                        chatWrap.on('tap', '.renew-post-btn', function(e){
                                            e.preventDefault();
                                            postChatMsg.trigger('tap');

                                        });

                                    }
                                });

                            }
                        }
                    }, true);

            }());

        };
    });
