<script lang="js">
	import * as Card from '$lib/components/ui/card/index.js';
	import { AlarmClockCheck, Braces, Clock } from 'lucide-svelte';

	let { competitions } = $props();
	let currentComp = [];
	competitions.forEach((elem) => {
		elem.status === 1 ? currentComp.push(elem) : null;
	});
</script>

<div class="flex flex-wrap w-full gap-4">
	<!--	Amount of competitions -->
	<Card.Root class="grow">
		<Card.Header>
			<Card.Title>
				Количество соревнования
			</Card.Title>
		</Card.Header>
		<Card.Content>
		</Card.Content>
		<Card.Footer class="flex gap-2">
			<Braces />
			{competitions.length}
		</Card.Footer>
	</Card.Root>

	<!--	Current competitions-->
	<Card.Root class="grow">
		<Card.Header>
			<Card.Title>
				Текущие соревнования
			</Card.Title>
		</Card.Header>
		<Card.Content>
		</Card.Content>
		<Card.Footer class="flex gap-2">
			<Clock />
			{currentComp.length}
		</Card.Footer>
	</Card.Root>

	<!--	Past competitions-->
	<Card.Root class="grow">
		<Card.Header>
			<Card.Title>
				Прошедшие соревнования
			</Card.Title>
		</Card.Header>
		<Card.Content>
		</Card.Content>
		<Card.Footer class="flex gap-2">
			<AlarmClockCheck />
			{competitions.length - currentComp.length}
		</Card.Footer>
	</Card.Root>
</div>