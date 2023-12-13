/* eslint-disable react-hooks/exhaustive-deps */
import React, {Ref, useCallback, useMemo, useState} from 'react';
import {NBottomSheetModal, NText, NView} from '../styled';
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import {useTranslation} from 'react-i18next';
import {isShowBNBAtom, themaAtom} from '../../states';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {
  bottomSheetBgColor,
  handleIndicatorColor,
  textColor,
} from '../../utils/constants';

interface IProps {
  /** */
  bottomSheetModalRef: Ref<BottomSheetModal> | null;
  /** */
  title?: string;
  /** */
  component: JSX.Element;
}

const BottomSheetModalContainer = ({
  title,
  bottomSheetModalRef,
  component,
}: IProps) => {
  /** useTranslation */
  const {t} = useTranslation();

  const [value, setValue] = useState(1);

  /** useRecoilValue */
  const thema = useRecoilValue(themaAtom);
  const setIsShowBNB = useSetRecoilState(isShowBNBAtom);

  /** useCallback */
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  const onChange = (index: number) => {
    setIsShowBNB(index);
  };

  /** useMemo */
  const snapPoints = useMemo(() => [value], [value]);

  return (
    <NBottomSheetModal
      handleIndicatorStyle={{backgroundColor: handleIndicatorColor(thema)}}
      backgroundStyle={{backgroundColor: bottomSheetBgColor(thema)}}
      className="mx-4"
      ref={bottomSheetModalRef}
      backdropComponent={renderBackdrop}
      onChange={onChange}
      index={0}
      snapPoints={snapPoints}
      detached={true}
      bottomInset={50}
      contentHeight={value}>
      <NView onLayout={event => setValue(event.nativeEvent.layout.height)}>
        {title && (
          <NView className="flex-row items-center justify-center">
            <NText className={`mt-3 font-bold ${textColor(thema)}`}>
              {t(title!)}
            </NText>
          </NView>
        )}
        {component}
      </NView>
    </NBottomSheetModal>
  );
};

export default BottomSheetModalContainer;
