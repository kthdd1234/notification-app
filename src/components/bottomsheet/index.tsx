/* eslint-disable react-hooks/exhaustive-deps */
import React, {Ref, useCallback, useMemo} from 'react';
import {NText, NView} from '../styled';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetFooter,
} from '@gorhom/bottom-sheet';
import {useTranslation} from 'react-i18next';
import DefaultButton from '../button/DefaultButton';

interface IProps {
  /** */
  bottomSheetModalRef: Ref<BottomSheetModal> | null;
  /** */
  title?: string;
  /** */
  component: JSX.Element;
  /** */
  snapPoint: number;
}

const BottomSheetModalContainer = ({
  title,
  bottomSheetModalRef,
  snapPoint,
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

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        backdropComponent={renderBackdrop}
        index={0}
        snapPoints={snapPoints}
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
