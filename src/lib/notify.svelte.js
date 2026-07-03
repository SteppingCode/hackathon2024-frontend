import { toast } from "svelte-sonner"

export async function addNotify({code = 100, text ='none'}={}) {
    console.log(code)
    if (code >= 200 && code <400){
        toast.success(text)
    } else if (code >= 400 && code < 500){
        toast.warning(text)
    } else if (code >= 500){
        toast.error(text)
    }
}