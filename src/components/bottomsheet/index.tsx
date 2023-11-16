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

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        backdropComponent={renderBackdrop}
        index={0}
        snapPoints={snapPoints}>
        {title && (
          <NText className="mt-3 font-bold text-center">{t(title!)}</NText>
        )}
        <NView>{component}</NView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default BottomSheetModalContainer;
