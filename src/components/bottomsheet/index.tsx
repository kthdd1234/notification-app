/* eslint-disable react-hooks/exhaustive-deps */
import React, {Ref, useCallback, useMemo} from 'react';
import {NText, NView} from '../styled';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {useTranslation} from 'react-i18next';

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

  const style = {marginHorizontal: isDetached ? 24 : 0};

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        style={style}
        ref={bottomSheetModalRef}
        backdropComponent={renderBackdrop}
        index={0}
        snapPoints={snapPoints}
        detached={isDetached}
        bottomInset={isDetached ? 48 : 0}
        // footerComponent={renderFooter}
      >
        {title && (
          <NText className="mt-3 font-bold text-center">{t(title!)}</NText>
        )}
        <NView className="mt-3">{component}</NView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default BottomSheetModalContainer;
