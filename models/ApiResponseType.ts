export class ApiResponseType<T = any> {
    data?: T;
    message: string;
    success: boolean;

    constructor({ data, message, success }: ApiResponseType<T>) {
        this.data = data;
        this.message = message;
        this.success = success;
    }
}