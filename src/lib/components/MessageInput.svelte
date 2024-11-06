<!-- src/lib/components/MessageInput.svelte -->
<script lang="ts">
	import { db } from '$lib/firebase';
	import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
	import { user } from '$lib/stores/userStore';
	let messageText: string = '';

	const sendMessage = async () => {
		if (messageText.trim() === '' || !$user) return;

		try {
			await addDoc(collection(db, 'messages'), {
				text: messageText,
				user: {
					uid: $user.uid,
					displayName: $user.displayName || 'Anonymous',
					photoURL: $user.photoURL || null
				},
				timestamp: serverTimestamp()
			});
			messageText = '';
		} catch (error) {
			console.error('Error sending message:', error);
			// Optionally, display an error message to the user
		}
	};
</script>

<div class="bottom-0 flex w-full items-center justify-center bg-base-200">
	<input
		type="text"
		bind:value={messageText}
		placeholder="Type a message..."
		class="input input-bordered m-4 w-full max-w-3xl"
		on:keydown={(e) => e.key === 'Enter' && sendMessage()}
	/>
</div>
