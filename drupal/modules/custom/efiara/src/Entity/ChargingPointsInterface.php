<?php

namespace Drupal\efiara\Entity;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityChangedInterface;
use Drupal\user\EntityOwnerInterface;

/**
 * Provides an interface for defining Charging points entities.
 *
 * @ingroup efiara
 */
interface ChargingPointsInterface extends  ContentEntityInterface, EntityChangedInterface, EntityOwnerInterface {

  // Add get/set methods for your configuration properties here.

  /**
   * Gets the Charging points name.
   *
   * @return string
   *   Name of the Charging points.
   */
  public function getName();

  /**
   * Sets the Charging points name.
   *
   * @param string $name
   *   The Charging points name.
   *
   * @return \Drupal\efiara\Entity\ChargingPointsInterface
   *   The called Charging points entity.
   */
  public function setName($name);

  /**
   * Gets the Charging points creation timestamp.
   *
   * @return int
   *   Creation timestamp of the Charging points.
   */
  public function getCreatedTime();

  /**
   * Sets the Charging points creation timestamp.
   *
   * @param int $timestamp
   *   The Charging points creation timestamp.
   *
   * @return \Drupal\efiara\Entity\ChargingPointsInterface
   *   The called Charging points entity.
   */
  public function setCreatedTime($timestamp);

  /**
   * Returns the Charging points published status indicator.
   *
   * Unpublished Charging points are only visible to restricted users.
   *
   * @return bool
   *   TRUE if the Charging points is published.
   */
  public function isPublished();

  /**
   * Sets the published status of a Charging points.
   *
   * @param bool $published
   *   TRUE to set this Charging points to published, FALSE to set it to unpublished.
   *
   * @return \Drupal\efiara\Entity\ChargingPointsInterface
   *   The called Charging points entity.
   */
  public function setPublished($published);

}
