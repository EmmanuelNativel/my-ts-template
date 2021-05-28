enum MESSAGE_TYPE {
    GET_TIME = "GET_TIME"
}

interface WSmessage {
    type: string,
    payload?: Record<string, any>,
    error?: string
    //... add other message's common properties
}

export {
    MESSAGE_TYPE,
    WSmessage
}