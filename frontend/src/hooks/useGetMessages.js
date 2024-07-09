import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				const res = await fetch(`/api/messages/${selectedConversation._id}`);
				const data = await res.json();
				if (data.error) throw new Error(data.error);			
				setMessages(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) getMessages();
//The effect will only re-run if the _id property of selectedConversation changes.This is more specific and avoids
//unnecessary re-fetching of messages if other properties of selectedConversation(like fullName,profilePic etc) 
// change but _id remains the same.The ?. (optional chaining) ensures that if selectedConversation is null or 
// undefined, it won't cause an error.
	}, [selectedConversation?._id, setMessages]);
//Zustand,a state management library,typically provides stable function references.This means that the functions
//provided by Zustand (such as setMessages) don't change their reference between renders unless explicitly changed.
	return { messages, loading };
};
export default useGetMessages;