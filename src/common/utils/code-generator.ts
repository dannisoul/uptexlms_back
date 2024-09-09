export class CodeGenerator{
    private static charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    public static generateCode(length: number): string {
        if (length <= 0) throw new Error("La longitud del código debe ser mayor que 0");

        let code: string = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * CodeGenerator.charset.length)
            code += CodeGenerator.charset[randomIndex];
        }
        return code;
  }
}