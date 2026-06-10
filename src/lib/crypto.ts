import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const KEY = crypto.scryptSync(process.env.VAULT_SECRET!, "salt", 32);

export function encrypt(text: string) {
    const iv = crypto.randomBytes(12);

    const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);

    const encrypted = Buffer.concat([
        cipher.update(text, "utf8"),
        cipher.final(),
    ]);

    const authTag = cipher.getAuthTag();

    return {
        iv: iv.toString("hex"),
        data: encrypted.toString("hex"),
        tag: authTag.toString("hex"),
    };
}


export function decrypt(payload: {
    iv: string;
    data: string;
    tag: string;
}) {
    const decipher = crypto.createDecipheriv(
        ALGORITHM,
        KEY,
        Buffer.from(payload.iv, "hex")
    );

    decipher.setAuthTag(Buffer.from(payload.tag, "hex"));

    const decrypted = Buffer.concat([
        decipher.update(Buffer.from(payload.data, "hex")),
        decipher.final(),
    ]);

    return decrypted.toString("utf8");
}