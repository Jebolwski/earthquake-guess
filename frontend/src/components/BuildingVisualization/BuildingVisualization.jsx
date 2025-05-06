import React from "react";

const BuildingVisualization = ({
  floors,
  height,
  age,
  plinth,
  slope,
  foundationType,
  groundFloor,
  roofType,
  damageLevel,
}) => {
  const getDamageEffects = () => {
    if (!damageLevel) return null;

    const damageValue = parseFloat(damageLevel);

    if (damageValue >= 2.5) {
      // Heavy damage - dramatic destruction
      return (
        <>
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-white bg-opacity-100 flex flex-col items-center justify-center z-30">
            {/* Large "YIKILDI" text */}
            <div className="text-red-600 font-bold text-4xl mb-16 animate-pulse">
              YIKILDI
            </div>

            {/* Collapsed building representation */}
            <div className="relative w-full h-32 flex justify-center">
              {/* Rubble pile */}
              <div className="absolute bottom-0 w-3/4 h-24 bg-gray-700 rounded-tr-full"></div>

              {/* Broken pieces */}
              <div className="absolute bottom-12 left-1/4 w-16 h-8 bg-gray-500 transform rotate-45"></div>
              <div className="absolute bottom-8 right-1/4 w-12 h-6 bg-gray-600 transform -rotate-20"></div>
              <div className="absolute bottom-16 left-1/3 w-10 h-5 bg-gray-400 transform rotate-15"></div>

              {/* Remaining wall fragments */}
              <div className="absolute bottom-0 left-1/3 w-8 h-16 bg-gray-300"></div>
              <div className="absolute bottom-0 right-1/3 w-8 h-12 bg-gray-400"></div>
            </div>
          </div>
        </>
      );
    } else if (damageValue >= 1.5) {
      // Medium damage - show cracks
      return (
        <>
          <div className="absolute top-5 left-5 w-12 h-1 bg-[#777777] transform rotate-45 z-20"></div>
          <div className="absolute top-1/3 right-1/4 w-10 h-1 bg-[#777777] transform -rotate-12 z-20"></div>
          <div className="absolute top-1/4 right-6 w-14 h-1 bg-[#777777] transform rotate-45 z-20"></div>
          <div className="absolute bottom-1/3 left-1/3 w-14 h-1 bg-[#777777] transform rotate-45 z-20"></div>
          <div className="absolute bottom-1/4 right-1/3 w-8 h-1 bg-[#777777] transform -rotate-30 z-20"></div>
        </>
      );
    } else if (damageValue >= 1) {
      // Light damage - minor cracks
      return (
        <>
          <div className="absolute top-1/2 left-1/3 w-8 h-1 bg-red-500 transform rotate-15"></div>
          <div className="absolute bottom-1/4 right-1/4 w-6 h-1 bg-red-500 transform -rotate-10"></div>
        </>
      );
    }
    return null;
  };

  return (
    <div className="visualization relative">
      <h2 className="text-2xl font-semibold mb-4">Bina Görünümü</h2>
      <div className="relative mt-5 min-h-[400px] w-full flex justify-center items-end">
        {/* Nature Background */}
        <div className="absolute inset-0 overflow-hidden z-0 rounded-lg">
          {/* Sky */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-300 to-blue-500"></div>

          {/* Sun */}
          <div className="absolute top-8 right-8 w-16 h-16 bg-yellow-300 rounded-full shadow-lg"></div>
          <div className="absolute top-8 right-8 w-16 h-16 bg-yellow-200 rounded-full animate-pulse opacity-70"></div>

          {/* Trees */}
          <div className="absolute bottom-0 left-4">
            <div className="w-6 h-20 bg-brown-600 bg-[#8B4513] ml-4"></div>
            <div className="w-16 h-16 bg-green-600 rounded-full absolute top-0 left-3 -mt-12 -ml-4"></div>
          </div>
          <div className="absolute bottom-0 right-8">
            <div className="w-6 h-20 bg-[#8B4513] ml-3"></div>
            <div className="w-20 h-20 bg-green-700 absolute top-0 left-3 rounded-full -mt-10 -ml-7"></div>
          </div>

          {/* Clouds */}
          <div className="absolute top-16 left-16 w-24 h-8 bg-white rounded-full"></div>
          <div className="absolute top-20 left-32 w-16 h-6 bg-white rounded-full"></div>
        </div>

        {/* Building Container */}
        <div className="flex flex-col items-center relative z-10">
          {/* Damage effects overlay */}
          {getDamageEffects()}

          {/* Only show intact building if not heavily damaged */}
          {(!damageLevel || parseFloat(damageLevel) < 2.5) && (
            <>
              {/* Roof */}
              {roofType === "Bamboo/Timber-Light roof" && (
                <div
                  className="roof-light border border-[#7ea47e]"
                  style={{
                    width: `${
                      Math.min(300, Math.max(150, plinth / 10)) + 20
                    }px`,
                    height: "20px",
                    backgroundColor: "#8FBC8F",
                    borderRadius: "5px 5px 0 0",
                  }}
                />
              )}
              {roofType === "Bamboo/Timber-Heavy roof" && (
                <div
                  className="roof-heavy"
                  style={{
                    width: `${
                      Math.min(300, Math.max(150, plinth / 10)) + 20
                    }px`,
                    height: "30px",
                    backgroundColor: "#556B2F",
                    borderRadius: "5px 5px 0 0",
                  }}
                />
              )}
              {roofType === "RCC/RB/RBC" && (
                <div
                  className="roof-flat"
                  style={{
                    width: `${Math.min(300, Math.max(150, plinth / 10))}px`,
                    height: "15px",
                    backgroundColor: "#777",
                  }}
                />
              )}

              {/* Floors */}
              {Array.from({ length: floors }).map((_, i) => {
                const isGroundFloor = i === floors - 1;
                const floorWidth = Math.min(300, Math.max(150, plinth / 10));
                const floorHeight = Math.min(80, Math.max(40, height / floors));
                const windowCount = Math.min(
                  5,
                  Math.max(2, Math.floor(plinth / 300))
                );

                let floorStyle = {
                  width: `${floorWidth}px`,
                  height: `${floorHeight}px`,
                  backgroundColor: "#e0e0e0",
                  marginBottom: "2px",
                  border: "1px solid #999",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  position: "relative",
                };

                if (isGroundFloor) {
                  if (groundFloor === "Mud") {
                    floorStyle.borderBottom = "4px solid #8B4513";
                  } else if (groundFloor === "RC") {
                    floorStyle.borderBottom = "4px solid #808080";
                  } else if (groundFloor === "Brick/Stone") {
                    floorStyle.borderBottom = "4px solid #CD5C5C";
                  } else if (groundFloor === "Timber") {
                    floorStyle.borderBottom = "4px solid #556B2F";
                    floorStyle.backgroundColor = "#F5DEB3";
                  }
                }

                return (
                  <div
                    key={i}
                    className="floor"
                    style={floorStyle}
                  >
                    {Array.from({ length: windowCount }).map((_, j) => (
                      <div
                        key={j}
                        className="window"
                        style={{
                          width: "25px",
                          height: "35px",
                          backgroundColor: "#87CEEB",
                          border: "1px solid #555",
                        }}
                      />
                    ))}
                  </div>
                );
              })}

              {/* Foundation */}
              <div
                className={`foundation ${foundationType} ${slope}`}
                style={{
                  width: `${Math.min(300, Math.max(150, plinth / 10))}px`,
                  height: "30px",
                  marginBottom: "-1px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor:
                      foundationType === "Mud mortar-Stone/Brick"
                        ? "#8B4513"
                        : foundationType === "Bamboo/Timber"
                        ? "#D2B48C"
                        : foundationType === "Cement-Stone/Brick"
                        ? "#A9A9A9"
                        : "#808080",
                    backgroundImage:
                      foundationType === "Bamboo/Timber"
                        ? "linear-gradient(90deg, #8FBC8F 10%, #556B2F 10%, #556B2F 20%, #8FBC8F 20%)"
                        : "none",
                    backgroundSize: "20px 100%",
                    clipPath:
                      slope === "Flat"
                        ? "none"
                        : slope === "Moderate slope"
                        ? "polygon(0% 0%, 100% 30%, 100% 100%, 0% 100%)"
                        : "polygon(0% 0%, 100% 45%, 100% 100%, 0% 100%)",
                  }}
                />
              </div>
            </>
          )}

          {/* Age indicator */}
          <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 text-xs text-gray-700 z-20">
            {age} years old
          </div>

          {/* Plinth area */}
          <div className="absolute bottom-[-25px] text-xs text-gray-700 z-20">
            {plinth} sq ft
          </div>

          {/* Ground */}
          <div
            className="ground rounded-t-md"
            style={{
              width: `${Math.min(300, Math.max(150, plinth / 10)) + 50}px`,
              height: "15px",
              backgroundColor: "#8B4513",
              marginTop: "5px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BuildingVisualization;
