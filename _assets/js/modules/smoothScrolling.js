function scroll() {
  const $anchor = $('.js-smooth-scroll')
  const nav = $('.header')
  const nav_height = nav.outerHeight()

  $anchor.on('click', function(event) {
    const href = $(this).attr('href')

    if (this.hash !== "") {
      if (!href.charAt(0) == '#') {
        event.preventDefault()
      }

      const hash = this.hash
      $('html, body').animate({
        scrollTop: $(hash).offset().top - nav_height
      }, 800, function(){
        window.location.hash = hash;
      })
    }
  })

  // $(window).on("load", function () {
  //   var urlHash = window.location.href.split("#")[1]
  //   $('html,body').animate({
  //       scrollTop: $('#' + urlHash).offset().top
  //   }, 4000)
  // })
}

export default { scroll }