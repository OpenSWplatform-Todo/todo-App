/*항목 생성 component style */
import {StyleSheet} from 'react-native';

export const viewStyle = StyleSheet.create({
    container: {/*칸 나누기 용 */
        width: '90%',
        alignItems: 'flex-start',
        justifyContent: 'center', 
        backgroundColor: "#fff", /*컨테이너 크기 확인용 나중에 삭제*/
        marginTop: 10,
    },
    subcontainer: {/*버튼 정렬용 */
        marginTop: 8,
        justifyContent: 'flex-start', 
        flexDirection: "row",
    },

    button: {
        marginLeft: 8 ,
        backgroundColor: "#E8E8E8",
        alignItems: 'center',
    },
});

export const textStyles = StyleSheet.create({
    heading: { /*note, category... 이런 거 */
        fontSize: 15,
        color: "black",
        fontWeight: '500',
        alignItems: 'center',
        justifyContent: 'center',
    },
});




