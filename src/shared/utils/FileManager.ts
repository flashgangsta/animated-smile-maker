import {ProjectConfig} from "./ProjectConfig.js";

export class FileManager extends EventTarget {
    private static instance:FileManager;

    private static readonly CONTENT_TYPE_IMAGES: string = "image/*";
    private readonly input: HTMLInputElement = document.createElement("input");
    private readonly projectConfig: ProjectConfig = ProjectConfig.getInstance();
    private projectFile: FileSystemFileHandle | undefined;

    private constructor() {
        super();
        this.input.type = "file";
    }

    public static getInstance():FileManager {
        if(!FileManager.instance) {
            FileManager.instance = new FileManager();
        }
        return FileManager.instance;
    }

    public openFiles(contentType:string = FileManager.CONTENT_TYPE_IMAGES, multiple:boolean = false): Promise<File[]> {
        const input: HTMLInputElement = this.input;
        contentType ? input.accept = contentType : input.removeAttribute("accept");
        input.multiple = multiple;

        return new Promise(resolve => {
            input.onchange = (): void => {
                let files:File[] = input.files ? Array.from(input.files) : [];
                input.onchange = null;
                resolve(files);
            }
            input.click();
        })
    }


    public async openProject(): Promise<File> {
        const [fileHandle]: [FileSystemFileHandle] = await window.showOpenFilePicker({
            types: [{
                description: "Animator file",
                accept: {'text/plain': [this.projectConfig.fileExt]}
            }],
            excludeAcceptAllOption: true,
            multiple: false,
        });

        this.projectFile = fileHandle;

        return await fileHandle.getFile();
    }


    fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject): void => {
            const reader: FileReader = this.initFileReader(resolve, reject);
            reader.readAsDataURL(file);
        });
    }


    fileToText(file: File):Promise<string> {
        return new Promise((resolve, reject): void => {
            const reader: FileReader = this.initFileReader(resolve, reject);
            reader.readAsText(file);
        });
    }


    private initFileReader(resolve: (value: string) => void, reject: (reason: ProgressEvent<FileReader> | string) => void): FileReader {
        const fileReader: FileReader = new FileReader();
        fileReader.onload = (event: ProgressEvent<FileReader>): void => {
            if(typeof fileReader.result === "string") {
                resolve(fileReader.result);
            }
            //todo: process else
        }

        fileReader.onerror = (error: ProgressEvent<FileReader>): void => {
            reject(error);
        }

        fileReader.onloadend = (event: ProgressEvent<FileReader>): void => {
            fileReader.onloadend = null;
            fileReader.onload = null;
            fileReader.onerror = null;
        }

        return fileReader;
    }
}