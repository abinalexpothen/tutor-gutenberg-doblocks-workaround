jQuery(document).ready(function ($) {
    'use strict';

    // tutor-setup-wizard-video
    // tutor-setup-wizard-type
    // tutor-setup-wizard-boarding
    // tutor-setup-wizard-settings


    /* ---------------------
    * Wizard Skip
    * ---------------------- */
    $('.tutor-boarding-next, .tutor-boarding-skip').on('click', function (e) {
        e.preventDefault();
        $('.tutor-setup-wizard-boarding').removeClass('active');
        $('.tutor-setup-wizard-type').addClass('active');
    });
    $('.tutor-type-next, .tutor-type-skip').on('click', function (e) {
        e.preventDefault();
        $('.tutor-setup-wizard-type').removeClass('active');
        $('.tutor-setup-wizard-settings').addClass('active');
    });
    


    /* ---------------------
    * Wizard Slick Slider
    * ---------------------- */
   
    console.log('Its Working!!!');

    $(".tutor-boarding").slick({
        speed: 1000,
        centerMode: true,
        centerPadding: "19.5%",
        slidesToShow: 1,
        arrows: false,
        dots: true,
        responsive: [{
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: "50px",
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: "30px",
                    slidesToShow: 1
                }
            }
        ]
    });


    /* ---------------------
    * Wizard Direct Click
    * ---------------------- */
    $('ul.tutor-setup-title li').on('click', function (e) {
        $('ul.tutor-setup-title li').removeClass('active');
        $(this).addClass('active');

        $('ul.tutor-setup-content li').removeClass('active');
        $('ul.tutor-setup-content li').eq($(this).index()).addClass('active');
    });


    // Reset Total Form
    // $( 'ul.tutor-setup-title li' ).on( 'click', function(e) {
    //     //$(selector)[0].reset();
    // });
    $( '.tutor-reset-section' ).on( 'click', function(e) {
        $(this).closest('li').find('input').val(function(){
            switch (this.type){
                case 'text':
                    console.log('ddd->1');
                    return this.defaultValue;
                    break;

                case 'checkbox':
                case 'radio':
                    console.log('ddd->2');
                    this.checked = this.defaultChecked;
                    break;

                case 'range':
                    const rangeval = $(this).closest('.limit-slider')
                    if ( rangeval.find('.range-input').hasClass('double-range-slider') ){
                        rangeval.find('.range-value-1').html(this.defaultValue+'%')
                        $('.range-value-data-1').val( this.defaultValue )
                        rangeval.find('.range-value-2').html((100 - this.defaultValue)+'%')
                        $('.range-value-data-2').val( 100 - this.defaultValue )
                    } else {
                        rangeval.find('.range-value').html(this.defaultValue)
                        return this.defaultValue;
                    }
                    break;
                    
                case 'hidden':
                    return this.value;
                    break;
            }
        });

    });
    

    // Redirect after Finished
    $('.tutor-redirect').on('click', function(e){
        e.preventDefault();
        console.log('Finished!!!');
        //window.location = $(this).data('url');
    });


    /* ---------------------
    * Wizard Settings Button Action
    * ---------------------- */
    $('.tutor-setup-previous').on('click', function (e) {
        e.preventDefault();
        const _index = $(this).closest('li').index()
        if (_index > 0) {
            $('ul.tutor-setup-title li').eq(_index).removeClass('active');
            $('ul.tutor-setup-title li').eq(_index - 1).addClass('active');
            $('ul.tutor-setup-content li').removeClass('active').eq(_index - 1).addClass('active');
        }
    });
    $('.tutor-setup-skip, .tutor-setup-next').on('click', function (e) {
        e.preventDefault();
        const _index = $(this).closest('li').index() + 1
        $('ul.tutor-setup-title li').eq(_index).addClass('active');
        $('ul.tutor-setup-content li').removeClass('active').eq(_index).addClass('active');
    });


    /* ---------------------
    * Wizard Submit Form Action
    * ---------------------- */
    $(document).on('submit', '#tutor-setup-form', function (e) {
        const _form = $(this).serialize();
        // = (array) maybe_unserialize(get_option('tutor_option'));
        console.log('EMC->', _form);

        $.ajax({
            url: _tutorobject.ajaxurl,
            type: 'POST',
            data: _form,
            beforeSend: function () {
                // $form.find('.button').addClass('tutor-updating-message');
            },
            success: function (data) {
                if (data.success) {
                    //window.location.reload();
                }
            },
            complete: function () {
                // $form.find('.button').removeClass('tutor-updating-message');
                //window.location = $(this).data('url');
            }
        });
    });


    /* ---------------------
    * Wizard Tooltip
    * ---------------------- */
    $('.tooltip-btn').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
    });

    /*  Input Label Toggle Color */
    $(".input-switchbox").each(function () {
        inputCheckEmphasizing($(this));
    });

    function isChecked(th) {
        return th.prop('checked') ? true : false;
    }

    function inputCheckEmphasizing(th) {
        var checkboxRoot = th.parent().parent();
        if (isChecked(th)) {
            checkboxRoot.find('.label-on').addClass("active");
            checkboxRoot.find('.label-off').removeClass("active");
        } else {
            checkboxRoot.find('.label-on').removeClass("active");
            checkboxRoot.find('.label-off').addClass("active");
        }
    }

    // on/of emphasizing after input check click
    $(".input-switchbox").click(function () {
        inputCheckEmphasizing($(this));
    });

    
    $('.options-container').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
    });
    $('.options-container .option').on('click', function(e) {
        e.preventDefault();
        $(this).closest('.options-container').find('.option').removeClass('selected');
        $(this).addClass('selected');
    });
    

    /* Time Limit sliders */
    $('.range-input').on('change mousemove', function (e) {
        let rangeInput = $(this).val();
        let rangeValue = $(this).parent().parent().find(".range-value");
        rangeValue.text(rangeInput);
    });

    $('.double-range-slider').on("change mousemove", function() {
        const selector = $(this).closest('.settings');
        selector.find('.range-value-1').text( $(this).val()+'%' );
        selector.find('input[name="earning_instructor_commission"]').val( $(this).val() )
        selector.find('.range-value-2').text( ( 100 - $(this).val() ) +'%' );
        selector.find('input[name="earning_admin_commission"]').val( 100 - $(this).val() )
    });
    

    $('#attempts-allowed-1').on('click', function (e) {
        if ($('#attempts-allowed-numer').prop("disabled", true)) {
            $(this).parent().parent().parent().addClass('active')
            $('#attempts-allowed-numer').prop("disabled", false);
        }
    });
    $('#attempts-allowed-2').on('click', function (e) {
        if ($('#attempts-allowed-2').is(':checked')) {
            $(this).parent().parent().parent().removeClass('active')
            $('#attempts-allowed-numer').prop("disabled", true);
        }
    });
    

});