import { inject, injectable } from "inversify";
import { DataAdapterOptions } from "./DataAdapterOptions.js";
import { IDataAdapter } from "./IDataAdapter.js";
import { IRepository } from "../Repositorys/IRepository.js";

@injectable()
export class DataAdapterFactory{

    @inject("BODataAdapter") private boAdapter: {new (config: DataAdapterOptions): IDataAdapter};

    private repository: IRepository;

    constructor(
        @inject("BORepository") repository: IRepository
    ){
        this.repository = repository;
    }
    public CreateBOAdapter(options: DataAdapterOptions){
        return new this.boAdapter(options)
    }
}