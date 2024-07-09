import { create } from "zustand";

const useConversation = create((set) => ({
	selectedConversation: null,
    //the first selectedConversation is the name of the state property you want to update, and the second
    // selectedConversation is the value of the parameter passed to the arrow function.
	setSelectedConversation: (selectedConversation) => set({ selectedConversation: selectedConversation }),
	messages: [],
	setMessages: (messages) => set({ messages:messages}),
}));

export default useConversation;