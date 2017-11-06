<?php

namespace Drupal\efiara\Entity;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityChangedInterface;
use Drupal\user\EntityOwnerInterface;

/**
 * Provides an interface for defining Owner entities.
 *
 * @ingroup efiara
 */
interface OwnerInterface extends  ContentEntityInterface, EntityChangedInterface, EntityOwnerInterface {

  // Add get/set methods for your configuration properties here.

  /**
   * Gets the Owner name.
   *
   * @return string
   *   Name of the Owner.
   */
  public function getName();

  /**
   * Sets the Owner name.
   *
   * @param string $name
   *   The Owner name.
   *
   * @return \Drupal\efiara\Entity\OwnerInterface
   *   The called Owner entity.
   */
  public function setName($name);

  /**
   * Gets the Owner creation timestamp.
   *
   * @return int
   *   Creation timestamp of the Owner.
   */
  public function getCreatedTime();

  /**
   * Sets the Owner creation timestamp.
   *
   * @param int $timestamp
   *   The Owner creation timestamp.
   *
   * @return \Drupal\efiara\Entity\OwnerInterface
   *   The called Owner entity.
   */
  public function setCreatedTime($timestamp);

  /**
   * Returns the Owner published status indicator.
   *
   * Unpublished Owner are only visible to restricted users.
   *
   * @return bool
   *   TRUE if the Owner is published.
   */
  public function isPublished();

  /**
   * Sets the published status of a Owner.
   *
   * @param bool $published
   *   TRUE to set this Owner to published, FALSE to set it to unpublished.
   *
   * @return \Drupal\efiara\Entity\OwnerInterface
   *   The called Owner entity.
   */
  public function setPublished($published);

}
