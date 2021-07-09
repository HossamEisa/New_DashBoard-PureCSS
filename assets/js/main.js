jQuery.noConflict();

jQuery(document).ready(function ($) {
    setTimeout(function (param) {

        $('.exportitemm').append(`
<div class="dt-buttons btn-group flex-wrap">
<button
   class="btn btn-secondary buttons-copy buttons-html5" tabindex="0"
   aria-controls="students-table" type="button"><span>نسخ</span></button> <button
   class="btn btn-secondary buttons-excel buttons-html5" tabindex="0"
   aria-controls="students-table" type="button"><span>Excel</span></button> <button
   class="btn btn-secondary buttons-csv buttons-html5" tabindex="0"
   aria-controls="students-table" type="button"><span>CSV</span></button> <button
   class="btn btn-secondary buttons-pdf buttons-html5" tabindex="0"
   aria-controls="students-table" type="button"><span>PDF</span></button> <button
   class="btn btn-secondary buttons-print" tabindex="0" aria-controls="students-table"
   type="button"><span>طباعة</span></button> </div>`);
    }, 1000)


    if (sessionStorage.view == 'true') {
        $('.dash-sidebar').addClass('closed')
    } else {
        $('.dash-sidebar').removeClass('closed')

    }

    $('#desktop-toggler').click(function () {
        $('.dash-sidebar').toggleClass('closed');
        if ($('.dash-sidebar').hasClass('closed')) {
            sessionStorage.setItem('view', true);
        } else {
            sessionStorage.setItem('view', false);
        }
    });



    $('#dash-toggler').on('click', function (e) {
        console.log('asdasd');
        e.preventDefault();
        $('.dash-sidebar, .dash-sidecontent').toggleClass('open');
        $('.new-dashboard').toggleClass('overflow-hidden');
    });

    firsTime = false;
    $('.toggle-search').on('click', function (e) {
        e.preventDefault();
        console.log(firsTime);
        $('.search-plus-form').toggleClass('active');
        $('.search-small-form').toggleClass('active');

        if (firsTime) {
            $(this).html('+ بحث متقدم');
            firsTime = false;

        } else {
            $(this).html('- بحث عادي');
            firsTime = true;
        }
    });


    if ($("select").length) {
        $("select").niceSelect();
    }



    // 


    function scroll_to_class(element_class, removed_height) {
        var scroll_to = $(element_class).offset().top - removed_height;
        if ($(window).scrollTop() != scroll_to) {
            $('html, body').stop().animate({
                scrollTop: scroll_to
            }, 0);
        }
    }

    function bar_progress(progress_line_object, direction) {
        var number_of_steps = progress_line_object.data('number-of-steps');
        var now_value = progress_line_object.data('now-value');
        var new_value = 0;
        if (direction == 'right') {
            new_value = now_value + (100 / number_of_steps);
        } else if (direction == 'left') {
            new_value = now_value - (100 / number_of_steps);
        }
        progress_line_object.attr('style', 'width: ' + new_value + '%;').data('now-value', new_value);
    }

    jQuery(document).ready(function () {

        /*
            Fullscreen background
        */
        // $.backstretch("assets/img/backgrounds/1.jpg");

        // $('#top-navbar-1').on('shown.bs.collapse', function () {
        //     $.backstretch("resize");
        // });
        // $('#top-navbar-1').on('hidden.bs.collapse', function () {
        //     $.backstretch("resize");
        // });

        /*
            Form
        */
        $('.f1 fieldset:first').fadeIn('slow');

        $('.f1 input[type="text"], .f1 input[type="password"], .f1 textarea').on('focus', function () {
            $(this).removeClass('input-error');
        });

        // next step
        $('.f1 .btn-next').on('click', function () {
            var parent_fieldset = $(this).parents('fieldset');
            var next_step = true;
            // navigation steps / progress steps
            var current_active_step = $(this).parents('.f1').find('.f1-step.active');
            var progress_line = $(this).parents('.f1').find('.f1-progress-line');

            // fields validation
            parent_fieldset.find('input[type="text"], input[type="password"], textarea').each(function () {
                if ($(this).val() == "") {
                    $(this).addClass('input-error');
                    next_step = false;
                } else {
                    $(this).removeClass('input-error');
                }
            });
            // fields validation

            if (next_step) {
                parent_fieldset.fadeOut(400, function () {
                    // change icons
                    current_active_step.removeClass('active').addClass('activated').next().addClass('active');
                    // progress bar
                    bar_progress(progress_line, 'right');
                    // show next step
                    $(this).next().fadeIn();
                    // scroll window to beginning of the form
                    scroll_to_class($('.f1'), 20);
                });
            }

        });

        // previous step
        $('.f1 .btn-previous').on('click', function () {
            // navigation steps / progress steps
            var current_active_step = $(this).parents('.f1').find('.f1-step.active');
            var progress_line = $(this).parents('.f1').find('.f1-progress-line');

            $(this).parents('fieldset').fadeOut(400, function () {
                // change icons
                current_active_step.removeClass('active').prev().removeClass('activated').addClass('active');
                // progress bar
                bar_progress(progress_line, 'left');
                // show previous step
                $(this).prev().fadeIn();
                // scroll window to beginning of the form
                scroll_to_class($('.f1'), 20);
            });
        });

        // submit
        $('.f1').on('submit', function (e) {

            // fields validation
            $(this).find('input[type="text"], input[type="password"], textarea').each(function () {
                if ($(this).val() == "") {
                    e.preventDefault();
                    $(this).addClass('input-error');
                } else {
                    $(this).removeClass('input-error');
                }
            });
            // fields validation

        });

    });
    var HejriDate = new Intl.DateTimeFormat('ar-FR-u-ca-islamicc', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(Date.now()),
        gregorianDate = new Intl.DateTimeFormat('ar-GB', {
            day: 'numeric',
            month: 'long',
            weekday: 'long',
            year: 'numeric'
        }).format(Date.now());
    $('.dash-date .hejri').text(gregorianDate + ' - ');
    $('.dash-date .melady').text(HejriDate);



    $('.dash-sidebar .dropdown').on('show.bs.dropdown', function () {
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
    });

    // Add slideUp animation to Bootstrap dropdown when collapsing.
    $('.dash-sidebar .dropdown').on('hide.bs.dropdown', function () {
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
    });
});