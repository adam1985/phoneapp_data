define(function(){
    var tipTemplate =  '<p>' + '{{= welcome }}' + '</p>';

    var contentTemplate =
            +    '{{ for (var i = 0; i < list.length; i ++) { }}'
            +       '<div class="chat-item my-chat-item">'
            +           '<div class="user-title">'
            +                '<span>{{= user }}</span>'
            +                '<span class="user-phone-number">{{= phone }}</span>'
            +                '<span class="create-time">{{= time }}</span>'
            +           '</div>'
            +            '<div class="chat-content">'
            +                '<p>{{= content }}</p>'
            +            '</div>'
            +        '</div>'
            +    '{{ } }}';

    return {
        tipTemplate : tipTemplate,
        contentTemplate : contentTemplate
    }

});