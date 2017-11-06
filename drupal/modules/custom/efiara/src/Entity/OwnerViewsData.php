<?php

namespace Drupal\efiara\Entity;

use Drupal\views\EntityViewsData;

/**
 * Provides Views data for Owner entities.
 */
class OwnerViewsData extends EntityViewsData {

  /**
   * {@inheritdoc}
   */
  public function getViewsData() {
    $data = parent::getViewsData();

    // Additional information for Views integration, such as table joins, can be
    // put here.

    return $data;
  }

}
