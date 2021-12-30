/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import type { App } from 'vue';
import emitter from './event';
import GlobalAlert from '@/components/GlobalAlert.vue';
import type { MessageType } from './declarations';
import { checkIsOneOfEnumMapItem } from '@/utils/checker';

const plugin = {
  install: (app: App) => {
    app.component('GlobalAlert', GlobalAlert);
  },
};

export enum MessageContentKeys {
  SUCCESS = 'Your request has been submitted successfully.',
  FAILED = 'Sorry, there have been some technical issues, please try again later.',
}

export const checkIsMessageContentKey = (value: any): boolean =>
  checkIsOneOfEnumMapItem(MessageContentKeys, value);

/**
 * Show a global alert with message based on your `MessageType`
 * or just choose `MessageContentTypes` to use general content
 * @param message `MessageType` format or generally choosing `MessageContentTypes`
 */
export const showAlert = (message: MessageType | MessageContentKeys) => {
  let emittedMessage = message;
  if (checkIsMessageContentKey(message)) {
    switch (message) {
      case MessageContentKeys.SUCCESS:
        emittedMessage = {
          type: 'success',
          content: MessageContentKeys.SUCCESS,
        };
        break;
      case MessageContentKeys.FAILED:
        emittedMessage = {
          type: 'error',
          content: MessageContentKeys.FAILED,
        };
        break;
      default:
        throw Error(`Wrong message content type: ${message}.`);
    }
  }
  emitter.emit('show', <MessageType>emittedMessage);
};

export default plugin;
