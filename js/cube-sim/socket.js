//oddly named, it identifies the empty imaginary space that a piece occupies.
"use strict"
CUBES.Socket = class Socket {
  constructor(args) {
    args = args? args : {};
    this.piece  = args.piece? args.piece : null;
  }
}
