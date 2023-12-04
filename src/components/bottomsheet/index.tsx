/* eslint-disable react-hooks/exhaustive-deps */
import React, {Ref, useCallback, useMemo, useState} from 'react';
import {NBottomSheetModal, NText, NView} from '../styled';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {useTranslation} from 'react-i18next';
import {themaAtom} from '../../states';
import {useRecoilValue} from 'recoil';
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

  /** useMemo */
  // const snapPoints = useMemo(() => [`${snapPoint}%`], []);
  const snapPoints = useMemo(() => [value], [value]);

  return (
    <BottomSheetModalProvider>
      <NBottomSheetModal
        handleIndicatorStyle={{backgroundColor: handleIndicatorColor(thema)}}
        backgroundStyle={{backgroundColor: bottomSheetBgColor(thema)}}
        className="mx-4"
        ref={bottomSheetModalRef}
        backdropComponent={renderBackdrop}
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
    </BottomSheetModalProvider>
  );
};

export default BottomSheetModalContainer;
