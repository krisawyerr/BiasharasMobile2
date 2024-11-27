import { Text, View } from "react-native";

export default function TradeList(item: any) {
    return (
        <View>
            <Text style={{color: "white"}}>{item.index}</Text>
        </View>        
    )
}