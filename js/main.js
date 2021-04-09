// let personData = require('./personData').personData;
 //import { personData } from './personData.js'
 //var personData ;
function populateChatData(){
       var readChatData = new ReadChatData();

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
             var lastMsg = lastMsgObj.message;
             lastMsgDiv.innerHTML = "<div class='boldText'> "+element.name+"</div>";
             lastMsgDiv.innerHTML +="<div class='fadedText'>"+ lastMsg + "</div>";
             lastMsgDiv.classList.add('border-bottom');
     
             var lastMsgTime = new Date(lastMsgObj.timestamp).getHours() + ":" + new Date(lastMsgObj.timestamp).getMinutes();
             var unreadMsg = document.createElement('div')
             unreadMsg.innerHTML = "<p>"+lastMsgTime+"</p>";
             unreadMsg.classList.add('boldText')
     
             if(element.messages.unread == 0)
              unreadMsg.classList.add('fadedText')
             else            
              unreadMsg.innerHTML += "<p class='unread'>"+ element.messages.unread.toString() + "</p>" ;
             
             
             elem.appendChild(imageDiv)
             elem.appendChild(lastMsgDiv);
             elem.appendChild(unreadMsg);
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
    var readChatData = new ReadChatData();
     var nameHeader = document.createElement('div')
     var arrow = document.createElement('span');
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


// let personData = [
//     {
//      name: 'Parth Natu',
//      id: 1,
//      imageUrl: 'assets/AVATAR/image_part_001.jpg',
//      messages: {
//          their: [
//              {message: 'hello', timestamp: new Date(2018, 11, 24, 10, 33, 30, 0)},
//              {message: "I'm good! How are you?",  timestamp: new Date(2018, 11, 24, 10, 33, 34, 0) },
//              {message: "I'm good! How are you?",  timestamp: new Date(2018, 11, 24, 10, 33, 38, 0) },
//              {message: "I'm good! How are you?",  timestamp: new Date(2018, 11, 24, 10, 33, 40, 0) },
//              {message: "I'm good! How are you?",  timestamp: new Date(2018, 11, 24, 10, 33, 42, 0) }
//          ],
//          yours: [
//           {message: 'hello! how are you', timestamp: new Date(2018, 11, 24, 10, 31, 30, 0)}, 
//           {message: "I'm doing great! Thanks for asking", timestamp: new Date(2018, 11, 24, 10, 35, 30, 0)},
        
//          ],
//          unread: 12
//       }
//     },
//     {
//       name: 'Samarth Joshi',
//       id: 2,
//       imageUrl: 'assets/AVATAR/image_part_002.jpg',
//       messages: {
//           their: [
//               {message: 'hello', timestamp: new Date(2018, 11, 24, 10, 33, 30, 0)},
//               {message: "I'm good! How are you?",  timestamp: new Date(2018, 11, 24, 10, 33, 34, 0) },
//               {message: "I'm good! How are you?",  timestamp: new Date(2018, 11, 24, 10, 33, 38, 0) },
//               {message: "I'm good! How are you?",  timestamp: new Date(2018, 11, 24, 10, 33, 40, 0) },
//               {message: "I'm good! How are you?",  timestamp: new Date(2018, 11, 24, 10, 33, 42, 0) }
//           ],
//           yours: [
//            {message: 'hello! how are you', timestamp: new Date(2018, 11, 24, 10, 31, 30, 0)}, 
//            {message: "I'm doing great! Thanks for asking", timestamp: new Date(2018, 11, 24, 10, 35, 30, 0)},
         
//           ],
//           unread: 3
//        }
//      },
//      {
//       name: 'Lokesh Karkare',
//       id: 3,
//       imageUrl: 'assets/AVATAR/image_part_003.jpg',
//       messages: {
//           their: [
//               {message: 'hello', timestamp: new Date(2018, 11, 24, 10, 33, 30, 0)},
//               {message: "I'm good! How are you?",  timestamp: new Date(2018, 11, 24, 10, 33, 34, 0) },
//               {message: "I'm good! How are you?",  timestamp: new Date(2018, 11, 24, 10, 33, 38, 0) },
//               {message: "I'm good! How are you?",  timestamp: new Date(2018, 11, 24, 10, 33, 40, 0) },
//               {message: "I'm good! How are you?",  timestamp: new Date(2018, 11, 24, 10, 33, 42, 0) }
//           ],
//           yours: [
//            {message: 'hello! how are you', timestamp: new Date(2018, 11, 24, 10, 31, 30, 0)}, 
//            {message: "I'm doing great! Thanks for asking", timestamp: new Date(2018, 11, 24, 10, 35, 30, 0)},
         
//           ],
//           unread: 0
//        }
//      },
//      {
//       name: 'Satyam Singh',
//       id: 4,
//       imageUrl: 'assets/AVATAR/image_part_004.jpg',
//       messages: {
//           their: [
//               {message: 'hello', timestamp: new Date(2018, 11, 24, 10, 33, 30, 0)},
//               {message: "I'm good! How are you?",  timestamp: new Date(2018, 11, 24, 10, 33, 34, 0) },
//               {message: "I'm good! How are you?",  timestamp: new Date(2018, 11, 24, 10, 33, 38, 0) },
//               {message: "I'm good! How are you?",  timestamp: new Date(2018, 11, 24, 10, 33, 40, 0) },
//               {message: "I'm good! How are you?",  timestamp: new Date(2018, 11, 24, 10, 33, 42, 0) }
//           ],
//           yours: [
//            {message: 'hello! how are you', timestamp: new Date(2018, 11, 24, 10, 31, 30, 0)}, 
//            {message: "I'm doing great! Thanks for asking", timestamp: new Date(2018, 11, 24, 10, 36, 30, 0)},
         
//           ],
//           unread: 0
//        }
//      },
  
  
//   ];
