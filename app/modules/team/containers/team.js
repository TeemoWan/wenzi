import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import {DocHead} from 'meteor/kadira:dochead';
import Loading from '/app/modules/core/components/loading.jsx';
import Team from '../components/team.jsx';

const composer = ({Meteor, Collections, teamId}, onData) => {
  if (Meteor.subscribe('team', teamId).ready()) {
    const team = Collections.Teams.findOne(teamId);
    onData(null, {team});

    // SEO
    DocHead.setTitle(team.name);
    DocHead.addMeta({
      name: 'description', content: team.name
    });

    DocHead.addMeta({
      name: 'Keywords', content: team.name
    });
  }
};

const depsMapper = (context, actions) => ({
  Meteor: context.Meteor,
  Collections: context.Collections
});

export default composeAll(
  composeWithTracker(composer, Loading),
  useDeps(depsMapper)
)(Team);
