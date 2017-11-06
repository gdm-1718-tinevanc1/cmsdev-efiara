<?php

namespace Drupal\efiara;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\EntityListBuilder;
use Drupal\Core\Link;

/**
 * Defines a class to build a listing of Owner charging points entities.
 *
 * @ingroup efiara
 */
class OwnerChargingPointsListBuilder extends EntityListBuilder {


  /**
   * {@inheritdoc}
   */
  public function buildHeader() {
    $header['id'] = $this->t('Owner charging points ID');
    $header['name'] = $this->t('Name');
    return $header + parent::buildHeader();
  }

  /**
   * {@inheritdoc}
   */
  public function buildRow(EntityInterface $entity) {
    /* @var $entity \Drupal\efiara\Entity\OwnerChargingPoints */
    $row['id'] = $entity->id();
    $row['name'] = Link::createFromRoute(
      $entity->label(),
      'entity.owner_charging_points.edit_form',
      ['owner_charging_points' => $entity->id()]
    );
    return $row + parent::buildRow($entity);
  }

}
