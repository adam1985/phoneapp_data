jQuery(function($) {
    var summernote = $('#summernote'), content = $('#content');
    summernote.summernote({
        height : 400
    }).code(content.val());

    $('#post-article').click(function(){
        content.val( summernote.code());
        $(this).closest('form').submit();
    });

    $('#upload-file-box').on('click', '.upload-file-input', function(){
        this.select();
    });
});