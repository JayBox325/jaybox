import skrollr from 'skrollr'

function reveal() {
    (function($) {
        const s = skrollr.init({
            render: function(data) {
                //Debugging - Log the current scroll position.
                console.log(data.curTop);
            }
        })
    })
}

export default { reveal }