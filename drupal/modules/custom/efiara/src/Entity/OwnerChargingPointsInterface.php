<?php

namespace Drupal\efiara\Entity;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityChangedInterface;
use Drupal\user\EntityOwnerInterface;

/**
 * Provides an interface for defining Owner charging points entities.
 *
 * @ingroup efiara
 */
interface OwnerChargingPointsInterface extends  ContentEntityInterface, EntityChangedInterface, EntityOwnerInterface {

  // Add get/set methods for your configuration properties here.

  /**
   * Gets the Owner charging points name.
   *
   * @return string
   *   Name of the Owner charging points.
   */
  public function getName();

  /**
   * Sets the Owner charging points name.
   *
   * @param string $name
   *   The Owner charging points name.
   *
   * @return \Drupal\efiara\Entity\OwnerChargingPointsInterface
   *   The called Owner charging points entity.
   */
  public function setName($name);

  /**
   * Gets the Owner charging points creation timestamp.
   *
   * @return int
   *   Creation timestamp of the Owner charging points.
   */
  public function getCreatedTime();

  /**
   * Sets the Owner charging points creation timestamp.
   *
   * @param int $timestamp
   *   The Owner charging points creation timestamp.
   *
   * @return \Drupal\efiara\Entity\OwnerChargingPointsInterface
   *   The called Owner charging points entity.
   */
  public function setCreatedTime($timestamp);

  /**
   * Returns the Owner charging points published status indicator.
   *
   * Unpublished Owner charging points are only visible to restricted users.
   *
   * @return bool
   *   TRUE if the Owner charging points is published.
   */
  public function isPublished();

  /**
   * Sets the published status of a Owner charging points.
   *
   * @param bool $published
   *   TRUE to set this Owner charging points to published, FALSE to set it to unpublished.
   *
   * @return \Drupal\efiara\Entity\OwnerChargingPointsInterface
   *   The called Owner charging points entity.
   */
  public function setPublished($published);

}
