define(['jquery', './template', './maskLayer'], function ( $, template, maskLayer) {

    /**
     * 使用严格模式
     */
    'use strict';

    var popWindow = function( config ) {
          config = $.extend( {
              contaier : $(document.body),
              width : 1007,
              data : {}
          }, config);
          this.config = config;

        this.create();
    };

    popWindow.prototype.maskLayer = maskLayer( {
        bgcolor: '#848585',
        opacity: 0.8,
        zIndex: 9998
    });

    popWindow.prototype.create = function() {

        var contentTemplate = template.render( this.config.templateId, this.config.data),
            popTemplate = template.render('pop-template', {
                title : this.config.title,
                content : contentTemplate
            });

        this.popContent = $(popTemplate);



        this.config.contaier.append( this.popContent );

        var self = this;
        $('.pop-close-btn').click(function(){
            self.hide();
        });

        this.refresh();

        return this;

    };

    popWindow.prototype.ISIE6 = window.ActiveXObject &&  !window.XMLHttpRequest;

    popWindow.prototype.position = function( container ) {

        var height =  container.height(), docHeight = document.documentElement.clientHeight;
        container.css({
            'width': this.config.width
        });

        var conf = {};

        if( this.ISIE6 ) {
            conf.top = ( docHeight - height ) / 2 + document.documentElement.scrollTop;
        } else {
            conf['margin-top'] = -( height / 2);
        }

        container.animate( conf, 0 );

        return this;

    };

    popWindow.prototype.refresh = function(){
        if( this.ISIE6 ) {
            var self = this;
            $(window).scroll( function(){
                self.position(self.popContent);
            });
        }
    };

    popWindow.prototype.show = function() {

        var self = this;
        this.maskLayer.show();

        this.popContent.show( 0, function(){
            self.position(self.popContent);
        });


        return this;
    };

    popWindow.prototype.hide = function() {
        this.maskLayer.hide();
        this.popContent.hide();
        return this;
    };

    var singlepopWindow;

    return function( config ){
        //if( singlepopWindow ) {
            //return singlepopWindow.create().position( singlepopWindow.popContent);
        //} else {
            return singlepopWindow = new popWindow( config );
        //}
    };

});

