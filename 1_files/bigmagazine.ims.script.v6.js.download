(function ($, sr) {
    var debounce = function (func, threshold, execAsap) {
        var timeout;

        return function debounced() {
            var obj = this, args = arguments;
            function delayed() {
                if (!execAsap)
                    func.apply(obj, args);
                timeout = null;
            };

            if (timeout)
                clearTimeout(timeout);
            else if (execAsap)
                func.apply(obj, args);

            timeout = setTimeout(delayed, threshold || 100);
        };
    }

    // smartresize 
    jQuery.fn[sr] = function (fn) { return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery, 'smartresize');

function SmartAlbumLayout() {
    var $obj = $('.LastestLayoutAlbum .LayoutAlbumRow');
    $obj.each(function () {
        var $pi = $('.LayoutAlbumItem', $(this)),
              cWidth = $(this).parents('.VCSortableInPreviewMode').width();
        //Tạo 1 mảng chứa toàn bộ ratio của ảnh
        var ratios = $pi.map(function () {
            return $(this).find('img').attr('w') / $(this).find('img').attr('h');
        }).get();

        //Lấy tổng width
        var sumRatios = 0, sumMargins = 0,
        minRatio = Math.min.apply(Math, ratios);
        for (var i = 0; i < $pi.length; i++) {
            sumRatios += ratios[i] / minRatio;
        };

        $pi.each(function () {
            sumMargins += parseInt($(this).css('margin-left')) + parseInt($(this).css('margin-right'));
        });

        //Tính toán width/ height cần thiết
        $pi.each(function (i) {
            var minWidth = (cWidth - sumMargins) / sumRatios;
            var h = Math.floor(minWidth / minRatio);
            var w = Math.floor(minWidth / minRatio) * ratios[i];

            $('img', $(this)).height(h).width(w);
            $('img', $(this)).css({
                width: w,
                height: h
            });
        });
    });
    $('.LastestLayoutAlbum').removeClass('LastestLayoutAlbum');
}

$(window).load(function () {
    $('#leftmedium img').attr('data-action', 'zoom');

    $('.LayoutAlbumItem a').on('click', function (evt) {
        evt.preventDefault();
    });
    $(window).resize();

    //ảnh full vùng text
    function photoAlignJustify() {
        $('.VCSortableInPreviewMode.alignJustify[type=Photo]').each(function () {
            var $this = $(this);
            var $img = $('img', $this);
            var w = $img.attr('w');
            if (typeof (w) == "undefined" || w == 0) {
                w = $img[0].naturalWidth
            }
            w = parseInt(w);
            var h = $img.attr('h');
            if (typeof (h) == "undefined" || h == 0) {
                h = $img[0].naturalHeight
            }
            h = parseInt(h);
            if (w >= h) {
                //ảnh ngang
                $this.addClass('HorizontalPhoto');
            } else {
                //ảnh dọc
                $this.addClass('VerticalPhoto');
            }
        });
    }

    //Chỉ chạy 1 lần đầu
    photoAlignJustify();

    //CalVideoStreamWidth();

    $('.VCCSortableInPreviewMode.VCSortableInPreviewMode[type=BeforeAfter]').each(function () {
        var $this = $(this);
        putElemntToCenter($this);
        var positionPercent = $this.attr('position-percent');
        $this.find('.panel-before').next('div').andSelf().wrapAll('<div class="VCBeforeAfterContent"/>');
        $('<div style="clear:both"></div>').insertAfter($this.find('.VCBeforeAfterContent:eq(0)'));
        $this.find('.PhotoCMS_Caption').css('text-align', 'center');
        $this.find('.VCBeforeAfterContent:eq(0)').beforeAfter({
            introPosition: positionPercent,
        });
    });
});

$(function () {
    $('.VCSortableInPreviewMode[type=content]').each(function () {
        var borderColor = $(this).attr('data-border');
        var backgroundColor = $(this).attr('data-back')
        $(this).css({
            'background-color': backgroundColor,
            'border-color': borderColor,
            'border-style': 'solid',
            'border-width': '2px'
        });
    });

    // embed videostream
    //$('.VCSortableInPreviewMode[type=VideoStream]').each(function () {
    //    var src = $(this).attr('data-src');
    //    var wrapperWidth = $(this).width();

    //    console.log(wrapperWidth);

    //    var width = $(this).attr('data-width');
    //    var height = $(this).attr('data-height');
    //    var marginLeft = (wrapperWidth - parseFloat(width.replace('px', ''))) / 2;
    //    $(this).find('div').eq(0).html('<iframe src="' + src + '" style="width:' + wrapperWidth + 'px;height:' + height + '"></iframe>');
    //});


    //set football images
    $('.NLFootballImage img').each(function () {
        if ($(this).attr('src').startsWith('/Core/')) {
            $(this).attr('src', 'data:image/png;base64,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');
        }
    });

    $('.VCSortableInPreviewMode[type=Photo]').attr('style', '');
    $('.VCSortableInPreviewMode[type=LayoutAlbum]').attr('style', '');
    fullWidthPhoto();

    //object full
    function fullWidthPhoto() {
        var d;
        var _timgfz = $('body').width() + 'px';
        $('.VCSortableInPreviewMode.alignJustifyFull').css("width", _timgfz);
        d = '-' + ($('body').width() - $('.sp-detail').width()) / 2 + 'px';
        $('.VCSortableInPreviewMode.alignJustifyFull').css("margin-left", d);
        //console.log(d);
    }

    //Ảnh có caption lệch 1 bên
    function deflector() {
        var ww = $(window).width();
        if (ww < 1640) {
            $('.VCSortableInPreviewMode .PhotoCMS_Caption.deflector').each(function () {
                $(this).attr('data-deflector', 'deflector');
                $(this).removeClass('deflector');
            });
        } else {
            $('.VCSortableInPreviewMode [data-deflector]').each(function () {
                $(this).addClass('deflector');
            });
        }
    }
    //Chạy khi resize
    var timeoutReload = null;
    $(window).on('resize', function (event) {
        fullWidthPhoto();
        deflector();
        clearTimeout(timeoutReload);
        timeoutReload = setTimeout(function () {
            $('.VCSortableInPreviewMode[type="LayoutAlbum"]').addClass('LastestLayoutAlbum');
            SmartAlbumLayout();
        }, 300);
    });
});

function putElemntToCenter($element) {
    var elmWidth = $element.outerWidth();
    var wrapperWidth = $('div.sp-detail div.sp-detail-maincontent div.sp-detail-content').width();
    $element.css({
        'margin-left': ((wrapperWidth - elmWidth) / 2) + 'px'
    });
}

(function ($) {
    $.fn.extend({
        beforeAfter: function (options) {
            var defaults =
			{
			    animateIntro: false,
			    introDelay: 1000,
			    introDuration: 1000,
			    introPosition: .5,
			    showFullLinks: true,
			    beforeLinkText: '<span></span>',
			    afterLinkText: '<span></span>',
			    imagePath: './js/',
			    cursor: 'pointer',
			    clickSpeed: 600,
			    linkDisplaySpeed: 200,
			    dividerColor: '#947E3C',
			    enableKeyboard: false,
			    keypressAmount: 20,
			    onReady: function () { },
			    title: ''
			};
            var options = $.extend(defaults, options);

            var randID = Math.round(Math.random() * 100000000);

            return this.each(function () {
                var o = options;
                var obj = $(this);

                var imgWidth = $('img:first', obj).width();
                var imgHeight = $('img:first', obj).height();

                if ($('div', obj).length < 2) $('img', obj).wrap('<div>'); // For backwards compatability. Used to require images to be wrapped in div tags.

                $(obj)
                .width(imgWidth)
                .height(imgHeight)
                .css({ 'overflow': 'hidden', 'position': 'relative', 'padding': '0' });

                var bef = $('img:first', obj).attr('src');
                var aft = $('img:last', obj).attr('src');

                $('img:first', obj).attr('id', 'beforeimage' + randID);
                $('img:last', obj).attr('id', 'afterimage' + randID);

                // Create an inner div wrapper (dragwrapper) to hold the images.
                $(obj).prepend('<div id="dragwrapper' + randID + '"><div id="drag' + randID + '"><img width="8" height="56" alt="handle" src="data:image/gif;base64,R0lGODlhCAA4ALMAAACrJATiNgCoJAvgOgCwIgHbLirXWQCcIP///wC7JQAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAIADgAAARc0MgZkhkllwTMTiBxeGA4fiZZimqKJuwbl/BJz6udtzWPuzcdcCcT9oo+YwyRYCJOzia0KfVEn1YqtnCdOr1VpDiYLI+J5PNwfUy70XD2rx2nmyqEPEFw4Bz+gBEAOw==" id="handle' + randID + '" /></div></div>'); // Create drag handle
                $('#dragwrapper' + randID).css({ 'opacity': .25, 'position': 'absolute', 'padding': '0', 'left': (imgWidth * o.introPosition) - ($('#handle' + randID).width() / 2) + 'px', 'z-index': '20' }).width($('#handle' + randID).width()).height(imgHeight);

                $('div:eq(2)', obj).height(imgHeight).width(imgWidth * o.introPosition).css({ 'position': 'absolute', 'overflow': 'hidden', 'left': '0px', 'z-index': '10' }); // Set CSS properties of the before image div
                $('div:eq(3)', obj).height(imgHeight).width(imgWidth).css({ 'position': 'absolute', 'overflow': 'hidden', 'right': '0px' });	// Set CSS properties of the after image div
                $('#drag' + randID).width(2).height(imgHeight).css({ 'background': o.dividerColor, 'position': 'absolute', 'left': '3px' });	// Set drag handle CSS properties
                $('#beforeimage' + randID).css({ 'position': 'absolute', 'top': '0px', 'left': '0px' });
                $('#afterimage' + randID).css({ 'position': 'absolute', 'top': '0px', 'right': '0px' });
                $('#handle' + randID).css({ 'z-index': '100', 'position': 'relative', 'cursor': o.cursor, 'top': (imgHeight / 2) - ($('#handle' + randID).height() / 2) + 'px', 'left': '-3px' })

                $(obj).append('<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAPCAYAAAAoAdW+AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAB9SURBVHjaYvz//z8DFsAGxAkMIEksuBaIX2OTSP8PAU/RJWKA+AdU8hGyRDAQf/2PAHBJbyD+9B8VgCWdgfjFf0wAltzxHzsAS5oB8QNckiBsB8QvcUmCsDsQf8AlCcIBQPwZlyQIRwLxPyB+hits80CSjDhihRmIwwACDACo50lKoGdCcAAAAABJRU5ErkJggg==" width="7" height="15" id="lt-arrow' + randID + '"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAPCAYAAAAoAdW+AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABzSURBVHjaYvj//38kEDMDMQM6BhHPgDgPn+Q/qAkYko/+Q8BnIA7AJQkCH4DYHZckCLwEYjtckiDwAIjNcEmCwA4mBuzgJRB3Y9P5CYi9sdn5FYiDsbn2BxDHoPvzKVQyHVsIvQbiWlxhmwbEbNgkAQIMAFvjU6/j+UMZAAAAAElFTkSuQmCC" width="7" height="15" id="rt-arrow' + randID + '">');

                if (o.showFullLinks) {
                    $(obj).before('<div class="balinks balinksWrapper" for="' + $(obj).attr('id') + '" id="links' + randID + '" style="position:relative"><span class="balinktitle">' + o.title + '</span><span class="balinks showleft"><a id="showleft' + randID + '" href="javascript:void(0)">' + o.beforeLinkText + '</a></span><span class="balinks showright"><a id="showright' + randID + '" href="javascript:void(0)">' + o.afterLinkText + '</a></span></div>');
                    $('#links' + randID).width(imgWidth);
                    $('#showleft' + randID).css({ 'position': 'relative' }).click(function () {
                        $('div:eq(2)', obj).animate({ width: imgWidth }, o.linkDisplaySpeed);
                        $('#dragwrapper' + randID).animate({ left: imgWidth - $('#dragwrapper' + randID).width() + 'px' }, o.linkDisplaySpeed);
                    });
                    $('#showright' + randID).css({ 'position': 'absolute' }).click(function () {
                        $('div:eq(2)', obj).animate({ width: 0 }, o.linkDisplaySpeed);
                        $('#dragwrapper' + randID).animate({ left: '0px' }, o.linkDisplaySpeed);
                    });
                }

                if (o.enableKeyboard) {
                    $(document).keydown(function (event) {
                        if (event.keyCode == 39) {
                            if ((parseInt($('#dragwrapper' + randID).css('left')) + parseInt($('#dragwrapper' + randID).width()) + o.keypressAmount) <= imgWidth) {
                                $('#dragwrapper' + randID).css('left', parseInt($('#dragwrapper' + randID).css('left')) + o.keypressAmount + 'px');
                                $('div:eq(2)', obj).width(parseInt($('div:eq(2)', obj).width()) + o.keypressAmount + 'px');
                            }
                            else {
                                $('#dragwrapper' + randID).css('left', imgWidth - parseInt($('#dragwrapper' + randID).width()) + 'px');
                                $('div:eq(2)', obj).width(imgWidth - parseInt($('#dragwrapper' + randID).width()) / 2 + 'px');
                            }
                        }
                        if (event.keyCode == 37) {
                            if ((parseInt($('#dragwrapper' + randID).css('left')) - o.keypressAmount) >= 0) {
                                $('#dragwrapper' + randID).css('left', parseInt($('#dragwrapper' + randID).css('left')) - o.keypressAmount + 'px');
                                $('div:eq(2)', obj).width(parseInt($('div:eq(2)', obj).width()) - o.keypressAmount + 'px');
                            }
                            else {
                                $('#dragwrapper' + randID).css('left', '0px');
                                $('div:eq(2)', obj).width($('#dragwrapper' + randID).width() / 2);
                            }
                        }
                    });
                }

                $('#dragwrapper' + randID).draggable({ containment: obj, drag: drag, stop: drag });

                function drag() {
                    $('#lt-arrow' + randID + ', #rt-arrow' + randID).stop().css('opacity', 0);
                    $('div:eq(2)', obj).width(parseInt($(this).css('left')) + 4);
                }

                if (o.animateIntro) {
                    $('div:eq(2)', obj).width(imgWidth);
                    $('#dragwrapper' + randID).css('left', imgWidth - ($('#dragwrapper' + randID).width() / 2) + 'px');
                    setTimeout(function () {
                        $('#dragwrapper' + randID).css({ 'opacity': 1 }).animate({ 'left': (imgWidth * o.introPosition) - ($('#dragwrapper' + randID).width() / 2) + 'px' }, o.introDuration, function () { $('#dragwrapper' + randID).animate({ 'opacity': .25 }, 1000) });
                        $('div:eq(2)', obj).width(imgWidth).animate({ 'width': imgWidth * o.introPosition + 'px' }, o.introDuration, function () { clickit(); o.onReady.call(this); });
                    }, o.introDelay);
                }
                else {
                    clickit();
                    o.onReady.call(this);
                }

                function clickit() {
                    $(obj).hover(function () {
                        $('#lt-arrow' + randID).stop().css({ 'z-index': '20', 'position': 'absolute', 'top': imgHeight / 2 - $('#lt-arrow' + randID).height() / 2 + 'px', 'left': parseInt($('#dragwrapper' + randID).css('left')) - 10 + 'px' }).animate({ opacity: 1, left: parseInt($('#lt-arrow' + randID).css('left')) - 6 + 'px' }, 200);
                        $('#rt-arrow' + randID).stop().css({ 'position': 'absolute', 'top': imgHeight / 2 - $('#lt-arrow' + randID).height() / 2 + 'px', 'left': parseInt($('#dragwrapper' + randID).css('left')) + 10 + 'px' }).animate({ opacity: 1, left: parseInt($('#rt-arrow' + randID).css('left')) + 6 + 'px' }, 200);
                        $('#dragwrapper' + randID).animate({ 'opacity': 1 }, 200);
                    }, function () {
                        $('#lt-arrow' + randID).animate({ opacity: 0, left: parseInt($('#lt-arrow' + randID).css('left')) - 6 + 'px' }, 350);
                        $('#rt-arrow' + randID).animate({ opacity: 0, left: parseInt($('#rt-arrow' + randID).css('left')) + 6 + 'px' }, 350);
                        $('#dragwrapper' + randID).animate({ 'opacity': .25 }, 350);
                    }
                    );

                    // When clicking in the container, move the bar and imageholder divs
                    $(obj).click(function (e) {
                        var clickX = e.pageX - $(this).offset().left;
                        $('#dragwrapper' + randID).stop().animate({ 'left': clickX - ($('#dragwrapper' + randID).width() / 2) + 'px' }, o.clickSpeed);
                        $('div:eq(2)', obj).stop().animate({ 'width': clickX + 'px' }, o.clickSpeed);
                        $('#lt-arrow' + randID + ',#rt-arrow' + randID).stop().animate({ opacity: 0 }, 50);
                    });
                    $(obj).one('mousemove', function () { $('#dragwrapper' + randID).stop().animate({ 'opacity': 1 }, 500); }); // If the mouse is over the container and we animate the intro, we run this to change the opacity when the mouse moves since the hover event doesnt get triggered yet
                }
            });
        }
    });
})(jQuery);

function camera360andPanorama() {
    try {
        $(".VCSortableInPreviewMode[type='360photoemagazine']").each(function () {
            var ratio = 9 / 16;
            $(this).find('iframe').css('height', ($(this).width() * ratio) + 'px');
        });

        $(".VCSortableInPreviewMode.PanoramaPhoto[type='Photo']").each(function (index) {
            var imgSource = $(this).find("img").attr("data-original");
            var widthimg = $(this).width();
            var heightimg = $(this).width() * 9 / 16;

            var $this = $(this).attr("class");
            index++;
            var nameClass = "PanoramaPhotoSo" + index + "";
            $(this).addClass(nameClass);
            var panorama, viewer, container;
            container = document.querySelector("." + nameClass + "");
            panorama = new PANOLENS.ImagePanorama(imgSource);
            viewer = new PANOLENS.Viewer({ container: container });
            viewer.add(panorama);
            $("." + nameClass + "").find("img").remove();
        });
    } catch (h) {

    }
}