import bcrypt from "bcryptjs";

export async function hashPassword(password: string) { 
    const salt = await bcrypt.genSalt(10); 
    return bcrypt.hash(password, salt); 
}

export async function comparePassword(candidate: string, hash: string | undefined) { 

    if (hash) {
        return bcrypt.compare(candidate, hash); 
    }
}