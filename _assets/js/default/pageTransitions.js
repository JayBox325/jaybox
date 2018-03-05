import Barba from 'barba.js'
import { skrollr, reveal } from './parallax.js'

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

Barba.Dispatcher.on('newPageReady', function(container) {
    // Get new target path
    // const getTarget = Barba.HistoryManager.history[Barba.HistoryManager.history.length-1],
    //     getNewUrl = getTarget.url,
    //     getPath = getNewUrl.split(".com"),
    //     newPath = getPath[getPath.length - 1]

    // smoothScroll.scroll(newPath)
    skrollr.skrollr()
    reveal.reveal()
})

Barba.Pjax.getTransition = function() {
  return FadeTransition
}

Barba.Prefetch.init()
Barba.Pjax.start()