<?php

namespace Drupal\efiara\Entity;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityChangedInterface;
use Drupal\user\EntityOwnerInterface;

/**
 * Provides an interface for defining Renter entities.
 *
 * @ingroup efiara
 */
interface RenterInterface extends  ContentEntityInterface, EntityChangedInterface, EntityOwnerInterface {

  // Add get/set methods for your configuration properties here.

  /**
   * Gets the Renter name.
   *
   * @return string
   *   Name of the Renter.
   */
  public function getName();

  /**
   * Sets the Renter name.
   *
   * @param string $name
   *   The Renter name.
   *
   * @return \Drupal\efiara\Entity\RenterInterface
   *   The called Renter entity.
   */
  public function setName($name);

  /**
   * Gets the Renter creation timestamp.
   *
   * @return int
   *   Creation timestamp of the Renter.
   */
  public function getCreatedTime();

  /**
   * Sets the Renter creation timestamp.
   *
   * @param int $timestamp
   *   The Renter creation timestamp.
   *
   * @return \Drupal\efiara\Entity\RenterInterface
   *   The called Renter entity.
   */
  public function setCreatedTime($timestamp);

  /**
   * Returns the Renter published status indicator.
   *
   * Unpublished Renter are only visible to restricted users.
   *
   * @return bool
   *   TRUE if the Renter is published.
   */
  public function isPublished();

  /**
   * Sets the published status of a Renter.
   *
   * @param bool $published
   *   TRUE to set this Renter to published, FALSE to set it to unpublished.
   *
   * @return \Drupal\efiara\Entity\RenterInterface
   *   The called Renter entity.
   */
  public function setPublished($published);

}
