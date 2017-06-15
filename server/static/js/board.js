// masonry grid controller
$('.grid').masonry({
  itemSelector: '.grid-item',
  columnWidth: '.grid-sizer',
  gutter: '.gutter-sizer',
  percentPosition: true
});

function popluateBoard(bobbles) {
  var $bobbleList = $("#bobbles");
  for (var i = 0; i < bobbles.length; i++) {
    let $bob = $("<bob></bob>").addClass("grid-item")
      .attr('id', bobbles[i].value)
      .append(createBoardElement(bobbles[i]));
    $bobbleList.append(bob);
    // TODO: Bring randomization back in later
  }
}

function randomizeBobSize(bobID) {
  // randomly changes the size of the bob with bob_id
  var sizes = ["grid-item--width2", "grid-item--width3", "grid-item--height2",
    "grid-item--height3", "grid-item--height4"
  ];

  // this random feature is temporary
  var randIndex = Math.floor(Math.random() * sizes.length)
  $("#" + bobID).addClass(sizes[randIndex]);
}

function createBoardElement(bob) {

  switch (bob.type) {
    case 'text':
      html_element = document.createElement('p');
      html_element.innerHTML = bob.value;
      break;

    default:
      console.log("Unknown element type", bob.type);
      html_element = null;
  }

  return html_element;
}

function addBoardElement(new_bob) {

  var bobbles_list = $("#bobbles")
  var bob = $("<bob></bob>").addClass("grid-item")
  bob.append(createBoardElement(new_bob));

  //this id value needs to be relevant to the MongoDB id of new_bob
  var id = new_bob.value;
  bob.attr('id', id);
  bobbles_list.append(bob);
  console.log(new_bob.value + " Added to Board")
}

var socket = io();
socket.emit('connection');

socket.on('all_elements', popluateBoard);
socket.on('add_element', addBoardElement);


console.log('board.js is running');
