import React, { useEffect, useState } from "react";
import './Chat.css'

function Chat({ socket, userName, roomName }) {

  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        roomName,
        userName,
        currentMessage,
        time: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`
      }

      await socket.emit('send_message', messageData)
      console.log('in send', messageData, messageList)
      setMessageList([...messageList, messageData]);
      setCurrentMessage('')
    }
  }

  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log(typeof data, data)
      setMessageList([...messageList, data])
    })
  })

  return (
    <div>
      <div className='chat-header'>
        <p>You are in the {roomName}</p>
      </div>
      <div className='chat-body'>
        {messageList.map((message, i) => {
          return <div key={i} id={message.userName === userName ? 'my-message' : 'others-message'}>
            <p>{message.currentMessage}</p>
            <p>Sent by: {message.userName}</p>
            <p>at: {message.time}</p>
          </div>
        })}
      </div>
      <div className='chat-footer'>
        <input type='text' placeholder='Type a message' value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} />
        <button onClick={sendMessage} onKeyPress={(e) => e.key === 'Enter' && sendMessage()}>&#9658;</button>
      </div>
    </div>
  )
}

export default Chat;