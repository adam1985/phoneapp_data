define(['jquery','component/template', 'component/tools', 'conf/config'],
    function($, template, tools, config){
        return function(pageIndexArg, path, data, jsonpCallback, boxId, templateId){
            var dtd = $.Deferred();  //在函数内部，新建一个Deferred对象
            var totalRow = 0, maxRow = 6, ajaxNumber = 0,
                pageIndex = pageIndexArg.pageIndex,
                newsListContainer = $('#' + boxId);
                $(document.body).data('has-list-page', true);
            (function(){
                var arg = arguments;
                if( pageIndex > 0 ) {
                    $.ajax({
                        url: config.base + path + data.newsSource + pageIndex + '.js',
                        dataType: 'jsonp',
                        jsonpCallback : jsonpCallback,
                        success: function( data ){
                            if( data.length >>> 0) {
                                ajaxNumber++;
                                totalRow += data.length;
                                data = tools.joinAssignSrc( data );
                                var templateStr = template.render(templateId, {
                                    list : data
                                });
                                if( ajaxNumber > 1 ) {
                                    newsListContainer.append( templateStr );
                                } else {
                                    newsListContainer.html( templateStr );
                                }

                            }

                            --pageIndex;


                            if( pageIndex < 1 ) {
                                $(document.body).data('has-list-page', false);
                            }

                            if( totalRow < maxRow ) {
                                arg.callee();
                            } else {
                                pageIndexArg.pageIndex = pageIndex;
                                dtd.resolve(); // 改变Deferred对象的执行状态
                            }

                        }
                    });
                } else {
                    $(document.body).data('has-list-page', false);
                    pageIndexArg.pageIndex = pageIndex;
                    dtd.resolve(); // 改变Deferred对象的执行状态
                }

            }());

            return dtd.promise(); // 返回promise对象

        };
    }
);