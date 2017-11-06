<?php

/**
 * @file
 * Contains charging_points.page.inc.
 *
 * Page callback for Charging points entities.
 */

use Drupal\Core\Render\Element;

/**
 * Prepares variables for Charging points templates.
 *
 * Default template: charging_points.html.twig.
 *
 * @param array $variables
 *   An associative array containing:
 *   - elements: An associative array containing the user information and any
 *   - attributes: HTML attributes for the containing element.
 */
function template_preprocess_charging_points(array &$variables) {
  // Fetch ChargingPoints Entity Object.
  $charging_points = $variables['elements']['#charging_points'];

  // Helpful $content variable for templates.
  foreach (Element::children($variables['elements']) as $key) {
    $variables['content'][$key] = $variables['elements'][$key];
  }
}
