class ReadChatData{
    constructor(){
       
    }
 readData(){
   return fetch("../data/userData.json")
    .then(response => {
       return response.json();
     })
 }

 loadIndividualData(id){
     this.readData().then(data =>{
       var personObj =  data.filter(element => element.id === id)[0];
       var messages = personObj.messages.their.map(elem => {
                  return {'owner': 'their',...elem}})
            .concat(personObj.messages.yours.map(elem => {
                  return {'owner': 'yours',...elem}})).sort((d1, d2) => new Date(d1.timestamp) - new Date(d2.timestamp));
      
        document.getElementById('chatName').innerHTML = personObj.name;
         var chatDiv = document.createElement('div')
         chatDiv.style = 'overflow: auto'
         var chatHtml ='';
         messages.forEach(element => {
            var className; 
            var time = new Date(element.timestamp).getHours() + ":" + new Date(element.timestamp).getMinutes();
            if(element.owner === 'their')
            chatHtml += '<div class="their"><p><img src="'+ personObj.imageUrl +'"></img></p><div>'+ element.message+'</div><span class="fadedText time">'+ time+'</span></div>'

            else
            chatHtml += '<div class="yours"><div>'+ element.message+'</div><span class="fadedText">'+ time+'</span></div>'
         
         });
        //  chatHtml += '<input type="text">'
         chatDiv.innerHTML = chatHtml;
         document.getElementById('individualChat').appendChild(chatDiv);
         var inputDiv = document.createElement('div');
       //  inputDiv.innerHTML = '<input type="text" placeholder="Type your message" >'
       inputDiv.innerHTML = '<textarea type="text"> Type your message </textarea> '
         document.getElementById('individualChat').appendChild(inputDiv)

     })
 }



}