import React from 'react';
import {NSafeAreaView, NText} from '../components/styled';
import CommonHeader from '../components/header/CommonHeader';

const SettingScreen = () => {
  return (
    <NSafeAreaView>
      <CommonHeader isBack={true} title="설정" />
      <NText>svg</NText>
    </NSafeAreaView>
  );
};

export default SettingScreen;
/**
 * 시스템
 * - 전체 알림(기능 준비)
 * - 언어 변경
 * - 테마 변경(기능 준비)
 * - 데이터 초기화
 *
 * 기타
 * - 앱 리뷰 작성
 * - 앱 공유
 * - 개인정보처리방침
 * - 앱 버전
 */
