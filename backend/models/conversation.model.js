import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
	{
		participants: [
			{
    //type: mongoose.Schema.Types.ObjectId specifies that the type of each item in the array is an ObjectId.
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		messages: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Message",
				default: [],
			},
		],
	},
	{ timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;

// messages: {
//     type: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Message"
//         },
//     ],
//     default: [] // Default value for the messages array
// }