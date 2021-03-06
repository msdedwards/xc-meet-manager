import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';
import { action, set } from '@ember/object';
import { inject as service } from '@ember/service';


export default class TimeManualComponent extends Component {
    @service db;
    @tracked place = 1;
    @tracked hours = 0;
    @tracked minutes = "00";
    @tracked seconds = "00.00";
    @tracked isResultsReversed = false;
    @tracked displayPlaceWarning = false;
    @tracked results = [];
    @tracked hideHours = true;

    @action
    reverseOrder() {
        this.isResultsReversed = !this.isResultsReversed;
        this.results = this.results.reverse();
    }

    get time() {
        let sec = this.seconds.split('.').join(' ');
        return this.hours + ':' + this.minutes + '\'' + sec;
    }

    resetInputs() {
        this.hours = 0;
        this.minutes = "00";
        this.seconds = "00.00";
    }

    @action
    placeChanged() {
        this.displayPlaceWarning = this.results.length < this.place;
    }

    @action
    async submit() {
        var result;
        if (this.results.length >= this.place) {
            //update result with time
            result = this.results.find(item => item.place == this.place);
            let [seconds, hundredths] = this.seconds.split('.');
            set(result, 'hours', this.hours);
            set(result, 'minutes', this.minutes);
            set(result, 'seconds', seconds);
            set(result, 'hundredths', hundredths);
            set(result, 'time', this.time);
            await this.db.updateResult(result);
        } else {
            this.displayPlaceWarning = true;
        }
        this.resetInputs();
        this.results = this.results;
        this.place++;
    }
}
