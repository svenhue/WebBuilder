export class AuthenticationForm {
    
    private _username: string;
    private _password: string;
    private _client_id: string;
    private _client_secret: string;
    private _grant_type: string;
    private _scope: string;
    private _redirect_uri: string;
    
 
    constructor(values: object){
        this._username = values['username'];
        this._password = values['password'];
        this._client_id = values['client_id'];
        this._client_secret = values['client_secret'];
        this._grant_type = values['grant_type'];
        this._scope = values['scope'];
        this._redirect_uri = values['redirect_uri'];
    }
}