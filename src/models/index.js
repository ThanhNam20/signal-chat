// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const MessageStatus = {
  "DELIVERED": "DELIVERED",
  "READ": "READ",
  "SENT": "SENT"
};

const { User, Message, ChatRoom, UserChatRoom } = initSchema(schema);

export {
  User,
  Message,
  ChatRoom,
  UserChatRoom,
  MessageStatus
};