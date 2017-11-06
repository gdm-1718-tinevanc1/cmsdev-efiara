<?php

namespace Drupal\efiara;

use Drupal\Core\Entity\EntityAccessControlHandler;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Access\AccessResult;

/**
 * Access controller for the Owner entity.
 *
 * @see \Drupal\efiara\Entity\Owner.
 */
class OwnerAccessControlHandler extends EntityAccessControlHandler {

  /**
   * {@inheritdoc}
   */
  protected function checkAccess(EntityInterface $entity, $operation, AccountInterface $account) {
    /** @var \Drupal\efiara\Entity\OwnerInterface $entity */
    switch ($operation) {
      case 'view':
        if (!$entity->isPublished()) {
          return AccessResult::allowedIfHasPermission($account, 'view unpublished owner entities');
        }
        return AccessResult::allowedIfHasPermission($account, 'view published owner entities');

      case 'update':
        return AccessResult::allowedIfHasPermission($account, 'edit owner entities');

      case 'delete':
        return AccessResult::allowedIfHasPermission($account, 'delete owner entities');
    }

    // Unknown operation, no opinion.
    return AccessResult::neutral();
  }

  /**
   * {@inheritdoc}
   */
  protected function checkCreateAccess(AccountInterface $account, array $context, $entity_bundle = NULL) {
    return AccessResult::allowedIfHasPermission($account, 'add owner entities');
  }

}
