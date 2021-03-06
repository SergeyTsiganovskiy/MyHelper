import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FriendService } from '../../../shared/services/friend.service';
import { LoaderService } from '../../../shared/loader/loader.service';
import { ILoaderState } from '../../../shared/loader/i-loader-state.model';
import { BaseCardsComponent } from '../../shared/components/base/base-cards.component';
import { CardType } from '../../../shared/utilities/enums';
import { IFriendCard } from '../../../shared/models/base/i-card.model';
import { FriendViewModel } from '../../../shared/models/friend/friend-view.model';
import { FriendFilterRequest } from '../../../shared/models/friend/friend-filter-request.model';
import { ApiRoute } from '../../../shared/utilities/api-route';
import { FriendSearchService } from '../../../shared/services/friend-search.service';

@Component({
  selector: 'mh-search-friends',
  templateUrl: './search-friends.component.html',
  styleUrls: ['./search-friends.component.scss']
})
export class SearchFriendsComponent
  extends BaseCardsComponent<IFriendCard<FriendViewModel>, FriendFilterRequest>
  implements OnInit {

  constructor(
    private _friendService: FriendService,
    private _friendSearchService: FriendSearchService,
    private _loaderService: LoaderService,
    private _cdr: ChangeDetectorRef
  ) {
    super();
   }

  ngOnInit() {
    super.ngOnInit();
    this._loaderService.loaderState
      .subscribe((state: ILoaderState) => {
        this.isLoading = state.isShow;
      });
    this._friendSearchService.getFriendSearch()
      .subscribe(searchValue => {
        this.cardsFilterModel['search'] = searchValue;
        this.getCards();
      });
  }

  inviteFriend(card: IFriendCard<FriendViewModel>) {
    this._friendService.inviteFriend(card.data.id)
      .subscribe(isSuccess => {
        if (isSuccess) {
          card.disabled = true;
        }
      });
  }

  deleteFriend(card: IFriendCard<FriendViewModel>) {
    this._friendService.deleteFriend(card.data.id)
      .subscribe(isSuccess => {
        if (isSuccess) {
          card.isReturn = true;
        }
      });
  }

  protected getCards() {
    this._friendService.getFriends(ApiRoute.SearchFriends, this.cardsFilterModel)
    .subscribe((users: FriendViewModel[]) => {
      this.cards = users.map((x) => {
        return { data : x, cardType : CardType.Friend } as IFriendCard<FriendViewModel>;
      });
    });
  }

  protected handleScroll() {
    const offset = Math.floor(this.cards.length / this.cardsFilterModel.limit);
    this.cardsFilterModel.offset = offset * this.cardsFilterModel.limit;

    this._friendService.getFriends(ApiRoute.SearchFriends, this.cardsFilterModel, false)
    .subscribe((users: FriendViewModel[]) => {
      if (users.length > 0 && (this.cards.length % this.cardsFilterModel.limit) === 0) {
        this.cards = this.cards.concat(users.map((x) => {
          return { data : x, cardType : CardType.Friend } as IFriendCard<FriendViewModel>;
        }));
      }
    });
  }

  protected detectChanges() {
    this._cdr.detectChanges();
  }
}
