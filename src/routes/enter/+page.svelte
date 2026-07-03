<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import Log from '$lib/components/custom_ui/Log.svelte';
	import Reg from '$lib/components/custom_ui/Reg.svelte';
</script>

<div class="h-full flex justify-center items-center">
	<Tabs.Root value="log" class="w-[400px]">
		<Tabs.List class="grid w-full grid-cols-2">
			<Tabs.Trigger value="log">Вход</Tabs.Trigger>
			<Tabs.Trigger value="reg">Регистрация</Tabs.Trigger>
		</Tabs.List>
		<Reg />
		<Log />
	</Tabs.Root>
</div>