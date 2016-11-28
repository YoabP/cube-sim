"use strict";
/**
 * Raycast controller. Invisible hitbox model recieves
 * raycast instructions and sends them to the visualization.
 * @class
 * @extends {CUBES.Cube333.Controller}
 */
CUBES.Fisher333.Controller = class Controller extends CUBES.Cube333.Controller{
  constructor(camera, controls, view) {
    super(camera, controls, view);
    // Move camera so cube is seen from the front at begging
    this.controls.position0.set(-3.5, 0, 3.5);
    this.controls.reset();
  }
}
