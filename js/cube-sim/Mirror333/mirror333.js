"use strict";

/**
 * Cubic 3x3x3 Mirror puzzle namespace.
 * @namespace
 */
CUBES.Mirror333 = {};

/**
 * Mirror333 logical model
 * @class
 * @extends {CUBES.Cube333.Model}
 */
CUBES.Mirror333.Model = class Model extends CUBES.Cube333.Model{
  /**
   * Create Mirror Logic model.
   */
  constructor() {
    super();
    this.type = 'Mirror333';
  }
}
