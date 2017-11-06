<?php

/**
 * @file
 * Contains renter.page.inc.
 *
 * Page callback for Renter entities.
 */

use Drupal\Core\Render\Element;

/**
 * Prepares variables for Renter templates.
 *
 * Default template: renter.html.twig.
 *
 * @param array $variables
 *   An associative array containing:
 *   - elements: An associative array containing the user information and any
 *   - attributes: HTML attributes for the containing element.
 */
function template_preprocess_renter(array &$variables) {
  // Fetch Renter Entity Object.
  $renter = $variables['elements']['#renter'];

  // Helpful $content variable for templates.
  foreach (Element::children($variables['elements']) as $key) {
    $variables['content'][$key] = $variables['elements'][$key];
  }
}
