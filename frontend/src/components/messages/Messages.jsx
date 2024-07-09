import Message from "./Message";
import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import useListenMessages from "../../hooks/useListenMessages";
import React from 'react'

export default function Messages() {
	const { messages, loading } = useGetMessages();
	useListenMessages();
	const lastMessageRef = useRef(null);

// When you set the state in React, the changes don't immediately reflect in the DOM. React batches updates and then
// applies them efficiently. Without setTimeout, your attempt to scroll to the last message might execute before
// the DOM is actually updated, which means it won't scroll to the correct position.
	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

  return (
    <div className='px-4 flex-1 overflow-auto'>
			{!loading &&
				messages.length > 0 &&
				messages.map((message,index) => (
// lastMessageRef is conditionally attached to the last message element during rendering, ensuring that 
// lastMessageRef.current always points to the last message element. This allows the useEffect to scroll to the 
// bottom of the messages list whenever messages updates, providing a smooth user experience in a chat interface.
					<div key={message._id} ref={index === messages.length - 1 ? lastMessageRef : null}>
						<Message message={message} />
					</div>
				))}
  {/* [...Array(3)] creates an array with three undefined elements ([undefined, undefined, undefined]),ensures exactly 
     three <MessageSkeleton /> components are rendered */}
			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
			{!loading && messages.length === 0 && (
				<p className='text-center text-white'>Send a message to start the conversation</p>
			)}
		</div>
  )
}
