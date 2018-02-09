import { Injectable } from '@angular/core';
import TagViewModel from '../models/tags/tag-view.model';
import { DataAPIService } from './data-api.service';
import { Http, Response } from '@angular/http';
import { ApiRoute } from '../app-settings/api-route';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';
import { TagRequest } from '../models/tags/tag-request-model';

@Injectable()
export class TagService extends DataAPIService<TagViewModel> {
  protected get apiUrl(): string {
    return ApiRoute.Tags;
  }

  get tags(): Observable<TagViewModel[]> {
    return this.data;
  }

  constructor(protected http: Http,
    protected authService: AuthenticationService) {
    super(http, authService);
  }

  createTag(tagRequest: TagRequest) {
    return this.post(tagRequest);
  }

  protected handleData(res: Response): TagViewModel[] {
    const body = res.json();

    let tags: TagViewModel[];
    if (body.isSuccess) {
      tags = body.result;
    }

    return tags;
  }
}