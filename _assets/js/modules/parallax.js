import skrollr from 'skrollr'

function parallax() {

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

export default { parallax }