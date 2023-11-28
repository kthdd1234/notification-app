"use strict";
exports.__esModule = true;
var react_1 = require("react");
var styled_1 = require("../styled");
var react_native_1 = require("react-native");
var ItemView_1 = require("../view/ItemView");
var NotiSection = function (_a) {
    // /** useTranslation */
    // const {t} = useTranslation();
    var itemList = _a.itemList, onPressMore = _a.onPressMore;
    // /** useNavigation */
    // const {navigate} = useNavigation();
    // const onPressItem = (itemId: string) => {
    //   const arr = ['NotificationScreen', {itemId}] as never;
    //   navigate(...arr);
    // };
    // const setDateTime = ({
    //   state,
    //   notifications,
    // }: {
    //   state: string;
    //   notifications: Notification[];
    // }) => {
    //   const dateTime = moment(notifications[0].dateTime);
    //   const Hmm = dateTime.format(t(formatString.time));
    //   if (state === _default) {
    //     const isToday = dateTime.isSame(moment(), 'day');
    //     if (isToday) {
    //       return `${t('오늘')} ${Hmm}`;
    //     }
    //     return dateTime.format(t(formatString.dateTime));
    //   } else if (state === _everyWeek) {
    //     const days = notifications
    //       .map(noti => t(eKoDays[moment(noti.dateTime).day()]))
    //       .join(' ･ ');
    //     return `${t('매주')} ${days}${t('요일')} ${Hmm}`;
    //   } else if (state === _everyMonth) {
    //     const day = moment(dateTime).format('Do');
    //     return `${t('매달')} ${day}${t('일')} ${Hmm}`;
    //   }
    // };
    return (react_1["default"].createElement(styled_1.NScrollView, { className: "p-4 bg-[#F9F9FC]" },
        react_1["default"].createElement(react_native_1.FlatList, { data: itemList, keyExtractor: function (item) { return item._id; }, renderItem: function (_a) {
                var item = _a.item;
                return (react_1["default"].createElement(ItemView_1["default"], { item: item, onPressMore: onPressMore }));
            } }))
    // <NScrollView className="p-4 bg-[#F9F9FC]">
    //   {itemList.map(({_id, icon, body, state, notifications, isNotify}) => (
    //     <NTouchableOpacity
    //       key={_id}
    //       style={style}
    //       className="flex-row p-5 mb-5 bg-white rounded-xl"
    //       onPress={() => onPressItem(_id)}>
    //       <NImage className="w-8 h-8 mr-4" source={{uri: imageUrl(icon)}} />
    //       <NView className="flex-grow w-0">
    //         <NText className="mb-3 text-base font-semibold ">{body}</NText>
    //         <NText className="mb-1 text-xs text-gray-400">
    //           {t('알림 날짜/시간')}
    //         </NText>
    //         <NText className="mb-3 font-bold text-gray-500">
    //           {setDateTime({state, notifications})}
    //         </NText>
    //         <NView className="flex-row">
    //           <Tag
    //             color={t(notiTimestampTypes[state].color)}
    //             text={t(notiTimestampTypes[state].name)}
    //             isNotMl={true}
    //           />
    //           <NotiStatusTag
    //             isNotify={isNotify}
    //             notifications={notifications}
    //           />
    //         </NView>
    //       </NView>
    //       <NView className="w-10 h-full" />
    //       <IconButton
    //         containerClassName="absolute right-0 p-4"
    //         icon={eIcon.more}
    //         size={18}
    //         color="gray"
    //         onPress={() => onPressMore({itemId: _id, name: body})}
    //       />
    //     </NTouchableOpacity>
    //   ))}
    // </NScrollView>
    );
};
exports["default"] = NotiSection;
