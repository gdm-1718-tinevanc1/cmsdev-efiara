<?php

namespace Drupal\efiara;

use Drupal\Core\Entity\EntityAccessControlHandler;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Access\AccessResult;

/**
 * Access controller for the Charging points entity.
 *
 * @see \Drupal\efiara\Entity\ChargingPoints.
 */
class ChargingPointsAccessControlHandler extends EntityAccessControlHandler {

  /**
   * {@inheritdoc}
   */
  protected function checkAccess(EntityInterface $entity, $operation, AccountInterface $account) {
    /** @var \Drupal\efiara\Entity\ChargingPointsInterface $entity */
    switch ($operation) {
      case 'view':
        if (!$entity->isPublished()) {
          return AccessResult::allowedIfHasPermission($account, 'view unpublished charging points entities');
        }
        return AccessResult::allowedIfHasPermission($account, 'view published charging points entities');

      case 'update':
        return AccessResult::allowedIfHasPermission($account, 'edit charging points entities');

      case 'delete':
        return AccessResult::allowedIfHasPermission($account, 'delete charging points entities');
    }

    // Unknown operation, no opinion.
    return AccessResult::neutral();
  }

  /**
   * {@inheritdoc}
   */
  protected function checkCreateAccess(AccountInterface $account, array $context, $entity_bundle = NULL) {
    return AccessResult::allowedIfHasPermission($account, 'add charging points entities');
  }

}
