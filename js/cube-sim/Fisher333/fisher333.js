"use strict";

/**
 * Cubic 3x3x3 Fisher puzzle namespace.
 * @namespace
 */
CUBES.Fisher333 = {};

/**
 * Fisher333 logical model
 * @class
 * @extends {CUBES.Cube333.Model}
 */
CUBES.Fisher333.Model = class Model extends CUBES.Cube333.Model{
  /**
   * Create Fisher cube Logic model.
   */
  constructor() {
    super();
    this.type = 'Fisher333';
    //Middle Slice Centers have orientation
    this.getSocket('F').piece.orientation = new CUBES.Orientation({
      state : 0, stateCount: 4, ignore: false
    });
    this.getSocket('B').piece.orientation = new CUBES.Orientation({
      state : 0, stateCount: 4, ignore: false
    });
    this.getSocket('L').piece.orientation = new CUBES.Orientation({
      state : 0, stateCount: 4, ignore: false
    });
    this.getSocket('R').piece.orientation = new CUBES.Orientation({
      state : 0, stateCount: 4, ignore: false
    });
    // Midddle slice edges have no orientation
    this.getSocket('FR').piece.orientation.ignore = true;
    this.getSocket('FL').piece.orientation.ignore = true;
    this.getSocket('BR').piece.orientation.ignore = true;
    this.getSocket('BL').piece.orientation.ignore = true;
  }
}
