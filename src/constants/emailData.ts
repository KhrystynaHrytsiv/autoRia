import {EmailEnum} from "../enums/emailEnum";

type EmailDataType = {
    subject: string;
    template: string;
};
type IEmailConstants<T extends Record<string, string>> = {
    [K in keyof T]: EmailDataType;
};

export const emailConstants: IEmailConstants <typeof EmailEnum> = {
    [EmailEnum.request]:{
        subject: "Created request",
        template: 'request'
    },
    [EmailEnum.premium]:{
        subject: 'Premium Account',
        template: "premium"
    },
    [EmailEnum.statusRequest]:{
        subject: 'Status Request',
        template: 'statusRequest'
    },
    [EmailEnum.blockedAccount]:{
        subject: "Blocked Account",
        template: 'blocked'
    },
    [EmailEnum.unblockedAccount]:{
        subject: "Unblocked Account",
        template: 'unblocked'
    }
}
export type { EmailDataType, IEmailConstants };