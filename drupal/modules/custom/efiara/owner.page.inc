<?php

/**
 * @file
 * Contains owner.page.inc.
 *
 * Page callback for Owner entities.
 */

use Drupal\Core\Render\Element;

/**
 * Prepares variables for Owner templates.
 *
 * Default template: owner.html.twig.
 *
 * @param array $variables
 *   An associative array containing:
 *   - elements: An associative array containing the user information and any
 *   - attributes: HTML attributes for the containing element.
 */
function template_preprocess_owner(array &$variables) {
  // Fetch Owner Entity Object.
  $owner = $variables['elements']['#owner'];

  // Helpful $content variable for templates.
  foreach (Element::children($variables['elements']) as $key) {
    $variables['content'][$key] = $variables['elements'][$key];
  }
}
