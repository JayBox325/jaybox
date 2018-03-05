import skrollr from 'skrollr'
import inView from 'in-view'

function scroller() {
    // Setup Skrollr
    function skrollrInit() {
        const s = skrollr.init({
            render: function(data) {
                // Log the current scroll position
                //console.log(data.curTop);
            }
        })
    }

    // Initiate Skrollr if on large device
    if ($(window).width() > 767) {
        skrollrInit()
    }

    // Destroy Skrollr if on small device
    $(window).on('resize', function () {
        if ($(window).width() <= 767) {
            skrollr.init().destroy()
        } else {
            skrollrInit()
        }
    })
}

function reveal() {
    const inViewClass = 'is-in-view'

    // Offset
    inView.offset(40);
    
    inView('.fade-in')
        .on('enter', el => {
            $(el).css({
                opacity: '1'
            })
        })

    
    inView('.slide-in')
        .on('enter', el => {
            $(el).addClass(inViewClass)
        })
}

export default { reveal, scroller }