class ReadChatData {
  constructor() {

  }
  readData() {                                //reading the entire userData.json file
    return fetch("../data/userData.json")
      .then(response => {
        return response.json();
      })
  }

  loadIndividualData(id) {
    this.readData().then(data => {
      var personObj = data.filter(element => element.id === id)[0];
      var messages = personObj.messages.their.map(elem => {                //Fetching msgs from the json file and adding a field owner(thier, yours)
        return { 'owner': 'their', ...elem }
      })
        .concat(personObj.messages.yours.map(elem => {
          return { 'owner': 'yours', ...elem }
        })).sort((d1, d2) => new Date(d1.timestamp) - new Date(d2.timestamp));

      document.getElementById('chatName').innerHTML = personObj.name;
      var chatDiv = document.createElement('div')
      chatDiv.style = 'overflow: auto'
      var chatHtml = '';
      messages.forEach(element => {

        var time = new Date(element.timestamp).getHours() + ":" + new Date(element.timestamp).getMinutes();
        if (element.owner === 'their')
          chatHtml += '<div class="their"><p><img src="' + personObj.imageUrl + '"></img></p><div>' + element.message + '</div><span class="fadedText time">' + time + '</span></div>'

        else
          chatHtml += '<div class="yours"><div>' + element.message + '</div><span class="fadedText">' + time + '</span></div>'

      });

      chatDiv.innerHTML = chatHtml;
      document.getElementById('individualChat').appendChild(chatDiv);
      var inputDiv = document.createElement('div');
      inputDiv.classList.add('textAreaInput');

      var msgElement = document.createElement('textarea')
      msgElement.setAttribute('id', 'messageArea');
      msgElement.setAttribute('placeholder', 'Type new message');


      msgElement.addEventListener('input', () => {

        msgElement.style.height = "";
        msgElement.style.height = Math.min(msgElement.scrollHeight, 200) + "px";   //fixing the max height of input to 200px
      })

      inputDiv.innerHTML += '<div class="sendIcon"> <img class="icon" style="blueviolet: white" src="../assets/icons/send.png"></div>'
      inputDiv.appendChild(msgElement)
      document.getElementById('individualChat').appendChild(inputDiv)

    })
  }

  searchMessages(input) {
    this.readData().then(data => {
      var messages = [];
      data.forEach(person => {
        messages.push(...person.messages.their.concat(person.messages.yours).map(
          (msg) => {
            return { 'imageUrl': person.imageUrl, 'name': person.name, ...msg }
          }))
      }
      )

      this.loadSearchData(messages.filter(elem => elem.message.includes(input)), input);
    })

  }
  loadSearchData(data, query) {
    document.getElementById('chatcontainer').innerHTML = "";
    data.forEach(element => {
      var elem = document.createElement('div');
      elem.classList.add('chat')

      var imageDiv = document.createElement('div')
      imageDiv.style.justifySelf = 'center';
      var imageTag = document.createElement('img')
      imageTag.src = element.imageUrl
      imageDiv.appendChild(imageTag)
      var lastMsgDiv = document.createElement('div')
      //var lastMsg = element.message.length > 20 ? element.message.slice(0,20)+'...' :element.message ;
      var lastMsg = element.message;
      var index = lastMsg.indexOf(query);
      lastMsgDiv.innerHTML = "<div class='boldText largeText'> " + element.name + "</div>";
      lastMsgDiv.innerHTML += "<div class='fadedText mediumText'>" + lastMsg.substring(index - 20 > 0 ? index - 20 : 0, index) +
        "<span class='highlight'>" + lastMsg.substring(index, index + query.length) + "</span>"
        + lastMsg.substring(index + query.length, lastMsg.length > 20 ? index + query.length : lastMsg.length) + "</div>";
      //lastMsgDiv.classList.add('border-bottom');

      var lastMsgTime = new Date(element.timestamp).getHours() + ":" + new Date(element.timestamp).getMinutes();
      var unreadMsg = document.createElement('div')
      unreadMsg.innerHTML = "<p>" + lastMsgTime + "</p>";
      //unreadMsg.classList.add('boldText')


      unreadMsg.classList.add('timeAndUnread', 'fadedText', 'mediumText')
      var borderElem = document.createElement('div')
      borderElem.className = 'border-bottom';
      borderElem.style = "grid-column:2/4; margin-right: 2em";


      elem.appendChild(imageDiv)
      elem.appendChild(lastMsgDiv);
      elem.appendChild(unreadMsg);
      elem.appendChild(borderElem)
      //elem.addEventListener('click', ()=>{openChatForUser(element.id)})
      //  chatElement.onclick = openChatForUser(element.id);
      document.getElementById('chatcontainer').appendChild(elem);
    });
  }
  readFavourites() {
    return fetch("../data/favourites.json")
      .then(response => {
        return response.json();
      })
  }
}
