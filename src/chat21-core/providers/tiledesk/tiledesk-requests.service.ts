import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppStorageService } from '../abstract/app-storage.service';
import { LoggerService } from '../abstract/logger.service';
import { LoggerInstance } from '../logger/loggerInstance';

@Injectable()
export class TiledeskRequestsService {

  // private persistence: string;
  public SERVER_BASE_URL: string;

  // private
  private URL_TILEDESK_CLOSE_REQUEST: string;
  private tiledeskToken: string;

  private logger: LoggerService = LoggerInstance.getInstance()
  
  constructor(
    public http: HttpClient,
    public appStorage: AppStorageService
  ) { }

  initialize(serverBaseUrl: string, projectId: string,) {
    this.logger.debug('[TILEDESK-REQUEST-SERV] - initialize', projectId);
    this.SERVER_BASE_URL = serverBaseUrl;
    this.URL_TILEDESK_CLOSE_REQUEST = this.SERVER_BASE_URL + projectId +'/requests/';
    this.tiledeskToken = this.appStorage.getItem('tiledeskToken')
  }


  closeSupportGroup(supportgroupid: string): Promise<string> {
    this.logger.debug('[TILEDESK-REQUEST-SERV] - closeSupportGroup', supportgroupid);
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: this.tiledeskToken,
    });
    const httpOptions = {
      headers: new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': this.tiledeskToken,
      })
  }
    // const requestOptions = { headers: headers };
    const that = this;
    const url = this.URL_TILEDESK_CLOSE_REQUEST + supportgroupid + '/closeg'
    return new Promise((resolve, reject) => {
      this.logger.debug('[TILEDESK-REQUEST-SERV] - closeSupportGroup URLLLL', url, httpOptions);
      this.http.put(url, null, httpOptions).subscribe((data) => {
        this.logger.debug('[TILEDESK-REQUEST-SERV] - closeSupportGroup response', data);
        resolve('closed')
      }, (error) => {
        reject(error)
      });
    });
  }


  checkIfImageExist(urlToCheck: string): Promise<boolean> {
    const postData = { url: urlToCheck };
    const url ="https://firebasecheckifimageexist.gabrielepanico.repl.co/checkIfExist"
    return new Promise((resolve, reject) => {
      this.logger.debug('[TILEDESK-REQUEST-SERV] - checkIfImageExist URLLLL', url);
      this.http.post(url, postData).subscribe((data) => {
        this.logger.debug('[TILEDESK-REQUEST-SERV] - checkIfImageExist response', data);
        if(data && data['success']){
          resolve(true)
        }else{
          resolve(false)
        }
      }, (error) => {
        reject(false)
      });
    });
  }
}
