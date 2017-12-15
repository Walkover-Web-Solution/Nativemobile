"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var store_1 = require("@ngrx/store");
var board_reducer_1 = require("./board.reducer");
var AppComponent = (function () {
    function AppComponent(store) {
        var _this = this;
        this.store = store;
        this.board$ = store.select(function (s) { return s.board; });
        this.currentPlayerSubscription = this.board$
            .map(function (b) { return b.reduce(function (a, b) { return a + b; }, 0) <= 0; })
            .subscribe(function (val) { return _this.currentPlayer = val; });
        this.winnerSubscription = this.board$
            .map(board_reducer_1.checkWinner)
            .subscribe(function (val) { return _this.winner = val; });
    }
    AppComponent.prototype.ngOnDestroy = function () {
        this.currentPlayerSubscription.unsubscribe();
        this.winnerSubscription.unsubscribe();
    };
    AppComponent.prototype.positionSelected = function (payload, player) {
        if (this.winner) {
            return;
        }
        this.store.dispatch({
            type: player ? board_reducer_1.PLAY_X : board_reducer_1.PLAY_O,
            payload: payload
        });
    };
    AppComponent.prototype.reset = function () {
        this.store.dispatch({ type: board_reducer_1.RESET });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: "my-app",
        templateUrl: "./app.component.html",
    }),
    __metadata("design:paramtypes", [store_1.Store])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBbUQ7QUFFbkQsaUNBQStCO0FBQy9CLHFDQUFrQztBQUNsQyxpREFBbUU7QUFVbkUsSUFBYSxZQUFZO0lBUXZCLHNCQUFtQixLQUFzQjtRQUF6QyxpQkFVQztRQVZrQixVQUFLLEdBQUwsS0FBSyxDQUFpQjtRQUN2QyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsS0FBSyxFQUFQLENBQU8sQ0FBQyxDQUFDO1FBRXpDLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxJQUFJLENBQUMsTUFBTTthQUN6QyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSyxPQUFBLENBQUMsR0FBRyxDQUFDLEVBQUwsQ0FBSyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBakMsQ0FBaUMsQ0FBQzthQUMzQyxTQUFTLENBQUMsVUFBQyxHQUFHLElBQUssT0FBQSxLQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsRUFBeEIsQ0FBd0IsQ0FBQyxDQUFDO1FBRWhELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsTUFBTTthQUNsQyxHQUFHLENBQUMsMkJBQVcsQ0FBQzthQUNoQixTQUFTLENBQUMsVUFBQyxHQUFHLElBQUssT0FBQSxLQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxrQ0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLHlCQUF5QixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzdDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBRUQsdUNBQWdCLEdBQWhCLFVBQWlCLE9BQXFDLEVBQUUsTUFBZTtRQUNyRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNoQixNQUFNLENBQUM7UUFDVCxDQUFDO1FBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7WUFDbEIsSUFBSSxFQUFFLE1BQU0sR0FBRyxzQkFBTSxHQUFHLHNCQUFNO1lBQzlCLE9BQU8sRUFBRSxPQUFPO1NBQ2pCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCw0QkFBSyxHQUFMO1FBQ0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUscUJBQUssRUFBRSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUNILG1CQUFDO0FBQUQsQ0FBQyxBQXZDRCxJQXVDQztBQXZDWSxZQUFZO0lBSnhCLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsUUFBUTtRQUNsQixXQUFXLEVBQUUsc0JBQXNCO0tBQ3BDLENBQUM7cUNBUzBCLGFBQUs7R0FScEIsWUFBWSxDQXVDeEI7QUF2Q1ksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25EZXN0cm95fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb259IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcbmltcG9ydCB7U3RvcmV9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7UExBWV9PLCBQTEFZX1gsIFJFU0VULCBjaGVja1dpbm5lcn0gZnJvbSAnLi9ib2FyZC5yZWR1Y2VyJztcblxuaW50ZXJmYWNlIEFwcFN0YXRlIHtcbiAgYm9hcmQ6IEFycmF5PG51bWJlcj47XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJteS1hcHBcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9hcHAuY29tcG9uZW50Lmh0bWxcIixcbn0pXG5leHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgYm9hcmQkOiBPYnNlcnZhYmxlPEFycmF5PG51bWJlcj4+O1xuXG4gIGN1cnJlbnRQbGF5ZXI6IGJvb2xlYW47IC8vIHR1cmU6WCwgZmFsc2U6T1xuICBjdXJyZW50UGxheWVyU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHdpbm5lcjogbnVtYmVyOyAvLyAxOlgsIC0xOk9cbiAgd2lubmVyU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IocHVibGljIHN0b3JlOiBTdG9yZTxBcHBTdGF0ZT4pIHtcbiAgICB0aGlzLmJvYXJkJCA9IHN0b3JlLnNlbGVjdChzID0+IHMuYm9hcmQpO1xuXG4gICAgdGhpcy5jdXJyZW50UGxheWVyU3Vic2NyaXB0aW9uID0gdGhpcy5ib2FyZCRcbiAgICAgIC5tYXAoYiA9PiBiLnJlZHVjZSgoYSwgYikgPT4gYSArIGIsIDApIDw9IDApXG4gICAgICAuc3Vic2NyaWJlKCh2YWwpID0+IHRoaXMuY3VycmVudFBsYXllciA9IHZhbCk7XG5cbiAgICB0aGlzLndpbm5lclN1YnNjcmlwdGlvbiA9IHRoaXMuYm9hcmQkXG4gICAgICAubWFwKGNoZWNrV2lubmVyKVxuICAgICAgLnN1YnNjcmliZSgodmFsKSA9PiB0aGlzLndpbm5lciA9IHZhbCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmN1cnJlbnRQbGF5ZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLndpbm5lclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcG9zaXRpb25TZWxlY3RlZChwYXlsb2FkOiB7IHJvdzogbnVtYmVyLCBjb2w6IG51bWJlciB9LCBwbGF5ZXI6IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy53aW5uZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IHBsYXllciA/IFBMQVlfWCA6IFBMQVlfTyxcbiAgICAgIHBheWxvYWQ6IHBheWxvYWRcbiAgICB9KTtcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goeyB0eXBlOiBSRVNFVCB9KTtcbiAgfVxufVxuIl19