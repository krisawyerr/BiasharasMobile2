import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import Svg, { Line } from "react-native-svg";
import { LineData } from "../types/LineData";

interface LineGraphProps {
    lineData: LineData[];
    lineColor: string;
    widthPercentage: number;
    parentContainersTotalPaddingAndMargin: number
}

const screenWidth = Dimensions.get("window").width;

export default function LineGraph({lineData, lineColor, widthPercentage, parentContainersTotalPaddingAndMargin}: LineGraphProps) {
    const graphDimensions = {
        width: ((screenWidth - parentContainersTotalPaddingAndMargin) / (100/widthPercentage)),
        height: 200,
    };

    const paddingVertical = 0;
    const horizontalPadding = 0;

    const maxValue = lineData.length ? Math.max(...lineData.map((d) => d.y)) : 0;
    const minValue = lineData.length ? Math.min(...lineData.map((d) => d.y)) : 0;
    const scaleY = maxValue === minValue ? 0 : (graphDimensions.height - 2 * paddingVertical) / (maxValue - minValue);

    return (
        <Svg width={graphDimensions.width} height={graphDimensions.height}>
            {lineData.map((value, index) => {
                const x1 =
                    (index * (graphDimensions.width - 2 * horizontalPadding)) /
                    (lineData.length - 1) +
                    horizontalPadding;
                const y1 =
                    scaleY === 0
                        ? graphDimensions.height / 2
                        : graphDimensions.height -
                        paddingVertical -
                        (value.y - minValue) * scaleY;

                const x2 =
                    index === lineData.length - 1
                        ? graphDimensions.width - horizontalPadding
                        : ((index + 1) *
                            (graphDimensions.width - 2 * horizontalPadding)) /
                        (lineData.length - 1) +
                        horizontalPadding;
                const y2 =
                    index === lineData.length - 1
                        ? y1
                        : scaleY === 0
                            ? graphDimensions.height / 2
                            : graphDimensions.height -
                            paddingVertical -
                            (lineData[index + 1].y - minValue) * scaleY;

                return (
                    <Line
                        key={index}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={lineColor}
                        strokeWidth="2"
                    />
                );
            })}
        </Svg>
    )
}