import React, { useState, useRef, useEffect } from 'react';

// styles
import styles from './createchat.module.scss';
import Dropdown from '@/src/_components/Common/Dropdown';
import { regions,RegionType } from '@/src/types/aboutLikes';
import useToggle from '@/src/hooks/Home/useToggle';
import Toast from '@/src/_components/Common/Toast';
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
  const [region, setRegion] = useState<RegionType | null>(null);
  const tagInputRef = useRef<HTMLInputElement>(null);
  const [toast, setToast] = useState<boolean>(false);
  const openToast = useToggle(toast, setToast);
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
      if (!tags.includes(formattedInput) && tags.length<7) {
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

  // const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setRegion(e.target.value);
  // };
  // const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setRegion(e.target.value);
  // };
  const handleCreateChat = () => {
    if (title && region && tags.length > 0) {
      const regionValue = region.value === "전북특별자치도" ? "전라북도" : region.value
      onCreateChat({
        title:title,
        region: regionValue,
        tags:tags,
       });
      setTitle('');
      setRegion(null);
      setTags([]);
      setTagInput('');
      openModal();
    }else{
      openToast();
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
        <Dropdown
        type="chat"
          value={region ? region.value : `지역을 선택해주세요.`}
          items={regions}
          onClick={setRegion}
          width={"100%"}
          fontSize={"0.8rem"}
          padding={"6px"}
        />
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
      <Toast
          content={`입력칸을 모두 채워주세요.`}
          toast={toast}
          openToast={openToast}
          toastType="warning"
        />
    </div>
  );
};

export default CreateChat;
