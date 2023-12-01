/* eslint-disable react-hooks/exhaustive-deps */
import React, {Ref, useCallback, useMemo} from 'react';
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
  /** */
  snapPoint: number;
  /** */
  isDetached?: boolean;
}

const BottomSheetModalContainer = ({
  title,
  bottomSheetModalRef,
  snapPoint,
  isDetached,
  component,
}: IProps) => {
  /** useTranslation */
  const {t} = useTranslation();

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
  const snapPoints = useMemo(() => [`${snapPoint}%`], []);

  // const renderFooter = useCallback(
  //   props => (
  //     <BottomSheetFooter {...props} bottomInset={24}>
  //       <NView className="px-4 mb-2">
  //         <DefaultButton
  //           name="선택 완료"
  //           isEnabled={true}
  //           height={50}
  //           onPress={() => null}
  //         />
  //       </NView>
  //     </BottomSheetFooter>
  //   ),
  //   [],
  // );

  return (
    <BottomSheetModalProvider>
      <NBottomSheetModal
        handleIndicatorStyle={{backgroundColor: handleIndicatorColor(thema)}}
        backgroundStyle={{backgroundColor: bottomSheetBgColor(thema)}}
        className={`${isDetached && 'mx-6'}`}
        ref={bottomSheetModalRef}
        backdropComponent={renderBackdrop}
        index={0}
        snapPoints={snapPoints}
        detached={isDetached}
        bottomInset={isDetached ? 48 : 0}
        // footerComponent={renderFooter}
      >
        {title && (
          <NView className="flex-row items-center justify-center">
            <NText className={`mt-3 font-bold ${textColor(thema)}`}>
              {t(title!)}
            </NText>
          </NView>
        )}
        <NView className="mt-3">{component}</NView>
      </NBottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default BottomSheetModalContainer;
