jQuery(function($) {
    var summernote = $('#summernote');
    summernote.summernote({
        height : 400
    });

    $('#post-article').click(function(){
        $('#content').val( summernote.code());
        $(this).closest('form').submit();
    });

    $('#upload-file-box').on('click', '.upload-file-input', function(){
        this.select();
    });
});