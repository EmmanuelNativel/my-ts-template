enum MESSAGE {
    DATA = 'DATA'
};

interface WSmessage {
    type: MESSAGE;
    payload: any;
    target?: string;
}

interface privateWSmessage {
    type: MESSAGE;
    payload: any;
}

export {
    MESSAGE,
    WSmessage,
    privateWSmessage
}