<?php

namespace Drupal\efiara\Entity;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityChangedInterface;
use Drupal\user\EntityOwnerInterface;

/**
 * Provides an interface for defining Bookings entities.
 *
 * @ingroup efiara
 */
interface bookingsInterface extends  ContentEntityInterface, EntityChangedInterface, EntityOwnerInterface {

  // Add get/set methods for your configuration properties here.

  /**
   * Gets the Bookings name.
   *
   * @return string
   *   Name of the Bookings.
   */
  public function getName();

  /**
   * Sets the Bookings name.
   *
   * @param string $name
   *   The Bookings name.
   *
   * @return \Drupal\efiara\Entity\bookingsInterface
   *   The called Bookings entity.
   */
  public function setName($name);

  /**
   * Gets the Bookings creation timestamp.
   *
   * @return int
   *   Creation timestamp of the Bookings.
   */
  public function getCreatedTime();

  /**
   * Sets the Bookings creation timestamp.
   *
   * @param int $timestamp
   *   The Bookings creation timestamp.
   *
   * @return \Drupal\efiara\Entity\bookingsInterface
   *   The called Bookings entity.
   */
  public function setCreatedTime($timestamp);

  /**
   * Returns the Bookings published status indicator.
   *
   * Unpublished Bookings are only visible to restricted users.
   *
   * @return bool
   *   TRUE if the Bookings is published.
   */
  public function isPublished();

  /**
   * Sets the published status of a Bookings.
   *
   * @param bool $published
   *   TRUE to set this Bookings to published, FALSE to set it to unpublished.
   *
   * @return \Drupal\efiara\Entity\bookingsInterface
   *   The called Bookings entity.
   */
  public function setPublished($published);

}
