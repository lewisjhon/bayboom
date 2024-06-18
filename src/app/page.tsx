"use client"

import {useState, MouseEvent, ChangeEvent} from "react";
import { motion } from "framer-motion";

interface Shape {
    id: number;
    x: number;
    y: number;
    color: string;
    type: string;
}

const getRandomColor = (): string => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

export default function Home() {
    const [shapes, setShapes] = useState<Shape[]>([]);
    const [selectedShape, setSelectedShape] = useState<string>("circle");

    const handleClick = (e: MouseEvent<HTMLDivElement>): void => {
        const newShape: Shape = {
            id: shapes.length,
            x: e.clientX,
            y: e.clientY,
            color: getRandomColor(),
            type: selectedShape,
        };
        setShapes([...shapes, newShape]);
    };

    const handleReset = (): void => {
        setShapes([]);
    };

    const handleShapeChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setSelectedShape(e.target.value);
    };

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-blue-100" onClick={handleClick}>
            <div className="absolute top-4 left-4 flex space-x-2">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={(e) => {
                        e.stopPropagation(); // 부모 요소의 클릭 이벤트가 트리거되지 않도록 방지
                        handleReset();
                    }}
                >
                    초기화
                </button>
                <div className="flex items-center space-x-2">
                    <label>
                        <input
                            type="radio"
                            name="shape"
                            value="circle"
                            checked={selectedShape === "circle"}
                            onClick={(e) => e.stopPropagation()}
                            onChange={handleShapeChange}
                        /> 원
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="shape"
                            value="square"
                            checked={selectedShape === "square"}
                            onClick={(e) => e.stopPropagation()}
                            onChange={handleShapeChange}
                        /> 네모
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="shape"
                            value="triangle"
                            checked={selectedShape === "triangle"}
                            onClick={(e) => e.stopPropagation()}
                            onChange={handleShapeChange}
                        /> 세모
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="shape"
                            value="star"
                            checked={selectedShape === "star"}
                            onClick={(e) => e.stopPropagation()}
                            onChange={handleShapeChange}
                        /> 별
                    </label>
                </div>
            </div>
            {shapes.map(shape => (
                <motion.div
                    key={shape.id}
                    className={`absolute ${getShapeClasses(shape.type)}`}
                    style={{
                        backgroundColor: shape.type !== "triangle" ? shape.color : 'transparent',
                        borderColor: shape.type === "triangle" ? `transparent transparent ${shape.color} transparent` : 'transparent',
                        top: shape.y - 25,
                        left: shape.x - 25
                    }}
                    initial={{scale: 0}}
                    animate={{scale: 1.5, y: [0, -30, 0]}}
                    transition={{duration: 0.6, type: "spring", stiffness: 200}}
                />
            ))}
        </div>
    );
}

const getShapeClasses = (type: string): string => {
    switch (type) {
        case "square":
            return "w-12 h-12";
        case "triangle":
            return "w-0 h-0 border-l-[25px] border-r-[25px] border-b-[50px] border-solid";
        case "star":
            return "w-12 h-12 bg-star";
        case "circle":
        default:
            return "w-12 h-12 rounded-full";
    }
};
