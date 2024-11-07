<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { user, authInitialized } from '$lib/stores/userStore';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	// Reactive statement to redirect based on authentication state
	$: if (browser && authInitialized) {
		if ($user) {
			goto('/chat');
		} else {
			goto('/login');
		}
	}
</script>

<svelte:head>
	<title>Firechat</title>
	<meta name="description" content="A chat application using SvelteKit and Firebase" />
</svelte:head>

<!-- Optional: Add a loading indicator while waiting for authentication -->
{#if !authInitialized}
	<div class="flex h-full items-center justify-center">
		<span class="loading loading-spinner loading-lg"></span>
	</div>
{/if}
