import {Mongo} from 'meteor/mongo';

export const Teams = new Mongo.Collection('teams');
export const Documents = new Mongo.Collection('documents');
export const Nodes = new Mongo.Collection('nodes');
export const Commits = new Mongo.Collection('commits');
