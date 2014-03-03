$(document).ready(function() {
    (function($) {
        jQuery.fn.extend({
            bannerContainer: function(options) {
                var defaults = {
                    LeftNavigation: '.left',
                    RightNavigation: '.right',
                    SlideHolder: '.ul',
                    SliderName: '.sliderName',
                    IntervalTime: 5000,
                    FadeOutTime: 1500,
                    FadeInTime: 1500,
                    NavigationArrow: true,
                    SlidesName: true
                };
                var options = $.extend(true, {}, defaults, options);

                var i = 1;
                var liCount = $(options.SlideHolder + " li").size();
                var slideName;
                var slideNameClick;
                var interval;
                $(options.SlideHolder + " li:nth-child(1)").css('display', 'inline');

                /*Add slides name in bottom*/
                for (var x = 1; x <= liCount; x++) {
                    if (options.SlidesName == true) {
                        slideName = $(options.SlideHolder + " li:nth-child(" + x + ") a img").attr('alt');
                        $(options.SliderName).append("<li>" + slideName + "</li>");
                        $(options.SliderName + " li:nth-child(" + x + ")").attr('id', x);
                    }
                    else {
                        $(options.SliderName).hide();
                    }
                    $(options.SlideHolder + " li:nth-child(" + x + ")").attr('tabindex', x);
                }
                $(options.SliderName + " li#1").addClass('active');

                /*Auto Slide Loop*/
                function autoLoop() {
                    if (i == liCount) {
                        i = 0;
                    }
                    i++;
                    $(options.SlideHolder + " li").fadeOut(options.FadeOutTime);
                    $(options.SlideHolder + " li:nth-child(" + i + ")").fadeIn(options.FadeInTime);
                    $(options.SliderName + " li").removeClass('active');
                    $(options.SliderName + " li#" + i).addClass('active');
                }
                function intervalAutoLoop() {
                    interval = setInterval(function() {
                        autoLoop();
                    }, options.IntervalTime);
                }
                intervalAutoLoop();

                /*Click On Slide Names*/
                $(options.SliderName + " li").click(function() {
                    slideNameClick = $(this).attr('id');
                    if (slideNameClick == i) {
                        return true;
                    }
                    else {
                        $(options.SlideHolder + " li").fadeOut(options.FadeOutTime);
                        $(options.SlideHolder + " li:nth-child(" + slideNameClick + ")").fadeIn(options.FadeInTime);
                        $(options.SliderName + " li").removeClass('active');
                        $(options.SliderName + " li#" + slideNameClick).addClass('active');
                    }
                    i = parseInt(slideNameClick);
                    clearInterval(interval);
                    setTimeout(function() {
                        intervalAutoLoop();
                    });
                });

                if (options.NavigationArrow == true) {
                    /*Right Click Function*/
                    $(options.RightNavigation).click(function() {
                        $(options.SlideHolder + " li").fadeOut(options.FadeOutTime);
                        if (i == liCount) {
                            i = 0;
                        }
                        i = i + 1;
                        $(options.SlideHolder + " li:nth-child(" + i + ")").fadeIn(options.FadeInTime);
                        $(options.SliderName + " li").removeClass('active');
                        $(options.SliderName + " li#" + i).addClass('active');
                        clearInterval(interval);
                        setTimeout(function() {
                            intervalAutoLoop();
                        });
                    });

                    /*Left Click Function*/
                    $(options.LeftNavigation).click(function() {
                        $(options.SlideHolder + " li").fadeOut(options.FadeOutTime);
                        if (i == 1) {
                            i = 7;
                        }
                        i = i - 1;
                        $(options.SlideHolder + " li:nth-child(" + i + ")").fadeIn(options.FadeInTime);
                        $(options.SliderName + " li").removeClass('active');
                        $(options.SliderName + " li#" + i).addClass('active');
                        clearInterval(interval);
                        setTimeout(function() {
                            intervalAutoLoop();
                        });
                    });
                }
                else {
                    $(options.RightNavigation).hide();
                    $(options.LeftNavigation).hide();
                }


            }
        });
    })(jQuery);
});