<script>
    import * as Dialog from "$lib/components/ui/dialog/index.js";
	import { MessageSquare, Send } from "lucide-svelte";
    import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
	import { execute } from "$lib/api";
	import Button from "../ui/button/button.svelte";
	import Textarea from "../ui/textarea/textarea.svelte";

  let request = $state([])
  function convertDate(date) {
		const dat = new Date(date);

		let formattedDate = dat.toLocaleDateString('ru-RU', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		});

		return formattedDate;
	}
    let messageSend = $state('')
    let keyChat = $state(0)
    let {ChatId,superAdmin=false} = $props()
    let evetns = $state([])
  $inspect(superAdmin)

    async function getRequestById() {
      let res = await execute({
        path:"/requests/by_id/" + String(ChatId),
        method: "get",
      })
      if (res){
        request = res
        return res
      }
    }

    async function sendMessage() {
      let res = await execute({
        path:"/requests/"+String(ChatId)+"/event",
        method: "post",
        data:{
          "message": messageSend,
          "attachments": []
        }
      })
      if (res){
        keyChat += 1
      }
    }

    async function action(action) {
      let res = await execute({
        path:  "/requests/"+String(ChatId)+"/action/" + action,
        method: "post",
      })
      if (res){
        window.location.reload()
      }
    }
</script>

<Dialog.Root>
  <Dialog.Trigger><MessageSquare/></Dialog.Trigger>
  <Dialog.Content>
    {#key keyChat}
    {#await getRequestById()}
    <Dialog.Header>
      <Dialog.Title>{request.payload.event_data ? request.payload.event_data.name : request.access.user.name }</Dialog.Title>
    </Dialog.Header>
    <ScrollArea class="h-[300px] btt">
        {#each request.events as event}
        <div class="flex w-full justify-end">
            <div class="{event.sender === null ? "items-end rounded-t-lg rounded-l-lg" : "rounded-t-lg rounded-r-lg items-start" } my-2 mx-4 max-w-64 text-left p-2 bg-sky-500 shadow-lg inline-block flex gap-2 flex-row">
                <p class="text-white break-all">{event.message}</p>
                <p class="text-xs text-slate-200">{convertDate(event.created)}</p>
            </div>
        </div>
        {/each}
    </ScrollArea>
    {#if request.state != "closed"}
    <form onchange={()=>{sendMessage()}} class="flex gap-2 flex-row">
        <Input bind:value={messageSend} class="grow"/>
        <button class="focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 shadow h-9 px-4 py-2">
           <Send/> Отправить</button>
    </form>
    {#if superAdmin && request.state != "closed"}
            <div class="flex flex-wrap flex-row gap-4" >
              <Button class="grow bg-emerald-500 hover:bg-emerald-600" disabled>Одобрить</Button>
              <Button class="grow" variant="destructive " disabled>Отклонить</Button>
              <Button class="grow" variant="destructive ">Закрыть</Button>
            </div>
           {/if}
           {/if}
  {:then r} 
    <Dialog.Header>
      <Dialog.Title>{request.payload.event_data ? request.payload.event_data.name : request.access.user.name }</Dialog.Title>
    </Dialog.Header>
    <ScrollArea class="h-[300px] btt">
        {#each request.events as event}
        <div class="flex w-full justify-end">
            <div class="{event.sender === null ? "items-end rounded-t-lg rounded-l-lg" : "rounded-t-lg rounded-r-lg items-start" } my-2 mx-4 max-w-64 text-left p-2 bg-sky-500 shadow-lg inline-block flex gap-2 flex-row">
                <p class="text-white break-all">{event.message}</p>
                <p class="text-xs text-slate-200">{convertDate(event.created)}</p>
            </div>
        </div>
        {/each}
    </ScrollArea>
    {#if request.state != "closed"}
    <form onchange={()=>{sendMessage()}} class="flex gap-2 flex-row">
      <Input bind:value={messageSend} class="grow"/>
      <button class="focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 shadow h-9 px-4 py-2">
         <Send/> Отправить</button>
  </form>
  {#if superAdmin}
          <div class="flex flex-wrap flex-row gap-4" >
            <Button class="grow bg-emerald-500 hover:bg-emerald-600" onclick={()=>{action("accept")}}>Одобрить</Button>
            <Button class="grow" variant="destructive" onclick={()=>{action("decline")}}>Отклонить</Button>
            <Button class="grow" onclick={()=>{action("close")}}>Закрыть</Button>
          </div>
         {/if}
    {/if}
  {/await}
  {/key}


  </Dialog.Content>

</Dialog.Root>