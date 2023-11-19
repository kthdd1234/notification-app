// const onLaunchMediaResponce = ({errorCode, assets}: ImagePickerResponse) => {
//   if (errorCode) {
//     const errMsg = t(mediaErrorCode[errorCode]);

//     Snackbar.show({
//       text: errMsg,
//       duration: Snackbar.LENGTH_LONG,
//       action: {text: t('이동'), onPress: () => Linking.openSettings()},
//     });
//   } else {
//     if (assets) {
//       const asset = assets![0];
//       const uri = asset.uri || '';
//       const type = asset.type ? asset.type!.split('/')[0] : '';

//       console.log('fileName =>', asset.fileName);
//       console.log('uri =>', asset.uri);

//       setMedia({uri, type});
//     }
//   }
// };

// const mediaInfo = {
//   Gallery: {
//     launch: launchImageLibrary,
//     options: imageLibraryOptions,
//     callback: onLaunchMediaResponce,
//   },
//   Camera: {
//     launch: launchCamera,
//     options: cameraOptions,
//     callback: onLaunchMediaResponce,
//   },
// };
// const mediaData = mediaInfo[mediaType];

// mediaRef.current?.close();

// setIsMediaLoading(true);
// await mediaData.launch(mediaData.options, mediaData.callback);
// setIsMediaLoading(false);

// ImagePicker.openPicker({
//   width: 300,
//   height: 400,
//   writeTempFile: false,
// }).then(image => {
//   if (image.sourceURL) {
//     const uri = image.path || '';
//     const type = image.mime ? image.mime!.split('/')[0] : '';

//     console.log('image =========>', image);

//     setMedia({uri, type});
//   }
// });

// <BottomSheetModalContainer
//         bottomSheetModalRef={mediaRef}
//         snapPoint={20}
//         component={
//           <NView className="flex-row items-center justify-center">
//             <SvgTextButton
//               text="사진 갤러리"
//               svg={<GallerySvg width={30} height={30} />}
//               onPress={() => onPressAddMedia('Gallery')}
//             />
//             <NView className="w-2" />
//             <SvgTextButton
//               text="카메라 촬영"
//               svg={<CameraSvg width={30} height={30} />}
//               onPress={() => onPressAddMedia('Camera')}
//             />
//           </NView>
//         }
//       />

// <AddSection
//           component={
//             media.uri ? (
//               <NView>
//                 <SvgButton
//                   containerClassName="py-2 pl-2 items-end"
//                   svg={eSvg.delete}
//                   onPress={onPressDelete}
//                   size={20}
//                 />
//                 {media.type === 'image' ? (
//                   <ImageButton
//                     imageClassName="w-full rounded-lg h-80"
//                     uri={media.uri}
//                     onPress={onPressImage}
//                   />
//                 ) : (
//                   <VideoSection uri={media.uri} />
//                 )}
//               </NView>
//             ) : (
//               <UploadButton
//                 isMediaLoading={isMediaLoading}
//                 onPress={onPressUploadButton}
//               />
//             )
//           }
//         />
