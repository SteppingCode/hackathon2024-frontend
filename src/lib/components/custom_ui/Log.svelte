<script>
    import * as Tabs from "$lib/components/ui/tabs/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
	import { execute } from "$lib/api";
	import { goto } from "$app/navigation";
	import ResendPassword from "./ResendPassword.svelte";

    let email = $state()
    let password = $state()
    let resendFlag = $state(false)

    async function log() {
        let res = await execute({
            path: "/auth",
            method: "post",
            data: {
                "email": email,
                "password": password,
            },
            secure: false,
        })
        if (res){
            window.location.replace('/')
            localStorage.setItem("Authorization",res.access_token);
        }
    }
</script>

   <Tabs.Content value="log">
    {#if resendFlag}
        <ResendPassword bind:resendFlag={resendFlag}/>
    {:else}
        <Card.Root>
            <Card.Header>
            <Card.Title>Вход</Card.Title>
            <Card.Description>
            Введите свои данные для входа:
            </Card.Description>
            </Card.Header>
            <form onsubmit={() => {log()}}>
            <Card.Content class="space-y-2">
                <div class="space-y-1">
                    <Label for="emails">Почта</Label>
                    <Input bind:value={email} id="emails" type="email" placeholder="email@email.com"/>
                </div>
                <div class="space-y-1">
                    <Label for="passwords">Пароль</Label>
                    <Input bind:value={password} id="passwords" type="password" placeholder="*************"/>
                    <button class="text-blue-700" onclick={() =>{resendFlag=true}}>Востановить пароль.</button>
                </div>
                </Card.Content>
                <Card.Footer>
                <button class="focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 shadow h-9 px-4 py-2">
                    Войти</button>
                </Card.Footer>
            </form>
        </Card.Root>   
    {/if}
   </Tabs.Content>