<!-- src/routes/login/+page.svelte -->
<script lang="ts">
	import { user } from '$lib/stores/userStore';
	import { goto } from '$app/navigation';
	import { signInWithGoogle } from '$lib/utils/auth';
	import { browser } from '$app/environment';
	import GoogleSignInButton from '$lib/components/GoogleSignInButton.svelte';

	$: if (browser && $user) {
		goto('/chat');
	}
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Login to Firechat" />
</svelte:head>

{#if !$user}
	<div class="flex h-full items-center justify-center">
		<div class="prose flex flex-col items-center lg:prose-xl">
			<h1>Welcome to Firechat!</h1>
			<GoogleSignInButton />
		</div>
	</div>
{/if}
