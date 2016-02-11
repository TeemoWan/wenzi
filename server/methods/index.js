import auth from './auth';
import documents from './documents';
import teams from './teams';

export default function () {
  auth();
  documents();
  teams();
}