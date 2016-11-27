var availablePuzzles = {
  "3x3x3":[
    {name: "Classic", type: "Cube333"},
    {name: "Mirror", type: "Mirror333"},
    {name: "Fisher", type: "Fisher333"},
  ],
  "Square 1":[
    {name: "Classic", type: "Square1"}
  ]
}

module.exports.getTitle = function getTittle(type){
  for (var category in availablePuzzles) {
    for (var i = 0; i < availablePuzzles[category].length; i++) {
      if(availablePuzzles[category][i].type === type){
        return `${category} ${availablePuzzles[category][i].name}`;
      }
    }
  }
}
module.exports.available = availablePuzzles;
