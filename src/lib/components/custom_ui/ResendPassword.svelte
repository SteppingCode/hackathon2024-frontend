<script>
    import { execute } from "$lib/api";
    import Button from "$lib/components/ui/button/button.svelte";
    import * as Card from "$lib/components/ui/card/index.js";
    import * as InputOTP from "$lib/components/ui/input-otp/index.js";
    import { REGEXP_ONLY_DIGITS_AND_CHARS } from "bits-ui";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";

    let {email,resendFlag=$bindable()} = $props()
    let password = $state('')

    let code = $state('')

    async function confirmPassword(){
        let res = await execute({
            path:"/reset/verify",
            method: "post",
            secure: false,
            data:  {"code":code, "password": password},
        })
        if (res){
            resendFlag=false
        }
    }

    async function getCode(){
        let res = await execute({
            path:"/reset/request",
            method: "post",
            secure: false,
            data:  {"email":email},
        })
    }

</script>
    
<Card.Root>
    <Card.Header>
        <Card.Title>Востановление пароля</Card.Title>
        <Card.Description>Получите код и введите новый пароль.</Card.Description>
    </Card.Header>
        <Card.Content>
            <div class="space-y-1 mb-4">
                <Label for="emailss">Почта</Label>
                <Input bind:value={email} id="emailss" type="email" placeholder="email@email.com"/>
            </div>
                <Button onclick={()=>{getCode()}}>Получить код</Button>
            <div class="mt-6">
                <Label for="code">Код</Label>
                <InputOTP.Root id="code" bind:value={code} maxlength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                    {#snippet children({ cells })}
                        <InputOTP.Group>
                        {#each cells as cell}
                            <InputOTP.Slot {cell} />
                        {/each}
                        </InputOTP.Group>
                    {/snippet}
                </InputOTP.Root>
            </div>
            <div class="space-y-1">
                <Label for="passwordss">Новый пароль</Label>
                <Input bind:value={password} id="passwordss" type="password" placeholder="*************"/>
            </div>
        </Card.Content>
        <Card.Footer>
            <Button onclick={()=>{confirmPassword()}}>Подтвердить</Button>
            <Button class="ml-2" variant="outline" onclick={() => {resendFlag=false}}>Вернуться</Button>
        </Card.Footer>
</Card.Root>
    