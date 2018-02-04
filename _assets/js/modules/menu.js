const $body = $('body'),
$hamburger = $('.menu__hamburger'),
$mask = $('.menu__mask'),
$checkbox = $('.menu__checkbox'),
$menuLink = $('.menu__link'),
activeMenuClass = 'menu-is-active'

// Hamburger click event
$hamburger.click(function() {
    if ($body.hasClass(activeMenuClass)) {
        $body.removeClass(activeMenuClass)
    } else {
        $body.addClass(activeMenuClass)
    }
})

// Link click event
$menuLink.click(function() {
    $body.removeClass(activeMenuClass)
    $checkbox.prop('checked', false)
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


function sticky() {

    const $header = $('.header')
    const $window = $(window)
    const stickyClass = 'is-sticky'
    const top = $header.offset().top + 1

    $window.scroll(function() {
        if ($window.scrollTop() >= top) {
            $header.addClass(stickyClass)
        } else {
            $header.removeClass(stickyClass)
        }
    })
}

export default { sticky }
