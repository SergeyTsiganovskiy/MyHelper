import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { BaseService } from './base.service';
import { AuthenticationService } from './authentication.service';
import { ApiRoute } from '../utilities/api-route';
import { NoteResponse } from '../models/notes/note-response.model';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NoteRequest } from '../models/notes/note-request.model';
import { NoteFilterRequest } from '../models/notes/note-filter-request.model';
import { RequestMethod } from '../utilities/enums';
import { LoaderService } from '../loader/loader.service';

@Injectable()
export class NoteService extends BaseService {

  constructor(
    protected httpClient: HttpClient,
    private _authService: AuthenticationService,
    private _loaderService: LoaderService
  ) {
    super(httpClient);
  }

  getNotes(noteFilterRequest?: NoteFilterRequest, isLoader = true): Observable<NoteResponse[]> {
    const searchParams = this.generateSearchParams(noteFilterRequest);
    const headers = this._generateAuthHeaders();
    if (isLoader) {
      this._loaderService.show();
    }
    return this.sendRequest<NoteResponse[]>(RequestMethod.Get, ApiRoute.Notes, null, headers, searchParams)
    .pipe(finalize(() => {
      if (isLoader) {
        this._loaderService.hide();
      }
    }));
  }

  addNote(note: NoteRequest): Observable<boolean> {
    const headers = this._generateAuthHeaders();
    return this.sendRequest<boolean>(RequestMethod.Post, ApiRoute.Notes, note, headers);
  }

  updateNote(note: NoteRequest): Observable<boolean> {
    const headers = this._generateAuthHeaders();
    return this.sendRequest<boolean>(RequestMethod.Put, ApiRoute.Notes, note, headers);
  }

  deleteNote(id: number): Observable<boolean> {
    const headers = this._generateAuthHeaders();
    return this.sendRequest<boolean>(RequestMethod.Delete, ApiRoute.Notes + '/' + id, null, headers);
  }

  private _generateAuthHeaders(): HttpHeaders {
    const token = this._authService.currentUser ? this._authService.token : '';
    return new HttpHeaders({'Authorization': 'Bearer ' + token});
  }
}
