"use strict";
/**
 * Represents a puzzle piece's orientation.
 * @class
 */
CUBES.Orientation = class Orientation {
  /**
   * Create orientation object.
   * @param {object} args - Object containing parameters.
   * @param {number} args.state - Initial orientation state.
   * @param {number} args.stateCount - Number of possible orientations.
   * @param {bool} args.ignore - If piece should ignore orientation.
   */
  constructor(args) {
    args = args? args : {};
    /**
     * Orientation state.
     * @type {number}
     */
    this.state = args.state? args.state : 0;
    /**
     * Original 'correct' state of orientation.
     * @type {number}
     */
    this.originalState = args.state? args.state : 0;
    /**
     * Number of possible states.
     * Used for state rotation.
     * @type {number}
     */
    this.stateCount = args.stateCount? args.stateCount : 1;
    /**
     * If orientation should be ignored.<br>
     * [isOriented]{@linkcode CUBES.Orientation#isOriented } always returns true if ignored.
     *
     * @type {bool}
     */
    this.ignore = args.ignore;
  }
  /**
   * Set piece orientation state.
   * @param {number} state - New state.
   */
  set(state){
    this.state = state;
  }
  /**
   * Change between orientation states.
   * @throws Works only on two state orientations.
   * Will throw error otherwise.
   */
  toggle(){
    if (this.stateCount != 2) throw "Can't toggle. stateCount: "+stateCount;
    this.state+=1;
    this.state%=2;
  }
  /**
   * Rotates orientation states.
   * @param {bool} CCW - If rotation should be counter ClockWise.
   */
  rotate(CCW){
    var offset = CCW? -1 : 1;
    this.state += offset;
    if (this.state < 0 )
      this.state = this.stateCount - 1;
    else {
      this.state%= this.stateCount;
    }
  }
  /**
   * Returns the new rotated state without changing the orientation's state.
   * @param {bool} CCW - If rotation should be counter ClockWise.
   * @returns {number} The orientation state created by the rotation.
   */
  rotatePeek(CCW){
    var prevOrientation = this.state;
    this.rotate(CCW);
    var newOrientation = this.state;
    this.state = prevOrientation;
    return newOrientation;
  }
  /**
   * Check if orientation is in the correct state.
   * @returns {bool} true if oriented, false otherwise.
   */
  isOriented(){
    return this.ignore? true: this.originalState === this.state;
  }
}
