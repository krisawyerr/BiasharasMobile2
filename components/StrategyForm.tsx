import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, Text, Pressable, TextInput } from 'react-native'
import { strategyTradingPairs, timeframe, tradingStyles } from '../data/formData'
import { Picker } from 'react-native-ui-lib'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { dark, light } from '../data/colors'
import { useTheme } from '../context/ThemeContext'
import { useNavigation } from 'expo-router'

interface Strategy {
    id: number,
    name: string,
    style: string,
    currency_pair: string,
    timeframe: string,
    detail: string
}

interface TradeFormProps {
    formType: string;
    strategy?: Strategy;
}

interface PickerRef {
    openExpandable?: () => void;
}

export default function StrategyForm({ formType, strategy }: TradeFormProps) {
    const { theme } = useTheme();
    const navigation = useNavigation()
    const colorTheme = theme === "light" ? light : dark
    const [selectedStyles, setSelectedStyles] = useState<string | undefined>();
    const [selectedPairs, setSelectedPairs] = useState<string | undefined>();
    const [selectedTimeframe, setSelectedTimeframe] = useState<string | undefined>();
    const [details, setDetails] = useState<string>();
    const [name, setName] = useState<string>();
    const nameRef = useRef<TextInput>(null);
    const stylesRef = useRef<PickerRef>(null);
    const pairsRef = useRef<PickerRef>(null);
    const timeframeRef = useRef<PickerRef>(null);
    const detailsRef = useRef<TextInput>(null);

    useEffect(() => {
        navigation.setOptions({
            headerTitleStyle: {
                color: colorTheme.headerText
            },
            headerStyle: {
                backgroundColor: colorTheme.headerBackground,
            },
        });
    }, [navigation]);

    useEffect(() => {
        function setValues() {
            if (formType === "edit") {
                setSelectedStyles(strategy?.style.toString())
                setSelectedPairs(strategy?.currency_pair.toString())
                setSelectedTimeframe(strategy?.timeframe.toString())
                setName(strategy?.name.toString())
                setDetails(strategy?.detail.toString())
            }
        }

        setValues()

    }, [strategy])

    return (
        <KeyboardAwareScrollView style={[styles.page, { backgroundColor: colorTheme.bodyBackground, }]} keyboardShouldPersistTaps="handled" enableAutomaticScroll >
            <View style={[styles.container, { backgroundColor: colorTheme.sectionBackground, }]}>
                <Pressable style={[styles.row, { borderBottomColor: `${colorTheme.headerBackground}60`, }]} onPress={() => nameRef.current?.focus()}>
                    <Text style={[styles.headerText, { color: colorTheme.headerText, }]}>Name</Text>
                    <TextInput
                        style={[styles.infoText, { color: colorTheme.headerText, }]}
                        ref={nameRef}
                        value={name}
                        onChangeText={(e) => setName(e)}
                    />
                </Pressable>
                <Pressable style={[styles.row, { borderBottomColor: `${colorTheme.headerBackground}60`, }]} onPress={() => stylesRef.current?.openExpandable?.()}>
                    <Text style={[styles.headerText, { color: colorTheme.headerText, }]}>Styles</Text>
                    <Text style={[styles.infoText, { color: colorTheme.headerText, }]}>{selectedStyles}</Text>
                    <Picker
                        style={{ display: "none" }}
                        showSearch
                        topBarProps={{ title: 'Trading Strategy' }}
                        searchStyle={{
                            color: "blue",
                            placeholderTextColor: "gray",
                        }}
                        ref={stylesRef}
                        value={selectedStyles}
                        onChange={item => setSelectedStyles(item?.toString() || undefined)}
                        items={tradingStyles}
                    />
                </Pressable>
                <Pressable style={[styles.row, { borderBottomColor: `${colorTheme.headerBackground}60`, }]} onPress={() => pairsRef.current?.openExpandable?.()}>
                    <Text style={[styles.headerText, { color: colorTheme.headerText, }]}>Pairs</Text>
                    <Text style={[styles.infoText, { color: colorTheme.headerText, }]}>{selectedPairs}</Text>
                    <Picker
                        style={{ display: "none" }}
                        showSearch
                        topBarProps={{ title: 'Trading Strategy' }}
                        searchStyle={{
                            color: "blue",
                            placeholderTextColor: "gray",
                        }}
                        ref={pairsRef}
                        value={selectedPairs}
                        onChange={item => setSelectedPairs(item?.toString() || undefined)}
                        items={strategyTradingPairs}
                    />
                </Pressable>
                <Pressable style={[styles.row, { borderBottomColor: `${colorTheme.headerBackground}60`, }]} onPress={() => timeframeRef.current?.openExpandable?.()}>
                    <Text style={[styles.headerText, { color: colorTheme.headerText, }]}>Timeframe</Text>
                    <Text style={[styles.infoText, { color: colorTheme.headerText, }]}>{selectedTimeframe}</Text>
                    <Picker
                        style={{ display: "none" }}
                        showSearch
                        topBarProps={{ title: 'Trading Strategy' }}
                        searchStyle={{
                            color: "blue",
                            placeholderTextColor: "gray",
                        }}
                        ref={timeframeRef}
                        value={selectedTimeframe}
                        onChange={item => setSelectedTimeframe(item?.toString() || undefined)}
                        items={timeframe}
                    />
                </Pressable>
                <Pressable style={[styles.row, { borderBottomColor: `${colorTheme.headerBackground}60`, }]} onPress={() => detailsRef.current?.focus()}>
                    <Text style={[styles.headerText, { color: colorTheme.headerText, }]}>Details</Text>
                    <TextInput
                        style={[styles.infoText, { color: colorTheme.headerText, }]}
                        ref={detailsRef}
                        value={details}
                        onChangeText={(e) => setDetails(e)}
                        multiline={true}
                    />
                </Pressable>
            </View>
            {formType === "add" ? (
                <Pressable>
                    <View style={[styles.editButton, { backgroundColor: colorTheme.headerText, }]}>
                        <Text style={[styles.submitText, { color: colorTheme.headerBackground, }]}>Add Strategy</Text>
                    </View>
                </Pressable>
            ) : (
                <>
                    <Pressable>
                        <View style={[styles.editButton, { backgroundColor: colorTheme.headerText, }]}>
                            <Text style={[styles.buttonText, { color: colorTheme.headerBackground, }]}>Edit Strategy</Text>
                        </View>
                    </Pressable>
                    <Pressable>
                        <View style={[styles.submitButton, { backgroundColor: colorTheme.red, }]}>
                            <Text style={[styles.buttonText, { color: colorTheme.headerBackground, }]}>Delete Strategy</Text>
                        </View>
                    </Pressable>
                </>
            )}
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    container: {
        margin: 20,
        marginBottom: 40,
        borderRadius: 10,
        overflow: "hidden"
    },
    row: {
        padding: 20,
        borderBottomWidth: 1,
        flexDirection: "row"
    },
    lastRow: {
        padding: 20,
        flexDirection: "row"
    },
    headerText: {
        width: "30%",
        fontWeight: 700,
        fontSize: 17
    },
    submitText: {
        width: "30%",
        fontWeight: 700,
        fontSize: 17,
        textAlign: "center"
    },
    buttonText: {
        // width: "30%",
        fontWeight: 700,
        fontSize: 17,
        textAlign: "center"
    },
    infoText: {
        width: "70%",
        fontWeight: 400,
        fontSize: 17,
    },
    editButton: {
        padding: 13,
        margin: "auto",
        marginBottom: 10,
        borderRadius: 50,
        minWidth: 250,
        alignItems: "center",
        justifyContent: "center"
    },
    submitButton: {
        padding: 13,
        margin: "auto",
        marginBottom: 40,
        borderRadius: 50,
        minWidth: 250,
        alignItems: "center",
        justifyContent: "center"
    }
});