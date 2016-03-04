import {Astro} from 'meteor/jagi:astronomy';
import {Validators} from 'meteor/jagi:astronomy-validators';
import {Documents} from './collections';

export const DocumentOwner = Astro.Class({
  name: 'DocumentOwner',
  fields: {
    ownerType: {
      type: 'string',
      validator: Validators.choice(['user', 'team'])
    },

    ownerId: {
      type: 'string'
    }
  }
});

export const DocumentStatistics = Astro.Class({
  name: 'DocumentStatistics',
  fields: {
    starCount: {
      type: 'number',
      default: 0
    },

    forkCount: {
      type: 'number',
      default: 0
    },

    commitCount: {
      type: 'number',
      default: 0
    },

    pullCount: {
      type: 'number',
      default: 0
    },

    contributorCount: {
      type: 'number',
      default: 0
    },

    resourceCount: {
      type: 'number',
      default: 0
    },

    issueCount: {
      type: 'number',
      default: 0
    },

    questionCount: {
      type: 'number',
      default: 0
    },

    notesCount: {
      type: 'number',
      default: 0
    }
  }
});

const Document = Astro.Class({
  name: 'Document',
  collection: Documents,
  fields: {
    name: {
      type: 'string',
      validator: Validators.and([
        Validators.required(),
        Validators.maxLength(120)
      ])
    },

    summary: {
      type: 'string',
      optional: true,
      validator: Validators.and([
        Validators.string(),
        Validators.maxLength(1000)
      ])
    },

    createdBy: {
      type: 'string'
    },

    createdAt: {
      type: 'date',
      immutable: true,
      default: function() {
        return new Date();
      }
    },

    owner: {
      type: 'object',
      nested: 'DocumentOwner'
    },

    isForked: {
      type: 'boolean',
      default: function() {
        return false;
      }
    },

    statistics: {
      type: 'object',
      nested: 'DocumentStatistics',
      default: () => {
        return {};
      }
    }
  }
});

export default Document;
