import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);
// If the parent component of Conversations re-renders, then Conversations will re-render as well, even if its own
// props or state haven't changed.
// However, with useEffect and an empty dependency array, the getConversations function inside useEffect will only 
// run once when the Conversations component mounts for the first time. Subsequent re-renders caused by the parent 
// component will not trigger the getConversations function again.
	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				const res = await fetch("/api/users");
				const data = await res.json();
				if (data.error) {
					throw new Error(data.error);
				}
				setConversations(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
};
export default useGetConversations;