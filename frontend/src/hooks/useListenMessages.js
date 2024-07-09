import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages } = useConversation();

	useEffect(() => {
//The socket object might not be immediately available when the useEffect hook first runs.This can happen if 
//the socket connection is still being established or if there's a delay in initialization.
		socket?.on("newMessage", (newMessage) => {
//The addition of shouldShake property to newMessage on the frontend and its inclusion in the messages array using 
// setMessages([...messages, newMessage]); does not affect your backend database schema.

// the shake animation occurs only on the receiver's side,the shouldShake property is being added to the message
// object in the useListenMessages hook, which only runs for received messages.
			newMessage.shouldShake = true;
			const sound = new Audio(notificationSound);
			sound.play();

//Sender's State Update: When the sender sends a message, the useSendMessage hook updates the sender's messages 
// state to include the new message.
//Receiver's State Update: When the receiver receives a message, the useListenMessages hook updates the receiver's 
// messages state to include the new message.
			setMessages([...messages, newMessage]);
		});
    // Cleanup function to remove the event listener
	//By adding the cleanup function, you ensure that event listeners are removed when no longer needed, keeping
	//  your app efficient and bug-free.
		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages]);
};
export default useListenMessages;