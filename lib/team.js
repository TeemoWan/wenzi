import {Astro} from 'meteor/jagi:astronomy';
import {Validators} from 'meteor/jagi:astronomy-validators';
import {Teams} from './collections';

export const TeamStatistics = Astro.Class({
  name: 'TeamStatistics',
  fields: {
    documentCount: {
      type: 'number',
      default: 0
    },

    memberCount: {
      type: 'number',
      default: 0
    }
  }
});

const Team = Astro.Class({
  name: 'Team',
  collection: Teams,
  fields: {
    // 区别对待中文和英文
    name: {
      type: 'string',
      validator: Validators.and([
        Validators.required(),
        Validators.regexp(/^[a-zA-Z0-9_\u4e00-\u9fa5-](4,30)$/),
        Validators.unique()
      ])
    },

    summary: {
      type: 'string',
      optional: true,
      validator: Validators.and([
        Validators.maxLength(1000)
      ])
    },

    // 对个性域名有限制
    domain: {
      type: 'string',
      validator: Validators.and([
        Validators.regexp(/^[a-zA-Z0-9_-]{4,20}$/),
        Validators.unique()
      ])
    },

    createdAt: {
      type: 'date',
      immutable: true,
      default: function() {
        return new Date();
      }
    },

    admins: {
      type: 'array',
      nested: 'string',
      validator: [
        Validators.maxLength(5),
        Validators.every(
          Validators.and([
            Validators.string(),
            Validators.length(17)
          ])
        )
      ]
    },

    members: {
      type: 'array',
      nested: 'string',
      validator: [
        Validators.maxLength(100),
        Validators.every(
          Validators.and([
            Validators.string(),
            Validators.length(17)
          ])
        )
      ]
    },

    statistics: {
      type: 'object',
      nested: 'TeamStatistics'
    }

  }
});

export default Team;
