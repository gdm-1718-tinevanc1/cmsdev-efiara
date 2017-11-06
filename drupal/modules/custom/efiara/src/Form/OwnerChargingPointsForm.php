<?php

namespace Drupal\efiara\Form;

use Drupal\Core\Entity\ContentEntityForm;
use Drupal\Core\Form\FormStateInterface;

/**
 * Form controller for Owner charging points edit forms.
 *
 * @ingroup efiara
 */
class OwnerChargingPointsForm extends ContentEntityForm {

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    /* @var $entity \Drupal\efiara\Entity\OwnerChargingPoints */
    $form = parent::buildForm($form, $form_state);

    $entity = $this->entity;

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function save(array $form, FormStateInterface $form_state) {
    $entity = &$this->entity;

    $status = parent::save($form, $form_state);

    switch ($status) {
      case SAVED_NEW:
        drupal_set_message($this->t('Created the %label Owner charging points.', [
          '%label' => $entity->label(),
        ]));
        break;

      default:
        drupal_set_message($this->t('Saved the %label Owner charging points.', [
          '%label' => $entity->label(),
        ]));
    }
    $form_state->setRedirect('entity.owner_charging_points.canonical', ['owner_charging_points' => $entity->id()]);
  }

}
