import {Astro} from 'meteor/jagi:astronomy';
import {Validators} from 'meteor/jagi:astronomy-validators';
import {Nodes} from './collections';

const Node = Astro.Class({
  name: 'Node',
  collection: Nodes,
  fields: {
    hash: {
      type: 'string',
      validator: Validators.length(40)
    },

    type: {
      type: 'string',
      validator: Validators.choice(['chapter', 'section', 'heading', 'paragraph', 'text', 'list',
                                    'code', 'table', 'formula', 'box', 'image', 'video', 'audio',
                                    'bold', 'italic', 'underline', 'internal_link', 'external_link'])
    },

    // 需要针对不同的类型验证子类型
    subType: {
      type: 'string',
      optional: true
    },

    title: {
      type: 'string',
      optional: true
    },

    content: {
      type: 'string',
      optional: true
    },

    // 子节点集合,不同于tree,这里子节点是按照类型存放的对象,每个类型为一个数组,用来快速的取出相应的结点.
    subNodes: {
      type: 'array',
      optional: true,
      nested: 'string'
    },

    tree: {
      type: 'object',
      optional: true
    },

    // 需要引用的外部链接
    url: {
      type: 'string',
      optional: true
    },

    // 针对其他结点,有些结点如加粗,斜体,下划线,引用等都需要指定目标,然后当前结点标注目标结点的某一范围为一特定效果.
    target: {
      type: 'string',
      optional: true
    },

    // 目标结点某一范围.
    range: {
      type: 'string',
      optional: true
    }
  }
});

export default Node;
