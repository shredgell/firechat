<!-- src/routes/(authenticated)/+layout.svelte -->
<script lang="ts">
	import { user, authInitialized } from '$lib/stores/userStore';
	import Navbar from '$lib/components/Navbar.svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { onDestroy } from 'svelte';

	let isInitialized = false;
	let unsubscribeInitialized;

	// Subscribe to authInitialized store
	unsubscribeInitialized = authInitialized.subscribe((value) => {
		isInitialized = value;
		if (browser && isInitialized && !$user) {
			goto('/login');
		}
	});

	// Ensure we unsubscribe when the component is destroyed
	onDestroy(() => {
		unsubscribeInitialized();
	});
</script>

{#if isInitialized && $user}
	<div class="flex h-full flex-col">
		<Navbar />
		<slot />
	</div>
{:else if isInitialized}
	<!-- Loading Indicator -->
	<div class="flex h-full w-full items-center justify-center">
		<span class="loading loading-spinner loading-lg"></span>
	</div>
{/if}
