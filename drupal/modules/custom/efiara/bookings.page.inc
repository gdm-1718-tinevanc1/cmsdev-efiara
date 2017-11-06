<?php

/**
 * @file
 * Contains bookings.page.inc.
 *
 * Page callback for Bookings entities.
 */

use Drupal\Core\Render\Element;

/**
 * Prepares variables for Bookings templates.
 *
 * Default template: bookings.html.twig.
 *
 * @param array $variables
 *   An associative array containing:
 *   - elements: An associative array containing the user information and any
 *   - attributes: HTML attributes for the containing element.
 */
function template_preprocess_bookings(array &$variables) {
  // Fetch bookings Entity Object.
  $bookings = $variables['elements']['#bookings'];

  // Helpful $content variable for templates.
  foreach (Element::children($variables['elements']) as $key) {
    $variables['content'][$key] = $variables['elements'][$key];
  }
}
