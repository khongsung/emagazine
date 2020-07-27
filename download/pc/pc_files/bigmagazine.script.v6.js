
$(window).load(function () {

});

$(function () {
    // embed viewo stream
    //$('.VCSortableInPreviewMode[type=VideoStream]').each(function () {
    //    var src = $(this).attr('data-src');
    //    var wrapperWidth = $(this).width();

    //    var width = $(this).attr('data-width');
    //    var height = $(this).attr('data-height');
    //    var marginLeft = (wrapperWidth - parseFloat(width.replace('px', ''))) / 2;
    //    $(this).find('div').eq(0).html('<iframe src="' + src + '" style="width:' + width + ';height:' + height + ';margin-left:' + marginLeft + 'px" allowfullscreen="" webkitallowfullscreen="" mozallowfullscreen="" oallowfullscreen="" msallowfullscreen="" oallowfullscreen=""></iframe>');
    //});
    videoHD.isAd = true;
    videoHD.init('#contentMgz', {
        type: videoHD.videoType.newsDetail,
        isMute: true
    });


    $('.VCSortableInPreviewMode[type=Photo]').attr('style', '');
    $('.VCSortableInPreviewMode[type=LayoutAlbum]').attr('style', '');

    $('.VCSortableInPreviewMode[type="photo"][allow-zoom="true"] a').addClass('sp-img-zoom');
    $('.VCSortableInPreviewMode[type="LayoutAlbum"] a').addClass('sp-img-zoom');

    $('.VCSortableInPreviewMode[type="photo"][allow-zoom="false"] a').attr('href', 'javascript:;;');
    $('.VCSortableInPreviewMode[type="photo"][allow-zoom="false"] a').css('cursor', 'default');

    $('.VCSortableInPreviewMode[type="photo"]:not([allow-zoom]) a:not([sp-img-zoom])').not('.link-callout').attr('href', 'javascript:;;');
    $('.VCSortableInPreviewMode[type="photo"]:not([allow-zoom]) a:not([sp-img-zoom])').not('.link-callout').css('cursor', 'default');

    $('.VCSortableInPreviewMode[type="photo"] a[target="_blank"]').not('.link-callout').removeAttr('target');

    $(".sp-img-zoom").fancybox({

        padding: 0,

        showNavArrows: true,

        locked: false,

        beforeShow: function () {

            $(".fancybox-overlay").addClass("fancybox-opening");
        },
        onUpdate: function () {
            $(window).scroll(function () {
                try {
                    $.fancybox.close().transitions();
                } catch (e) {

                }
            });
            $(".fancybox-image").on('click', function () {

                try {
                    $.fancybox.close().transitions();
                } catch (e) {

                }

            });

        },
        beforeClose: function () {

            $(".fancybox-overlay").addClass("fancybox-closing");

        },
        nextEffect: 'none',
        prevEffect: 'none'
    });

    $(".btn-popup-comment").fancybox({
        maxWidth: '100%',
        maxHeight: '100%',
        fitToView: true,
        width: '900px',
        height: '90%',
        autoSize: true,
        padding: 30,
        margin: 0,
        locked: true,
        beforeShow: function () {
            $(".fancybox-overlay").addClass("fancybox-opening fancybox-comment-overlay");

            $("#fancybox-lock").addClass("fancybox-comment");

            $(".fancybox-wrap").append("<div class='fancybox-comment-header'>Bình luận</div>");
        },
        beforeClose: function () {
            $(".fancybox-overlay").addClass("fancybox-closing");
            $(".fancybox-wrap").addClass("fancybox-comment-closing")
        },
        openEffect: 'none',
        closeEffect: 'none'
    });

    $('.VCSortableInPreviewMode[type=FirstCharacterv2]').each(function () {
        var $objFc = $(this);
        var marginRight = $objFc.attr('data-margin-right');
        var marginLeft = $objFc.attr('data-margin-left');
        var marginBottom = $objFc.attr('data-margin-bottom');
        var marginTop = $objFc.attr('data-margin-top');
        var dataWidth = $objFc.attr('data-width');
        var dataHeight = $objFc.attr('data-height');
        $objFc.css({
            'margin-right': marginRight + 'px',
            'margin-left': marginLeft + 'px',
            'margin-bottom': marginBottom + 'px',
            'margin-top': marginTop + 'px',
            'width': dataWidth + 'px !important',
            'height': dataHeight + 'px !important'
        });
    });
});

function ClickNews(id) {
    parent.postMessage('CssUpdate.fancyActive(' + id + ')', '*');
}