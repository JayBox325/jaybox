function scroll() {
    const $anchor = $('a')
    const offset = 60
    const currUrl = window.location.pathname

    // Animate down to section on page load if URL has it on the end
    if (window.location.hash) {
        setTimeout(function() {
            $('html, body').scrollTop(0)
            $('html, body').animate({
                scrollTop: $(window.location.hash).offset().top - offset
                }, 2000)
        }, 0)
    }


    // On click of anchor button
    $anchor.on('click', function(e) {
        const href = $(this).attr('href')
        const hash = this.hash

        // If link has a hash in it
        if (hash) {
            // If there is a URL before the hash, go to this page then scroll to hash
            if (href.charAt(0) !== '#') {
                
                // If the URL matches the current page
                if (currUrl == href.split('#')[0]) {
                    e.preventDefault()
                    $('html, body').animate({
                        scrollTop: $(hash).offset().top - offset
                    }, 2000)

                    console.log('url is current page')
                } else {
                    console.log('on the page!')
                }

            // If the anchor is within the same page as the button
            } else {
                e.preventDefault()
                $('html, body').animate({
                    scrollTop: $(hash).offset().top - offset
                }, 2000)
            }
        }
    })

}

export default { scroll }