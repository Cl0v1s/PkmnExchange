var FileAPI = require('@jeremejevs/file-api')
  , File = FileAPI.File
  , FileList = FileAPI.FileList
  , FileReader = FileAPI.FileReader
  ;
var mime=require('node-mime');

let Save = require("./Save");

let reader = new FileReader();
reader.readAsArrayBuffer(new File("./prism.sav"));

reader.addEventListener("load", function(ev)
{
    let buffer = new ArrayBuffer(ev.target.result.length);
    var view = new Uint8Array(buffer);
    for (var i = 0; i < ev.target.result.length; ++i) {
        view[i] = ev.target.result[i];
    }
    let save = new Save(buffer);
    save.getTeam();
});