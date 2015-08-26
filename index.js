'use strict';
var $ = require('jquery');

/**
 * Smoothly scroll to location on current page.
 * @param el
 * @param options
 * @constructor
 */
function ScrollTo(el, options) {
  this.element = $(el);
  this.target = $(this.element.attr('href'));
  this.options = $.extend({}, ScrollTo.DEFAULTS_, options);

  if (typeof this.options.offset === 'string') {
    this.offset = $(this.options.offset).height();
  } else {
    this.offset = this.options.offset;
  }

  this.element.on('click', this.clickHandler_.bind(this));
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

  if ($.isFunction(this.options.offset)) {
    var offset = this.options.offset(this);
  }

  $(this.options.scrollContainer).stop().animate({
    scrollTop: this.target.offset().top - offset
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
