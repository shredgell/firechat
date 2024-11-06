<!-- src/lib/components/MessageList.svelte -->
<script lang="ts">
	import { db } from '$lib/firebase';
	import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
	import { onMount, afterUpdate } from 'svelte';
	import { user } from '$lib/stores/userStore';

	interface Message {
		id: string;
		text: string;
		user: {
			uid: string;
			displayName: string;
			photoURL: string | null;
		};
		timestamp: any;
	}

	let messages: Message[] = [];
	let messageContainer: HTMLDivElement;

	onMount(() => {
		const messagesRef = collection(db, 'messages');
		const q = query(messagesRef, orderBy('timestamp', 'asc'));

		const unsubscribe = onSnapshot(q, (snapshot) => {
			messages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Message);
		});

		return () => unsubscribe();
	});

	afterUpdate(() => {
		if (messageContainer) {
			messageContainer.scrollTop = messageContainer.scrollHeight;
		}
	});

	// Function to delete a message
	const deleteMessage = async (messageId: string) => {
		const confirmed = confirm('Are you sure you want to delete this message?');
		if (!confirmed) return;

		try {
			await deleteDoc(doc(db, 'messages', messageId));
		} catch (error) {
			console.error('Error deleting message:', error);
			// Optionally, display an error message to the user
		}
	};
</script>

<div
	bind:this={messageContainer}
	class="flex h-full flex-col items-center overflow-y-scroll px-4 pt-4"
>
	{#each messages as message (message.id)}
		<div class="mb-4 flex w-full max-w-3xl items-start">
			{#if message.user.photoURL}
				<img src={message.user.photoURL} alt="Avatar" class="mr-2 h-8 w-8 rounded-full" />
			{:else}
				<div class="mr-2 h-8 w-8 rounded-full bg-gray-300"></div>
			{/if}
			<div class="w-full">
				<div class="flex items-center justify-between">
					<div class="text-sm font-semibold">{message.user.displayName}</div>
					{#if $user && message.user.uid === $user.uid}
						<button
							aria-label="Delete Message"
							on:click={() => deleteMessage(message.id)}
							class="text-sm text-red-500 hover:text-red-700"
						>
							<svg
								class="h-6 w-6"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
									id="SVGRepo_tracerCarrier"
									stroke-linecap="round"
									stroke-linejoin="round"
								></g><g id="SVGRepo_iconCarrier">
									<path
										d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									></path>
								</g></svg
							>
						</button>
					{/if}
				</div>
				<div class="text-sm">{message.text}</div>
			</div>
		</div>
	{/each}
</div>
