<?php

namespace Drupal\efiara;

use Drupal\Core\Entity\EntityAccessControlHandler;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Access\AccessResult;

/**
 * Access controller for the Renter entity.
 *
 * @see \Drupal\efiara\Entity\Renter.
 */
class RenterAccessControlHandler extends EntityAccessControlHandler {

  /**
   * {@inheritdoc}
   */
  protected function checkAccess(EntityInterface $entity, $operation, AccountInterface $account) {
    /** @var \Drupal\efiara\Entity\RenterInterface $entity */
    switch ($operation) {
      case 'view':
        if (!$entity->isPublished()) {
          return AccessResult::allowedIfHasPermission($account, 'view unpublished renter entities');
        }
        return AccessResult::allowedIfHasPermission($account, 'view published renter entities');

      case 'update':
        return AccessResult::allowedIfHasPermission($account, 'edit renter entities');

      case 'delete':
        return AccessResult::allowedIfHasPermission($account, 'delete renter entities');
    }

    // Unknown operation, no opinion.
    return AccessResult::neutral();
  }

  /**
   * {@inheritdoc}
   */
  protected function checkCreateAccess(AccountInterface $account, array $context, $entity_bundle = NULL) {
    return AccessResult::allowedIfHasPermission($account, 'add renter entities');
  }

}
