import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Nodes} from './collections';

const Node = new SimpleSchema({
  // 哈希值,通过几个字段计算得到,用来快速比较结点是否相同
  hash: {
    type: String
  },
  // 结点类型
  type: {
    type: String,
    allowedValues: ['chapter', 'section', 'heading', 'paragraph', 'text', 'list', 'code', 'table',
                    'formula', 'box', 'image', 'video', 'audio', 'bold', 'italic', 'underline',
                    'internal_link', 'external_link']
  },
  // 子类型型,如:标题分为一级二级三级;列表分为有序列表和无序列表
  subType: {
    type: String,
    optional: true
  },
  title: {
    type: String,
    label: 'Title',
    optional: true
  },
  content: {
    type: String,
    label: 'Content',
    optional: true
  },
  // 子节点集合,不同于tree,这里子节点是按照类型存放的对象,每个类型为一个数组,用来快速的取出相应的结点.
  subNodes: {
    type: Object,
    blackbox: true,
    optional: true
  },
  // 子节点结构
  tree: {
    type: Object,
    blackbox: true,
    optional: true
  },
  // 需要引用的外链
  url: {
    type: String,
    optional: true
  },
  // 针对其他结点,有些结点如加粗,斜体,下划线,引用等都需要指定目标,然后当前结点标注目标结点的某一范围为一特定效果.
  target: {
    type: String,
    optional: true
  },
  // 目标结点某一范围.
  range: {
    type: String,
    optional: true
  }
});

Nodes.attachSchema(Node);
