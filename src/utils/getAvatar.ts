import { IUser } from "@/types/user.type";

const getAvatar = (user: IUser) => {
    if (!user) return null;

    if ("avatar" in user && user.avatar) {
        return user.avatar;
    }

    if ("image" in user && user.image) {
        return user.image;
    }

    return null;
}

export default getAvatar