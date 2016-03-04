import auth from './auth';
import documents from './documents';
import teams from './teams';
import settings from './settings';

export default function () {
  auth();
  documents();
  teams();
  settings();
}