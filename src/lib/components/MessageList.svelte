<script lang="ts">
	import { db } from '$lib/firebase';
	import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
	import { onMount, afterUpdate } from 'svelte';

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
	let messageContainer: HTMLDivElement; // Reference to the container

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
</script>

<div bind:this={messageContainer} class="flex justify-center h-full overflow-y-scroll px-4 pt-4 ">
	{#each messages as message}
		<div class="mb-4 flex items-start w-full max-w-3xl">
			{#if message.user.photoURL}
				<img src={message.user.photoURL} alt="Avatar" class="mr-2 h-8 w-8 rounded-full" />
			{:else}
				<div class="mr-2 h-8 w-8 rounded-full bg-gray-300"></div>
			{/if}
			<div class="w-full">
				<div class="text-sm">{message.user.displayName}</div>
				<div class="text-sm">{message.text}</div>
			</div>
		</div>
	{/each}
</div>
