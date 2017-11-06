<?php

/**
 * @file
 * Contains owner_charging_points.page.inc.
 *
 * Page callback for Owner charging points entities.
 */

use Drupal\Core\Render\Element;

/**
 * Prepares variables for Owner charging points templates.
 *
 * Default template: owner_charging_points.html.twig.
 *
 * @param array $variables
 *   An associative array containing:
 *   - elements: An associative array containing the user information and any
 *   - attributes: HTML attributes for the containing element.
 */
function template_preprocess_owner_charging_points(array &$variables) {
  // Fetch OwnerChargingPoints Entity Object.
  $owner_charging_points = $variables['elements']['#owner_charging_points'];

  // Helpful $content variable for templates.
  foreach (Element::children($variables['elements']) as $key) {
    $variables['content'][$key] = $variables['elements'][$key];
  }
}
