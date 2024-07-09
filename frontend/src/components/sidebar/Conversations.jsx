import React from 'react'
import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";

export default function Conversations() {
	const { loading, conversations } = useGetConversations();
  return (
    <div className='py-2 flex flex-col overflow-auto'>
			{conversations.map((conversation, idx) => (
				<Conversation
					key={conversation._id}
					conversation={conversation}
    // The getRandomEmoji() function executes each time the Conversations component renders, and the
	//  returned value is passed as a prop to the Conversation component.
					emoji={getRandomEmoji()}
					lastIdx={idx === conversations.length - 1}
				/>
			))}
  
  {/* The loading spinner and the conversations list are controlled by different parts of the code:-
       The loading spinner is conditionally rendered based on the loading state.
          The conversations list is rendered based on the conversations state. */}
			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
	</div>
  )
}
