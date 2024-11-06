<!-- src/routes/(authenticated)/chat/+page.svelte -->
<script lang="ts">
	import MessageList from '$lib/components/MessageList.svelte';
	import MessageInput from '$lib/components/MessageInput.svelte';
</script>

<svelte:head>
	<title>Chat</title>
	<meta name="description" content="Chat with other users" />
</svelte:head>

<MessageList />
<MessageInput />
