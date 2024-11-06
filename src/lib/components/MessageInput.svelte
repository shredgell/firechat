<script lang="ts">
	import { db, auth } from '$lib/firebase';
	import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
	import type { User } from 'firebase/auth';

	let messageText: string = '';
	const currentUser: User | null = auth.currentUser;

	const sendMessage = async () => {
		if (messageText.trim() === '' || !currentUser) return;

		try {
			await addDoc(collection(db, 'messages'), {
				text: messageText,
				user: {
					uid: currentUser.uid,
					displayName: currentUser.displayName || 'Anonymous',
					photoURL: currentUser.photoURL || null
				},
				timestamp: serverTimestamp()
			});
			messageText = '';
		} catch (error) {
			console.error('Error sending message:', error);
		}
	};
</script>

<div class="flex justify-center px-4 pb-4">
	<input
		type="text"
		bind:value={messageText}
		placeholder="Type a message..."
		class="input input-bordered w-full max-w-3xl"
		on:keydown={(e) => e.key === 'Enter' && sendMessage()}
	/>
</div>
