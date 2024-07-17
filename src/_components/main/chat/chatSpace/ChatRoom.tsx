"use client";
import React from "react";

// styles
import cx from "classnames";
import styles from "./chatspace.module.scss";

// icon
import { FaCircleUser } from "react-icons/fa6";

const ChatRoom = () => {
  return (
    <div className={styles.chatRoom}>
      <div className={cx(styles.othersMsg, styles.messageContainer)}>
        <div className={styles.profileSize}>
          <FaCircleUser fill="#ED5A51" size="2.5rem" />
        </div>
        <div className={styles.textArea}>
          <div className={styles.name}>구름</div>
          <div className={styles.message}>
            안녕하세요 감사해요 잘있어요 다시 만나요 ~ 안녕하세요 감사해요
            잘있어요 다시 만나요 ~ 안녕하세요 감사해요 잘있어요 다시 만나요 ~
          </div>
        </div>
      </div>
      <div className={cx(styles.myMsg, styles.messageContainer)}>
        <div className={styles.profileSize}>
          <FaCircleUser fill="#ED5A51" size="2.5rem" />
        </div>
        <div className={styles.textArea}>
          <div className={styles.name}>바보</div>
          <div className={styles.message}>
            네? 이 색으로 하자구요?네? 이 색으로 하자구요?네? 이 색으로
            하자구요?네? 이 색으로 하자구요?
          </div>
        </div>
      </div>
      <div className={cx(styles.othersMsg, styles.messageContainer)}>
        <div className={styles.profileSize}>
          <FaCircleUser fill="#ED5A51" size="2.5rem" />
        </div>
        <div className={styles.textArea}>
          <div className={styles.name}>구름</div>
          <div className={styles.message}>
            안녕하세요 감사해요 잘있어요 다시 만나요 ~
          </div>
        </div>
      </div>
      <div className={cx(styles.othersMsg, styles.messageContainer)}>
        <div className={styles.profileSize}>
          <FaCircleUser fill="#ED5A51" size="2.5rem" />
        </div>
        <div className={styles.textArea}>
          <div className={styles.name}>구름</div>
          <div className={styles.message}>
            안녕하세요 감사해요 잘있어요 다시 만나요 ~
          </div>
        </div>
      </div>
      <div className={cx(styles.myMsg, styles.messageContainer)}>
        <div className={styles.profileSize}>
          <FaCircleUser fill="#ED5A51" size="2.5rem" />
        </div>
        <div className={styles.textArea}>
          <div className={styles.name}>바보</div>
          <div className={styles.message}>
            네? 이 색으로 하자구요?네? 이 색으로 하자구요?네? 이 색으로
            하자구요?네? 이 색으로 하자구요?
          </div>
        </div>
      </div>
      <div className={cx(styles.myMsg, styles.messageContainer)}>
        <div className={styles.profileSize}>
          <FaCircleUser fill="#ED5A51" size="2.5rem" />
        </div>
        <div className={styles.textArea}>
          <div className={styles.name}>바보</div>
          <div className={styles.message}>
            네? 이 색으로 하자구요?네? 이 색으로 하자구요?네? 이 색으로
            하자구요?네? 이 색으로 하자구요?
          </div>
        </div>
      </div>
      <div className={cx(styles.myMsg, styles.messageContainer)}>
        <div className={styles.profileSize}>
          <FaCircleUser fill="#ED5A51" size="2.5rem" />
        </div>
        <div className={styles.textArea}>
          <div className={styles.name}>바보</div>
          <div className={styles.message}>
            네? 이 색으로 하자구요?네? 이 색으로 하자구요?네? 이 색으로
            하자구요?네? 이 색으로 하자구요?
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
