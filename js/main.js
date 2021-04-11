
function populateChatData() {
  const processChange = throttle((input) => searchMessages(input));

  //adding listener for search bar input
  document.getElementById('search').addEventListener('input', processChange)
  document.getElementById('chatcontainer').innerHTML = "";
  document.getElementById('favourites').innerHTML = "";
  document.getElementById('search').hidden = true;
  var readChatData = new ReadChatData();                        //defining an instance of class ReadChatData
  populateFavourites(readChatData);                             //populating favourites container
  document.getElementById('container').style.display = 'grid';
  readChatData.readData().then((personData) => {                  //reading data from userData.json file using the method from ReadChatData class
    document.getElementById('individualChat').style.display = 'none';
    var chatElement = document.getElementById('chatcontainer');
    personData.forEach(element => {
      var chatListItem = createChatItem(element);         //creating chatListItems for all friends
      chatElement.appendChild(chatListItem);
    });
  })

}

window.onload = populateChatData;
function openChatForUser(id) {                        //Used to toggle the displays between chat list and individual chats
  document.getElementById('container').style.display = 'none';
  document.getElementById('individualChat').style.display = 'grid';
  populateContentForIndividualChat(id);

}

function createChatItem(element) {
  var elem = document.createElement('div');                       //Creating a div for each person 
  elem.classList.add('chat')

  var imageDiv = document.createElement('div')
  imageDiv.style.justifySelf = 'center';
  var imageTag = document.createElement('img')
  imageTag.src = element.imageUrl
  imageDiv.appendChild(imageTag)
  var lastMsgDiv = document.createElement('div')

  var lastMsgObj = element.messages.their[element.messages.their.length - 1].timestamp   //Finding the last msg based on timestamp
    >
    element.messages.yours[element.messages.yours.length - 1].timestamp
    ?
    element.messages.their[element.messages.their.length - 1]
    : element.messages.yours[element.messages.yours.length - 1];
  var lastMsg = lastMsgObj.message.length > 20 ? lastMsgObj.message.slice(0, 20) + '...' : lastMsgObj.message;   //slicing the msg if length>20
  lastMsgDiv.innerHTML = "<div class='boldText largeText'> " + element.name + "</div>";
  lastMsgDiv.innerHTML += "<div class='fadedText mediumText'>" + lastMsg + "</div>";


  var lastMsgTime = new Date(lastMsgObj.timestamp).getHours() + ":" + new Date(lastMsgObj.timestamp).getMinutes();
  var unreadMsg = document.createElement('div')
  unreadMsg.innerHTML = "<p style='margin-left: 1.0em'>" + lastMsgTime + "</p>";
  unreadMsg.classList.add('timeAndUnread', 'boldText', 'mediumText')

  if (element.messages.unread == 0)
    unreadMsg.classList.add('fadedText')
  else
    unreadMsg.innerHTML += "<p class='unread'>" + element.messages.unread.toString() + "</p>";

  var borderElem = document.createElement('div')
  borderElem.className = 'border-bottom';
  borderElem.style = "grid-column:2/4; margin-right: 2em"
  elem.appendChild(imageDiv)
  elem.appendChild(lastMsgDiv);
  elem.appendChild(unreadMsg);
  elem.appendChild(borderElem)
  elem.addEventListener('click', () => { openChatForUser(element.id) })
  return elem;
}
function populateContentForIndividualChat(id) {
  document.getElementById('individualChat').innerHTML = "";
  var readChatData = new ReadChatData();
  var nameHeader = document.createElement('div')
  var arrow = document.createElement('span');
  arrow.addEventListener('click', () => {
    populateChatData();
  })
  arrow.style = 'float: left; margin-top: 0.7em';
  arrow.innerHTML = '<i style="margin-top: 1em"><img class="icon" src="./assets/icons/back.jpg"></i>';
  var dotIcons = document.createElement('div')
  dotIcons.style = "float: right";
  dotIcons.innerHTML = "<img class='icon' src='./assets/icons/dots.jfif'>"
  nameHeader.appendChild(arrow);
  nameHeader.appendChild(dotIcons);
  var nameDiv = document.createElement('div')
  nameDiv.setAttribute('id', "chatName");
  nameDiv.className = 'boldText';
  nameDiv.style = 'float: left; margin-left: 0.4em; width: 80%; font-size: 25px';
  var activeNow = document.createElement('div');
  activeNow.classList.add('fadedText')
  activeNow.innerHTML = "<span style='font-size: 15px'>Active Now</span><span><img src='../assets/icons/greenDot.png' class='smallIcon' style='font-size:10px;color:green; margin-left: 5px'>";
  activeNow.style = "margin-left: 2.5em"
  nameHeader.appendChild(nameDiv);
  nameHeader.appendChild(activeNow);
  document.getElementById('individualChat').appendChild(nameHeader);
  readChatData.loadIndividualData(id);       //Loading messages for an individual chat
}

function searchBarVisiblity(status) {
  if (status == "visible"){
    document.getElementById('search').style.display = 'flex';
    document.getElementById('searchInput').value = '';
  }
  else {
    document.getElementById('search').style.display = 'none';
    populateChatData();
  }
}

function throttle(getFilteredMessages, timeout = 1000) {               //Function used to throttle requests withing 1 second(in case a user is typing very fast)
  let timer;
  return (input) => {
    clearTimeout(timer);
    timer = setTimeout(() => { getFilteredMessages.apply(this, input); }, timeout);
  };
}
function searchMessages() {                                             //Search messages based on query
  var readChatData = new ReadChatData();
  readChatData.searchMessages(document.getElementById('searchInput').value);
}
function populateFavourites(readChatData) {            //Function for populating favourites container
  var favouritesContainer = document.getElementById('favourites');
  var favouritesText = document.createElement('span')
  favouritesText.style = "font-size: small; font-family: cursive";
  favouritesText.className = "fadedText";
  favouritesText.innerText = "Favourites";
  favouritesContainer.appendChild(favouritesText);
  var favouritesList = document.createElement('div')
  favouritesList.className = "favPeople";
  favouritesList.style = "font-family: cursive"
  readChatData.readFavourites().then((favourites) => {                    //Calling readFavourites method from class ReadChatData class
    favourites.forEach((elem) => {
      var favElement = document.createElement('div')
      favElement.className = "person";

      if (elem.active == true)
        favElement.innerHTML = '<img class="selected" src="' + elem.imageUrl + '">' + '<span style="font-size: small">'+elem.name+'</span>';
      else
        favElement.innerHTML = '<img src="' + elem.imageUrl + '">' + '<span style="font-size: small" >' + elem.name +' </span>'
      favouritesList.appendChild(favElement)


    })
    favouritesContainer.appendChild(favouritesList);
    var bottomBorder = document.createElement('div')
    bottomBorder.className = "border-bottom"
    favouritesContainer.appendChild(bottomBorder)
  })

}

