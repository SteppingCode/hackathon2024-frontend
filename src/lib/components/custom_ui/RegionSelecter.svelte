<script lang="ts">
    import Check from "lucide-svelte/icons/check";
    import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
    import { tick } from "svelte";
    import * as Command from "$lib/components/ui/command/index.js";
    import * as Popover from "$lib/components/ui/popover/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { cn } from "$lib/utils.js";
	  import { execute } from "$lib/api";
    

    
    let open = $state(false);
    let triggerRef = $state(null);

    let regions = $state([])

    let selectedValue = $derived(
     regions.find(region => region.name === value)|| { id: null, name: "Выберите регион" }
    );
    function closeAndFocusTrigger() {
     open = false;
     tick().then(() => {
      triggerRef.focus();
     });
    }

    let {value = $bindable(), idRegion = $bindable()} = $props();

    async function getRegions() {
        let res = await execute({
            path:"/regions",
            method: "get",
            secure: false,
        })
        if (res){
          regions = Object.entries(res).map(([id, name]) => ({
              id: Number(id),
              name: name
          }));
            return regions
        }
    }
   </script>
  {#await getRegions()}
    Loading...
  {:then regions} 
   <Popover.Root bind:open>
    <Popover.Trigger bind:ref={triggerRef}>
     {#snippet child({ props })}
      <Button
       variant="outline"
       class="w-full justify-between"
       {...props}
       role="combobox"
       aria-expanded={open}
      >
       {selectedValue.name}
       <ChevronsUpDown class="opacity-50" />
      </Button>
     {/snippet}
    </Popover.Trigger>
    <Popover.Content class="w-[250px] p-0">
     <Command.Root>
      <Command.Input placeholder="Search region..." />
      <Command.List>
       <Command.Empty>Регион не найден</Command.Empty>
       <Command.Group>
        <Command.Item
          value={null}
          onSelect={() => {
           value = null;
           closeAndFocusTrigger();
          }}
         >
        </Command.Item>
          {#each regions as region}
            <Command.Item
            value={region.name}
            onSelect={() => {
              value = region.name;
              idRegion = region.id;
              closeAndFocusTrigger();
            }}
            >
            <Check
              class={cn(
              "ml-auto",
              value !== region.name && "text-transparent"
              )}
            />
            {region.name}
            </Command.Item>
          {/each}
       </Command.Group>
      </Command.List>
     </Command.Root>
    </Popover.Content>
   </Popover.Root>
   {/await}
