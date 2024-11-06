<!-- src/lib/components/Navbar.svelte -->
<script lang="ts">
	import { page } from '$app/stores';
</script>

<nav class="fixed w-full items-center justify-center p-4">
	<div class="flex justify-center gap-2">
		<a
			href="/chat"
			class="btn btn-sm w-32"
			class:btn-primary={$page.url.pathname.startsWith('/chat')}
		>
			Chat
		</a>
		<a
			href="/dashboard"
			class="btn btn-sm w-32"
			class:btn-primary={$page.url.pathname.startsWith('/dashboard')}
		>
			Dashboard
		</a>
	</div>
</nav>
