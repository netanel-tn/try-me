import 'colors';
export declare const LINE = "--------------";
export declare const UTF = "utf8";
export declare const ERR_ARGV = "`argv` are invalid!";
export declare const newDate: () => string;
export declare const newDateMagenta: () => string;
export declare const indent: (n?: number) => string;
export declare const pathFile: (path: string, filename: string) => {
    path: string;
    filename: string;
};
export declare const begin: () => void;
export declare const finalizeFn: () => void;
