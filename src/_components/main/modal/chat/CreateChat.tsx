'use client';
import React, { useState, useRef } from 'react';

// styles
import styles from './createchat.module.scss';

interface CreateChatProps {
  openModal: () => void;
  onCreateChat: (data: {
    title: string;
    region: string;
    tags: string[];
  }) => void;
}

const CreateChat: React.FC<CreateChatProps> = ({ openModal, onCreateChat }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const tagInputRef = useRef<HTMLInputElement>(null);

  const formatTag = (value: string) => {
    if (!value.startsWith('#')) {
      value = `#${value}`;
    }
    value = value.replace(/#+/g, '#');
    return value;
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const hashIndex = value.indexOf('#', 1);
    const blankIndex = value.indexOf(' ', 1);
    if (hashIndex > 0) {
      const newTag = formatTag(value.substring(0, hashIndex).trim());
      if (!tags.includes(newTag)) {
        setTags((prevTags) => [...prevTags, newTag]);
      }
      setTagInput(value.substring(hashIndex + 1));
    } else if (blankIndex > 0) {
      const newTag = formatTag(value.substring(0, blankIndex).trim());
      if (!tags.includes(newTag) && tags.length < 7) {
        setTags((prevTags) => [...prevTags, newTag]);
      }
      setTagInput(value.substring(blankIndex + 1));
    } else {
      setTagInput(value);
    }
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) {
      // 한글 또는 한자, 입력중이면 true였다가 false로 한번 더 실행됨
      return;
    }
    if ((e.key === ' ' || e.key === 'Enter') && tagInput.trim() !== '') {
      e.preventDefault();
      const formattedInput = formatTag(tagInput.trim());
      if (!tags.includes(formattedInput)) {
        setTags((prevTags) => [...prevTags, formattedInput]);
      }
      setTagInput('');

      if (tagInputRef.current) {
        tagInputRef.current.value = '';
      }
    } else if (e.key === 'Backspace' && tagInput === '' && tags.length > 0) {
      e.preventDefault();
      const lastTag = tags[tags.length - 1];
      setTags(tags.slice(0, -1));
      setTagInput(lastTag);
    }
  };

  const handleRemoveTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRegion(e.target.value);
  };

  const handleCreateChat = () => {
    if (title && region && tags.length > 0) {
      onCreateChat({ title, region, tags });
      setTitle('');
      setRegion('');
      setTags([]);
      setTagInput('');
      openModal();
    }
  };

  return (
    <div className="modalContents">
      <input
        className={styles.roomTitle}
        placeholder="채팅방 이름을 입력해주세요. 최대 16자까지만 가능합니다."
        value={title}
        onChange={handleTitleChange}
        maxLength={16}
      />
      <div className={styles.selectRegion}>
        <span>지역 선택</span>
        <select
          className={styles.toggleRegion}
          value={region}
          onChange={handleRegionChange}
        >
          <option value="" disabled hidden></option>
          <option value="서울특별시">서울특별시</option>
          <option value="인천광역시">인천광역시</option>
          <option value="울산광역시">울산광역시</option>
          <option value="부산광역시">부산광역시</option>
          <option value="광주광역시">광주광역시</option>
          <option value="대전광역시">대전광역시</option>
          <option value="세종특별자치시">세종특별자치시</option>
          <option value="경기도">경기도</option>
          <option value="충청북도">충청북도</option>
          <option value="충청남도">충청남도</option>
          <option value="경상남도">경상남도</option>
          <option value="경상북도">경상북도</option>
          <option value="전라남도">전라남도</option>
          <option value="전라북도">전라북도</option>
          <option value="제주특별자치도">제주특별자치도</option>
          <option value="강원특별자치도">강원특별자치도</option>
        </select>
      </div>
      <div className={styles.blank} />
      <div className={styles.hashtag}>
        <div className={styles.hashtagContainer}>
          {tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag}
              <button
                className={styles.removeTagBtn}
                onClick={() => handleRemoveTag(index)}
              >
                X
              </button>
            </span>
          ))}
          <input
            ref={tagInputRef}
            className={styles.hashtagInput}
            value={tagInput}
            onChange={handleTagInputChange}
            onKeyDown={handleTagKeyDown}
            placeholder="#해시태그로 채팅방 소개 #최대 7개"
          />
        </div>
      </div>
      <button className={styles.makeChatBtn} onClick={handleCreateChat}>
        채팅방 만들기
      </button>
    </div>
  );
};

export default CreateChat;
