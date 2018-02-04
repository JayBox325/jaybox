// import { TweenLite, Elastic, CSSPlugin, TimelineLite } from "gsap"

// // Elements
// const $vertical = $('.js-p-vertical')

// // Timeline
// const tl = new TimelineLite({paused:true})

// $vertical.each(function(i, box){
//     var $element = $(box);
//     TweenLite.staggerTo($element, 0.3, {css:{ y:500 }, ease:Back.easeOut})
// })

// $(window).scroll(function(e){
//     const scrollTop = $(window).scrollTop()
//     const docHeight = $(document).height()
//     const winHeight = $(window).height()
//     const scrollPercent = (scrollTop) / (docHeight - winHeight)

//     tl.progress( scrollPercent ).pause()
// })