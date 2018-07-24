import _ from 'accordion'

// Alhadis basic Accordion package: https://github.com/Alhadis/Accordion#readme

if ($('.js-accordion').length > 0) {

    $('.js-accordion').each(function(i, el) {
        console.log('accordion set!')
        new Accordion(el, {
            onToggle: function(target){
                target.accordion.folds.forEach(fold => {
                    if(fold !== target)
                    fold.open = false
                })
            }
        })
    })
}