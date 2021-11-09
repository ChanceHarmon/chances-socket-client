
import './App.css';
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './Chat.js'


// const socket = io.connect('http://localhost:3001')
// Switch of local versus live deployment
const socket = io.connect('https://chances-socket-server.herokuapp.com/')

function App() {

  const [userName, setUserName] = useState('');
  const [roomName, setRoomName] = useState('');
  const [joinedRoom, setJoinedRoom] = useState(false);
  const joinRoom = () => {
    if (userName !== '' && roomName !== '') {
      socket.emit('join_room', roomName)
      setJoinedRoom(true)
    }
  }

  return (
    <div className="App">
      <h3>Welcome to my chat box</h3>
      {!joinedRoom ?
        (<div>
          <input type='text' placeholder='Enter your name' onChange={(e) => setUserName(e.target.value)} />
          <input type='text' placeholder='Enter Room Name' onChange={(e) => setRoomName(e.target.value)} />
          <button onClick={joinRoom}>Join A Room</button>
        </div>) :
        <Chat socket={socket} userName={userName} roomName={roomName} />

      }



    </div>

  );
}

export default App;
