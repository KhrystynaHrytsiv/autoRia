class TextService{
    public unifyWords (value:string):string{
        return value.trim().toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
    }
}
export const textService =new TextService();