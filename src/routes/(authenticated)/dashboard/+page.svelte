<!-- src/routes/(authenticated)/dashboard/+page.svelte -->
<script lang="ts">
	import { user } from '$lib/stores/userStore';
	import { logout } from '$lib/utils/auth';
</script>

<div class="flex h-full items-center justify-center p-4 text-center">
	<div class="space-y-2">
		{#if $user?.photoURL}
			<img src={$user.photoURL} alt="User Profile" class="mx-auto mb-4 h-16 w-16 rounded-full" />
		{:else}
			<!-- Optional: Display a placeholder image or icon -->
			<div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-300">
				<span class="text-3xl text-gray-600">?</span>
			</div>
		{/if}
		<p>
			Welcome to your Dashboard, {$user?.displayName || 'User'}!
		</p>
		<button on:click={logout} class="btn">Logout</button>
	</div>
</div>
