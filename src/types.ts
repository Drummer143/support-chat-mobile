export type DialogStatus = 'queue' | 'completed' | 'active';

export type DataMessage = {
    timestamp: number;
    writtenBy: string;

    content?: string;
    image?: string;
};

export type DataDialog = {
    dialogId: string;
    messages: DataMessage[];
    operatorId: number;
    saved: boolean;
    status: DialogStatus;
    userName: string;

    rating?: number;
};
