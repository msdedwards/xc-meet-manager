import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class PrintController extends Controller {
  @tracked pagedEntries = [[{name:'matt', shirtSize:'M', group:'test'}]];
}
