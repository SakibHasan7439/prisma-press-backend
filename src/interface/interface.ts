
interface TMeta {
    page    :   number;
    limit   :   number;
    total   :   number
}

export interface TResponse<T> {
    success      :       boolean;
    statusCode   :       number;
    message      :       string;
    data         :       T;
    meta        ?:       TMeta; 
}