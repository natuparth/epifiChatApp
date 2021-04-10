// let personData = require('./personData').personData;
 //import { personData } from './personData.js'
 //var personData ;

 var funcCallCount = 0;
function populateChatData(){
  const processChange = debounce(() => saveInput());
  document.getElementById('search').addEventListener('input', processChange)
  document.getElementById('chatcontainer').innerHTML="";
  document.getElementById('search').hidden = true;
       var readChatData = new ReadChatData();
       document.getElementById('container').style.display = 'grid';
      readChatData.readData().then((personData) => {
        document.getElementById('individualChat').style.display = 'none';
        var chatElement = document.getElementById('chatcontainer');
        personData.forEach(element => {
             var elem = document.createElement('div');
             elem.classList.add('chat')
             
             var imageDiv = document.createElement('div')
             imageDiv.style.justifySelf = 'center';
             var imageTag = document.createElement('img')
             imageTag.src = element.imageUrl
             imageDiv.appendChild(imageTag)
             var lastMsgDiv = document.createElement('div')
             
             var lastMsgObj = element.messages.their[element.messages.their.length - 1].timestamp 
             >
              element.messages.yours[element.messages.yours.length - 1].timestamp 
              ?
              element.messages.their[element.messages.their.length - 1]
             : element.messages.yours[element.messages.yours.length - 1] ;
             var lastMsg = lastMsgObj.message.length > 20 ? lastMsgObj.message.slice(0,20)+'...' :lastMsgObj.message ;
             lastMsgDiv.innerHTML = "<div class='boldText largeText'> "+element.name+"</div>";
             lastMsgDiv.innerHTML +="<div class='fadedText mediumText'>"+ lastMsg + "</div>";
            // lastMsgDiv.classList.add('border-bottom');
     
             var lastMsgTime = new Date(lastMsgObj.timestamp).getHours() + ":" + new Date(lastMsgObj.timestamp).getMinutes();
             var unreadMsg = document.createElement('div')
             unreadMsg.innerHTML = "<p>"+lastMsgTime+"</p>";
             unreadMsg.classList.add('timeAndUnread','boldText','mediumText')
     
             if(element.messages.unread == 0)
              unreadMsg.classList.add('fadedText')
             else            
              unreadMsg.innerHTML += "<p class='unread'>"+ element.messages.unread.toString() + "</p>" ;
             
             var borderElem = document.createElement('div')
             borderElem.className = 'border-bottom';
             borderElem.style="grid-column:2/4; margin-right: 2em"
             elem.appendChild(imageDiv)
             elem.appendChild(lastMsgDiv);
             elem.appendChild(unreadMsg);
             elem.appendChild(borderElem)
             elem.addEventListener('click', ()=>{openChatForUser(element.id)})
             //  chatElement.onclick = openChatForUser(element.id);
               chatElement.appendChild(elem);
        });
      })
    
}

window.onload = populateChatData;
function openChatForUser(id){
    document.getElementById('container').style.display= 'none';
    document.getElementById('individualChat').style.display = 'grid';
     populateContentForIndividualChat(id);
    
}

function populateContentForIndividualChat(id){
    document.getElementById('individualChat').innerHTML="";
    var readChatData = new ReadChatData();
     var nameHeader = document.createElement('div')
     var arrow = document.createElement('span');
     arrow.addEventListener('click',()=>{
       populateChatData();
     })
     arrow.style.float = 'left';
     arrow.innerHTML = '<i class="fa fa-arrow-left" style="margin-top: 1em"></i>';
     nameHeader.appendChild(arrow);
     var nameDiv = document.createElement('div')
     nameDiv.setAttribute('id', "chatName");
     nameDiv.className = 'boldText';
     nameDiv.style = 'float: left; margin-left: 1em; width: 90%; font-size: 25px';
     var activeNow = document.createElement('div');
     activeNow.classList.add('fadedText')
     activeNow.innerHTML = "<span style='font-size: 15px'>Active Now</span><span><i class='fa fa-circle' style='font-size:10px;color:green; margin-left: 5px'></i>";
     activeNow.style = "margin-left: 2.5em"
    // nameDiv.innerText = personData.filter((elem) => elem.id === id)[0].name;
     nameHeader.appendChild(nameDiv);
     nameHeader.appendChild(activeNow);
     document.getElementById('individualChat').appendChild(nameHeader);
     readChatData.loadIndividualData(id);



}

function searchBarVisiblity(status){
  if(status == "visible")
  document.getElementById('search').hidden = false;
  else 
  { 
    document.getElementById('search').hidden = true;
    populateChatData();
  }
  }

  function debounce(func, timeout = 1500){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}
function saveInput(){
  var readChatData = new ReadChatData();
  readChatData.searchMessages(document.getElementById('searchInput').value);
}

