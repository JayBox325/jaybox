function social() {
    const $socialWindow = $('.js-social-window')

    $socialWindow.on('click', function() {
        console.log('clicked')
        window.open(this.href, "Social", "width=800, height=600")
        return false;
    })
}

export default { social }