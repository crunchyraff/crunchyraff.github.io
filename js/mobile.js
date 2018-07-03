// Smooth scrolling

$('#view-work').on('click', function () {
    const images = $('#images').position().top;

    $('html, body').animate(
        {
            scrollTop: images
        },
        400
    );

});

$('#backtotop').on('click', function () {
    const landing = $('#landing').position().top;

    $('html, body').animate(
        {
            scrollTop: landing
        },
        400
    );

});

$(document).scroll(function () {
    var y = $(this).scrollTop();
    if (y > $(window).height()) {
        $('#backtotop').fadeIn();
        $('#topbtn').css('bottom', '10px');
    } else {
        $('#backtotop').fadeOut();
        $('#topbtn').css('bottom', '-100px');
    }
});