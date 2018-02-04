import Barba from 'barba.js'
import revealFunction from './scrollReveal.js'
import smoothScroll from './smoothScrolling.js'
import socialWindow from './social.js'

var FadeTransition = Barba.BaseTransition.extend({
  start: function() {
    Promise
      .all([this.newContainerLoading, this.fadeOut()])
      .then(this.fadeIn.bind(this))
  },

  fadeOut: function() {
    return $(this.oldContainer).animate({ opacity: 0 }).promise()
  },

  fadeIn: function() {

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    $(window).scrollTop(0); // scroll to top here

    var _this = this;
    var $el = $(this.newContainer);

    $(this.oldContainer).hide();

    $el.css({
      visibility: 'visible',
      opacity: 0
    })

    $el.animate({ opacity: 1 }, 400, function() {
      _this.done()
    })

  }
})

Barba.Dispatcher.on('transitionCompleted', function(container) {
  //revealFunction.reveal()
  socialWindow.social()
  smoothScroll.scroll()
})

Barba.Pjax.getTransition = function() {
  return FadeTransition
}

Barba.Prefetch.init()
Barba.Pjax.start()