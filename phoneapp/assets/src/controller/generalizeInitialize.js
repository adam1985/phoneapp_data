define(['jquery', 'component/zeroClipboard/ZeroClipboard'], function($, ZeroClipboard){
    return function() {
        $(document).on('taphold','#touch-copy', function(){

        });
        $(window).on('load', function(){

            //创建ZeroClipboard对象
            var clip = new ZeroClipboard.Client();

            //设置鼠标停留在复制按钮上是手型
            clip.setHandCursor(true);
            clip.addEventListener('mouseOver', function (client) {
                clip.setText(document.getElementById('touch-copy').innerHTML);
            });

            //设置复制到剪贴板完成时，输出
            clip.addEventListener('complete', function (client, text) {
                alert("复制成功!:\n" + text);
            });

            //设置按钮的Dom对象
            clip.glue('touch-copy', 'my-invite', {
               height : '50px',
               top : 0
            });

        });

    };
});