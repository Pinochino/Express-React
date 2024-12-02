import bcrypt from 'bcrypt';
const saltRounds = 10;


export async function encode(text: string): Promise<string> {
    try {
        console.log(text);
        // Tạo salt và mã hóa mật khẩu với bcrypt
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(text, salt);
        console.log(hash);
        return hash; 
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}


export async function compare(text: string, encodedText: string): Promise<boolean> {
    try {
        const isEqual = await bcrypt.compare(text, encodedText);
        return isEqual;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
}

