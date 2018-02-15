import multipleJs from 'multiple.js'

const $body = $('body'),
$hamburger = $('.menu__hamburger'),
$mask = $('.menu__mask'),
$checkbox = $('.menu__checkbox'),
$menuLink = $('.menu__link'),
$menuList = $('.menu__list'),
activeMenuClass = 'menu-is-active',
activeClass = 'is-active'

// Hamburger click event
$hamburger.click(function() {
    if ($body.hasClass(activeMenuClass)) {
        $body.removeClass(activeMenuClass)
    } else {
        $body.addClass(activeMenuClass)
    }
})

// Link click event
$menuLink.click(function(e) {
    $body.removeClass(activeMenuClass)
    $checkbox.prop('checked', false)
    $menuLink.removeClass(activeClass)
    $(this).addClass(activeClass)
})

// Mask click event
$mask.click(function() {
    if ($body.hasClass(activeMenuClass)) {
        $body.removeClass(activeMenuClass)
        $checkbox.prop('checked', false)
    } else {
        $body.addClass(activeMenuClass)
    }
})

$menuLink.hover(function() {
    let data = $(this).data('title')
    $menuList.attr('data-title', data)
    $menuList.toggleClass('is-hovered')
})



// Sticky header
// function sticky() {

//     const $header = $('.header')
//     const $window = $(window)
//     const stickyClass = 'is-sticky'
//     const top = $header.offset().top + 1

//     $window.scroll(function() {
//         if ($window.scrollTop() >= top) {
//             $header.addClass(stickyClass)
//         } else {
//             $header.removeClass(stickyClass)
//         }
//     })


//     // Adding active states on scroll
//     const sections = $('.js-content-section')
//     const nav = $('nav')
//     const nav_height = nav.outerHeight()

//     $(window).on('scroll', function () {

//         // current position
//         const cur_pos = $(this).scrollTop()

//         // iterate over each of the sections
//         sections.each(function() {
//             const top = $(this).offset().top - nav_height
//             const bottom = top + $(this).outerHeight()

//             if (cur_pos >= top && cur_pos <= bottom) {
//                 nav.find('a').removeClass('is-active')
//                 sections.removeClass('is-active')

//                 $(this).addClass('is-active')
//                 nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('is-active')
//             } else {
//                 $(this).removeClass('is-active')
//                 nav.find('a[href="#'+$(this).attr('id')+'"]').removeClass('is-active')
//             }
//         })
//     })

// }

// export default { sticky }