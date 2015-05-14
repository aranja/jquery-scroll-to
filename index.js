'use strict';
var $ = require('jquery');

/**
 * Smoothly scroll to location on current page.
 * @param el
 * @param options
 * @constructor
 */
function ScrollTo(el, options) {
  this.el = $(el);
  this.target = $(this.el.attr('href'));
  this.options = $.extend({}, ScrollTo.DEFAULTS_, options);

  if (typeof this.options.offset === 'string') {
    this.options.offset = $(this.options.offset).height();
  }

  this.el.on('click', this.clickHandler_.bind(this));
}

/**
 * Default options
 * @type {{duration: number, easing: string, offset: number, scrollContainer: string}}
 * @private
 */
ScrollTo.DEFAULTS_ = {
  duration: 300,
  easing: 'swing',
  offset: 0,
  scrollContainer: 'html, body'
};

/**
 * Scroll logic
 * @param event
 * @private
 */
ScrollTo.prototype.clickHandler_ = function(event) {
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
    return;
  }

  event.preventDefault();

  $(this.options.scrollContainer).stop().animate({
    scrollTop: this.target.offset().top - this.options.offset
  }, this.options);
};

module.exports = ScrollTo;

/**
 * jQuery plugin
 * @param  {object} options - Override default options.
 */
$.fn.scrollTo = function(options) {
  return this.each(function() {
    new ScrollTo(this, options);
  });
};

/**
 * Data Attribute API
 */
$(function() {
  $('[data-scroll-to]').each(function() {
    $(this).scrollTo($(this).data());
  });
});
