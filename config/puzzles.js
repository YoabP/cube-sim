var avialablePuzzles = {
  "3x3x3":[
    {name: "Classic", type: "Cube333"}
  ]
}

module.exports.getTitle = function getTittle(type){
  for (var category in avialablePuzzles) {
    for (var i = 0; i < avialablePuzzles[category].length; i++) {
      if(avialablePuzzles[category][i].type === type){
        return `${category} ${avialablePuzzles[category][i].name}`;
      }
    }
  }
}
module.exports.avialable = avialablePuzzles;
