const aes256 = require('aes256')

const cipher = aes256.createCipher(process.env.USERPOST_ENCRYPT_KEY)

export default class UserPost {
    text: string
    name: string
    timeMillis: number

    constructor(
        text: string,
        name: string,
        timeMillis: number
    ) {
        this.text = text
        this.name = name
        this.timeMillis = timeMillis
    }

    public static fromObject(obj: any): UserPost {
        return new UserPost(
            obj.text,
            obj.name,
            obj.timeMillis
        )
    }

    public encrypt(): UserPost {
       return new UserPost(
           cipher.encrypt(this.text),
           cipher.encrypt(this.name),
           this.timeMillis
       ) 
    }

    public decrypt(): UserPost {
        return new UserPost(
            cipher.decrypt(this.text),
            cipher.decrypt(this.name),
            this.timeMillis
        )
    }

}
