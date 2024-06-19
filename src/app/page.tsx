"use client"

import {useState, MouseEvent, ChangeEvent, useEffect} from "react";
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
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [currentColor, setCurrentColor] = useState<string>("");

    const handleMouseDown = (e: MouseEvent<HTMLDivElement> | TouchEvent): void => {
        if (e.target instanceof HTMLButtonElement || (e.target as HTMLInputElement).type === 'radio') {
            return;
        }
        setIsDrawing(true);
        const color = getRandomColor();
        setCurrentColor(color);
        addShape(e, color);
    };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement> | TouchEvent): void => {
        if (!isDrawing) return;
        addShape(e, currentColor);
    };

    const handleMouseUp = (): void => {
        setIsDrawing(false);
    };

    const addShape = (e: MouseEvent<HTMLDivElement> | TouchEvent, color: string): void => {
        const shapeSize = 25;
        let x, y;
        if ('touches' in e) {
            x = Math.max(shapeSize, Math.min(e.touches[0].clientX, window.innerWidth - shapeSize));
            y = Math.max(shapeSize, Math.min(e.touches[0].clientY, window.innerHeight - shapeSize));
        } else {
            x = Math.max(shapeSize, Math.min(e.clientX, window.innerWidth - shapeSize));
            y = Math.max(shapeSize, Math.min(e.clientY, window.innerHeight - shapeSize));
        }


        const newShape: Shape = {
            id: shapes.length,
            x: x,
            y: y,
            color: color,
            type: selectedShape,
        };
        setShapes(prevShapes => [...prevShapes, newShape]);
    };

    const handleReset = (): void => {
        setShapes([]);
    };

    const handleShapeChange = (e: ChangeEvent<HTMLInputElement>): void => {
        e.stopPropagation();
        setSelectedShape(e.target.value);
    };

    useEffect(() => {
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('touchend', handleMouseUp);
        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchend', handleMouseUp);
        };
    }, []);

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-blue-100">
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
            <div
                className="w-full h-full pt-20"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onTouchStart={(e) => {
                    e.preventDefault();
                    handleMouseDown(e as unknown as MouseEvent<HTMLDivElement>);
                }}
                onTouchMove={(e) => {
                    e.preventDefault();
                    handleMouseMove(e as unknown as MouseEvent<HTMLDivElement>);
                }}
            >
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
