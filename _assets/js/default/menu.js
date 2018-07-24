const $body = $('body'),
    $hamburger = $('.menu__hamburger'),
    $mask = $('.menu__mask'),
    $checkbox = $('.menu__checkbox'),
    $menuLink = $('.menu__link'),
    $menuList = $('.menu__list'),
    activeMenuClass = 'menu-is-active',
    activeClass = 'is-active'

// Find polyfill
const find = require("jspolyfill-array.prototype.find")

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


// Sticky header
const $header = $('.header'),
    $window = $(window),
    stickyClass = 'is-sticky',
    top = $header.offset().top + 1

$window.scroll(function() {
    if ($window.scrollTop() >= top) {
        $header.addClass(stickyClass)
    } else {
        $header.removeClass(stickyClass)
    }
})