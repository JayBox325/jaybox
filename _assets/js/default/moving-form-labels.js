if ($('.js-moving-labels').length > 0) {
    const $input = $('.form__input')

    function checkForInput(element) {
        const $label = $(element).siblings('label')

        if ($(element).val().length > 0) {
            $label.addClass('has-value')
        } else {
            $label.removeClass('has-value')
        }
    }
    
    // The lines below are executed on page load
    $input.each(function() {
        checkForInput(this)
    })

    // The lines below (inside) are executed on change & keyup
    $input.on('change keyup', function() {
        checkForInput(this)
    })
}