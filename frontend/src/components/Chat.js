import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chat = () => {
    const [message, setMessage] = useState('');
    const [chat, setChat ]= useState([]);

    const sendMessage = async () => {
        if (message.trip()) {
            setChat([...chat, { user: 'You', text: message}]);
            setMessage('');
            try {
                const response = await axios.post('http://localhost:5001/api/chat', { message });
                setChat([...chat, { user: 'You', text: message }, { user: 'AI', text: response.data.text }]);
            } catch (error) {
                console.error('Error sending message:', error);
            }
            }
        }

    return ( 
        <div>
            <div>
                {chat.map((msg, index) => (
                    <p key={index}><strong>{msg.user}:</strong> {msg.text}</p>
                ))}
            </div>
            <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder='Type your message here...'
            ></input>
        </div>
    )
}