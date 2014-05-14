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
                    refreshIscroll = function( content ){
                        chatWrap.append(content);
                        iscroll.refresh();
                        if( chatWrap.height() >= layoutContent.height() - chatRoomTip.outerHeight() ) {
                            iscroll.scrollTo(0, iscroll.y - chatWrap.last().height);
                        }

                    },
                    getMessage = function (token, name, uid) {

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
                                                        content: this.message
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


                    },
                    ubbReplace = function (str){
                        str = str.replace(/\[em_([0-9]*)\]/g,'<img src="' + config.path + 'assets/images/face/$1.gif" border="0" />');
                        return str;
                    };

                    ajax({
                        url: '/joinChat',
                        data: {
                            token: token
                        },
                        success: function (joinChat) {
                            if (joinChat.success) {
                                getMessage(token, joinChat.name, joinChat.data.id);
                            }
                        }
                    }, true);

                // 发送消息
                var inputChatMsg = $('#input-chat-msg'),
                    postChatMsg = $('.post-chat-msg'),
                    disabledCls = 'disabled-post-chat-btn',
                    timeout;

                postChatMsg.on('tap', function(){
                    var message = inputChatMsg.val();
                    if( !postChatMsg.hasClass(disabledCls) ){
                        if( message ) {
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
                                        messages.content = ubbReplace( message );
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
                        }

                    } else {
                        var data = {
                            list: []
                        };
                        var messages = {
                            user: "我: ",
                            me : true,
                            time: tools.formatTime(new Date())
                        };

                        messages.content = '<em class="post-msg-err">防止灌水，发消息间隔不少于3秒</em> <a class="renew-post-btn" href="javascript:void(null)">重新发送</a>';

                        data.list.push( messages );

                        var contentTemplate = template.compile(chatTemplate.contentTemplate);
                        refreshIscroll(contentTemplate(data));
                    }
                });

                // 重新发送
                chatWrap.on('tap', '.renew-post-btn', function(e){
                    e.preventDefault();
                    postChatMsg.trigger('tap');

                });

            }());

        };
    });
