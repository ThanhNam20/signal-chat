import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type MessageMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ChatRoomMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserChatRoomMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class User {
  readonly id: string;
  readonly email: string;
  readonly imageUri?: string;
  readonly status?: string;
  readonly Messages?: (Message | null)[];
  readonly ChatRooms?: (UserChatRoom | null)[];
  readonly name?: string;
  readonly phone_number?: string;
  readonly dob?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class Message {
  readonly id: string;
  readonly content: string;
  readonly userID?: string;
  readonly chatroomID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Message, MessageMetaData>);
  static copyOf(source: Message, mutator: (draft: MutableModel<Message, MessageMetaData>) => MutableModel<Message, MessageMetaData> | void): Message;
}

export declare class ChatRoom {
  readonly id: string;
  readonly newMessages?: number;
  readonly LastMessage?: Message;
  readonly Messages?: (Message | null)[];
  readonly ChatRoomUsers?: (UserChatRoom | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly chatRoomLastMessageId?: string;
  constructor(init: ModelInit<ChatRoom, ChatRoomMetaData>);
  static copyOf(source: ChatRoom, mutator: (draft: MutableModel<ChatRoom, ChatRoomMetaData>) => MutableModel<ChatRoom, ChatRoomMetaData> | void): ChatRoom;
}

export declare class UserChatRoom {
  readonly id: string;
  readonly userID: string;
  readonly chatRoomID: string;
  readonly user: User;
  readonly chatRoom: ChatRoom;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<UserChatRoom, UserChatRoomMetaData>);
  static copyOf(source: UserChatRoom, mutator: (draft: MutableModel<UserChatRoom, UserChatRoomMetaData>) => MutableModel<UserChatRoom, UserChatRoomMetaData> | void): UserChatRoom;
}