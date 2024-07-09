import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";

import React from 'react'

export default function MessageContainer() {
	const { selectedConversation, setSelectedConversation } = useConversation();
//  Including setSelectedConversation in the dependency array ensures that the effect will run only if the reference
//  to setSelectedConversation changes. In practice, this reference typically does not change, so the effect runs 
//  only on mount and unmount.
	useEffect(() => {
		// cleanup function (unmounts)
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

  return (
    <div className='md:min-w-[450px] flex flex-col'>
			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
					{/* Header */}
					<div className='bg-slate-500 px-4 py-2 mb-2'>
						<span className='label-text'>To:</span>{" "}
						<span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
					</div>
					<Messages />
					<MessageInput />
				</>
			)}
		</div>
  )
}

const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>{`Welcome 👋 ${authUser.fullName} ❄`}</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};


// Initial Mount: useEffect sets up a cleanup function that will reset selectedConversation to null when the 
// component unmounts.
// Usage: During the component's lifecycle, selectedConversation can change based on user interactions.
// Unmount: When the component unmounts (for instance, when logging out or navigating away), React executes the
//  cleanup function to ensure proper state management.