import {Astro} from 'meteor/jagi:astronomy';
import {Validators} from 'meteor/jagi:astronomy-validators';
import {Commits} from './collections';

export const CommitSnapshot = Astro.Class({
  name: 'CommitSnapshot',
  fields: {
    // 提交的内容,树型结构
    commit: {
      type: 'object'
    }
  }
});

export const CommitStatistics = Astro.Class({
  name: 'CommitStatistics',
  fields: {
    chapterCount: {
      type: 'number',
      default: 0
    },

    addCount: {
      type: 'number',
      default: 0
    },

    deleteCount: {
      type: 'number',
      default: 0
    }
  }
});

const Commit = Astro.Class({
  name: 'Commit',
  collection: Commits,
  fields: {
    committedBy: {
      type: 'string'
    },

    committedAt: {
      type: 'date',
      immutable: true,
      default: function() {
        return new Date();
      }
    },

    comment: {
      type: 'string',
      validator: Validators.and([
        Validators.string(),
        Validators.maxLength(500)
      ])
    },

    status: {
      type: 'string',
      validator: Validators.choice(['edit', 'approval', 'finish']),
      default: function() {
        return 'edit';
      }
    },

    snapshot: {
      type: 'object',
      nested: 'CommitSnapshot'
    },

    statistics: {
      type: 'object',
      nested: 'CommitStatistics',
      default: () => {
        return {};
      }
    }
  }
});

export default Commit;
