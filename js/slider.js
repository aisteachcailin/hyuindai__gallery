$(document).ready(function(){

	$('.slider').slick({
		dots:true,
		slidesToShow:4,
        rows:2,
        speed: 600,
        infinite: false,
        slidesToScroll:4,
        appendDots: $('.pagination__numb'),
        prevArrow: $('.pagination__btn_prev'),
        nextArrow: $('.pagination__btn_next'),
		responsive:[
			{
				breakpoint: 1280,
				settings: {
					slidesToShow:2
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow:1
				}
			}
		]
	});

    $('.pagination__btn_start').click(function(event) {
        $('.slider').slick('goTo', 0);
    })
    // $('.pagination__btn_last').click(function(event) {
    //     $('.slider').slick('goTo', this.dataset.slickIndex);
    // });
    $('.pagination__btn_last').click(function(event) {
        $('.slider').slick('goTo', $('.slider__item').length-1);
    });

});