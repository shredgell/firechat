<!-- src/routes/(authenticated)/+layout.svelte -->
<script lang="ts">
	import { user } from '$lib/stores/userStore';
	import Navbar from '$lib/components/Navbar.svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	// Redirect to login if not authenticated
	$: if (browser && $user === null) {
		goto('/login');
	}
</script>

<Navbar />

{#if $user !== null}
	<div class="flex h-full flex-col">
		<slot />
	</div>
{:else}
	<!-- Optional: Add a loading indicator -->
	<div class="flex justify-center items-center h-full w-full">
		<span class="loading loading-spinner loading-lg"></span>
	</div>
{/if}

